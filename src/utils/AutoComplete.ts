import fetch from "node-fetch";
import { OpenApiType } from "../models/OpenApiType";

const explorerApi = `https://graphexplorerapi.azurewebsites.net/openapi?style=geautocomplete`

export class AutoComplete {

  public static async get(url: string, version: "v1.0" | "beta" = "v1.0"): Promise<OpenApiType | null> {
    try {

      const apiUrl = `${explorerApi}&graphVersion=${version}&url=${url}`;
      console.log(apiUrl)
      const data = await fetch(apiUrl, {
        headers: {
          "accept": "application/json"
        }
      });
      
      if (data && data.ok) {
        const apiData: OpenApiType = await data.json();
        return apiData;
      }

      return null;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }
}