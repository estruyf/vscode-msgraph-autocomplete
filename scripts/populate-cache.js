// @ts-check
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const MS_GRAPH_API = "https://graphexplorerapi.azurewebsites.net/openapi?style=geautocomplete";

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

(async () => {
  let cacheData = { "v1": {}, "beta": {} };

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