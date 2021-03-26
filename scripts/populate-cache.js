// @ts-check
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');
const { gzip } = require('node-gzip');

const MS_GRAPH_API = "https://graphexplorerapi.azurewebsites.net/openapi?openapiversion=3&style=geautocomplete";
const MS_GRAPH_METADATA = "https://raw.githubusercontent.com/microsoftgraph/msgraph-metadata/master/openapi/v1.0/openapi.yaml";


/**
 * Retrieve the API metadata
 * @returns 
 */
const getOpenApiMetadata = async () => {
  const data = await fetch.default(MS_GRAPH_METADATA, {
    method: "GET"
  });

  if (data && data.ok) {
    const metadata = await data.text();

    fs.writeFileSync(path.join(__dirname, '../metadata.yml'), metadata, { encoding: "utf-8" });

    const metadataJson = YAML.parse(metadata);

    fs.writeFileSync(path.join(__dirname, '../metadata.json'), JSON.stringify(metadataJson, null, 2), { encoding: "utf-8" });

    return metadataJson;
  }

  return null;
}

/**
 * Retrieves the API response
 * @param {*} version 
 * @param {*} path 
 * @param {*} cache 
 * @returns 
 */
const getData = async (version, path, cache) => {
  console.log(`Fetching data for: "${path}"`);
  const apiUrl = `${MS_GRAPH_API}&graphVersion=${version}&url=${path}`;
  const data = await fetch.default(apiUrl, {
    method: "GET"
  });

  if (data && data.ok) {
    const apiData = await data.json();

    if (apiData) {
      for (const key of Object.keys(apiData)) {
        if (["paths"].indexOf(key) === -1) {
          delete apiData[key];
        }
      }
      cache[version === "v1.0" ? "v1" : "beta"][path] = apiData;
    }
  }

  return cache;
}

/**
 * Start building the cache
 */
(async () => {
  let cacheData = { "v1": {}, "beta": {} };

  // Retrieving metadata
  const metadataJson = await getOpenApiMetadata();
  if (metadataJson && metadataJson.paths) {
    let tokens = [];
    let apis = [];
    const { paths } = metadataJson;

    for (const path in paths) {
      const pathDetails = paths[path];
      const segments = path.split("/");

      apis.push({
        path,
        methods: Object.keys(pathDetails).map(name => ({
          name,
          description: pathDetails[name].summary
        }))
      });

      if (pathDetails?.get) {
        const lastSegment = segments[segments.length - 1];
        if (lastSegment.startsWith("{") && lastSegment.endsWith("}")) {

          const path = segments.filter(s => s !== lastSegment).join("/");
          const token = tokens.find(t => t.path === path);
          if (!token) {
            const name = lastSegment.substring(1, lastSegment.length - 1);
            const parameter = pathDetails.get.parameters.find(p => p.name === name);

            tokens.push({
              path: path,
              description: parameter?.description || "", 
              value: lastSegment,
              snippetText: parameter?.description || name,
              methods: Object.keys(pathDetails).map(name => ({
                name,
                description: pathDetails[name].summary
              }))
            });
          }
        }
      }
    }

    if (tokens && tokens.length > 0) {
      fs.writeFileSync(path.join(__dirname, '../tokens.json.gz'), await gzip(JSON.stringify(tokens)), { encoding: "utf-8" });
    }
    if (apis && apis.length > 0) {
      fs.writeFileSync(path.join(__dirname, '../apis.json.gz'), await gzip(JSON.stringify(apis)), { encoding: "utf-8" });
    }
  }

  const version = "v1.0";
  const apiPath = "/";
  cacheData = await getData(version, apiPath, cacheData);

  if (cacheData[version === "v1.0" ? "v1" : "beta"][apiPath]) {
    try {
      const cache = cacheData[version === "v1.0" ? "v1" : "beta"][apiPath];
      const links = cache.paths[apiPath]["get"]["responses"]["200"]["links"];

      for (const link of Object.keys(links)) {
        cacheData = await getData(version, `${apiPath}${link}`, cacheData);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, '../cache.json.gz'), await gzip(JSON.stringify(cacheData)), { encoding: "utf-8" });
})();