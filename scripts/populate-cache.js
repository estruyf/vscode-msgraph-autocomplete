// @ts-check
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');


const MS_GRAPH_API = "https://graphexplorerapi.azurewebsites.net/openapi?style=geautocomplete";
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
    return await data.text();
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
  const metadata = await getOpenApiMetadata();
  if (metadata) {
    fs.writeFileSync(path.join(__dirname, '../metadata.yml'), metadata, { encoding: "utf-8" });

    const metadataJson = YAML.parse(metadata);

    fs.writeFileSync(path.join(__dirname, '../metadata.json'), JSON.stringify(metadataJson, null, 2), { encoding: "utf-8" });

    if (metadataJson && metadataJson.paths) {
      let tokens = [];
      const { paths } = metadataJson;

      for (const path in paths) {
        const pathDetails = paths[path];
        const segments = path.split("/");

        if (pathDetails?.get) {
          segments.forEach((segment, index) => {
            const token = tokens.find(t => t.path === segments[index - 1]);
            if (!token) {
              if (segment.startsWith("{") && segment.endsWith("}")) {
                const name = segment.substring(1, segment.length - 1);
                const parameter = pathDetails.get.parameters.find(p => p.name === name);

                tokens.push({
                  "path": segments[index - 1],
                  "description": parameter?.description || "", 
                  "value": segment,
                  "snippetText": parameter?.description || name
                });
              }
            }
          });
        }
      }

      if (tokens && tokens.length > 0) {
        fs.writeFileSync(path.join(__dirname, '../src/tokens.json'), JSON.stringify(tokens, null, 2), { encoding: "utf-8" });
      }
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

  fs.writeFileSync(path.join(__dirname, '../src/cache.json'), JSON.stringify(cacheData), { encoding: "utf-8" });
})();