import pluralize = require("pluralize");
import { CompletionItemKind, SnippetString } from "vscode";
import { Suggestion } from "../models";
import tokens = require('../tokens.json');

export class GraphTokens {

  /**
   * Retrieve token suggestions for certain endpoints
   * @param path 
   * @returns 
   */
  public static getSuggestions(path: string): Suggestion[] {
    const suggestions = [];

    if (path.endsWith("/")) {
      path = path.substring(0, path.length -1);
    }

    const foundPath = tokens.find(t => t.path.toLowerCase() === path.toLowerCase());
    if (foundPath) {
      suggestions.push({ 
        description: `### ${foundPath.value}

${foundPath.description}${foundPath.methods && foundPath.methods.length > 0 ? `

Supported ${pluralize(`method`, foundPath.methods.length)}: ${foundPath.methods.map(m => m.toUpperCase()).join(', ')}` : ''}`, 
        value: foundPath.value,
        text: new SnippetString(`\${1:"${foundPath.snippetText}"}`),
        completion: CompletionItemKind.Keyword
      });
    }

    return suggestions;
  }
}