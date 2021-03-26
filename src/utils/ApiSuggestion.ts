import { API, Suggestion } from '../models';
import { sanitizePath, unzipJsonFile } from '.';
import pluralize = require('pluralize');
import { FILE_APIS } from '../constants';

export class ApiSuggestion {
  private static apis: API[]

  /**
   * Get the API methods for the current path
   * @param path 
   * @param link 
   * @returns 
   */
  public static async get(path: string, link: string): Promise<Suggestion> {
    const suggestion = { 
      description: ``, 
      value: link, 
      text: link 
    };

    if (!this.apis) {
      this.apis = await unzipJsonFile(FILE_APIS);
    }

    try {
      let fullPath = `${path === "/" ? "" : path}/${link}`;
      fullPath = sanitizePath(fullPath);
      const api = this.apis.find(a => a.path.toLowerCase() === fullPath.toLowerCase());
      if (api) {
        suggestion.description = `## Supported ${pluralize(`Method`, api.methods.length)}: 
        
${api.methods.map((m: any) => `- **${m.name.toUpperCase()}**: ${m.description}`).join(`\n`)}`;
      }
    } catch (e) {
      console.log(e.message, `Path: ${path}`, `Link: ${link}`);
    }

    return suggestion;
  }
}