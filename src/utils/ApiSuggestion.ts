import { Suggestion } from '../models';
import { sanitizePath } from '.';
import apis = require('../apis.json');
import pluralize = require('pluralize');

export class ApiSuggestion {

  /**
   * Get the API methods for the current path
   * @param path 
   * @param link 
   * @returns 
   */
  public static get(path: string, link: string): Suggestion {
    const suggestion = { 
      description: ``, 
      value: link, 
      text: link 
    };

    try {
      let fullPath = `${path === "/" ? "" : path}/${link}`;
      fullPath = sanitizePath(fullPath);
      const api = apis.find(a => a.path.toLowerCase() === fullPath.toLowerCase());
      if (api) {
        suggestion.description = `${pluralize(`Method`, api.methods.length)}: ${api.methods.map(m => m.toUpperCase()).join(', ')}`;
      }
    } catch (e) {
      console.log(e.message, `Path: ${path}`, `Link: ${link}`);
    }

    return suggestion;
  }
}