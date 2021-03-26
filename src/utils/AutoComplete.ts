import fetch from "node-fetch";
import { MS_GRAPH_API } from "../constants";
import { OpenApiType } from "../models/OpenApiType";

export class AutoComplete {

  public static async get(url: string, version: "v1.0" | "beta" = "v1.0"): Promise<OpenApiType | null> {
    try {

      const apiUrl = `${MS_GRAPH_API}&graphVersion=${version}&url=${url}`;
      
      const data = await fetch(apiUrl, {
        headers: {
          "accept": "application/plain"
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