import pluralize = require("pluralize");
import { CompletionItemKind, SnippetString } from "vscode";
import { unzipJsonFile } from ".";
import { FILE_TOKENS } from "../constants";
import { API, Suggestion } from "../models";

export class GraphTokens {
  private static tokens: API[];

  /**
   * Retrieve token suggestions for certain endpoints
   * @param path 
   * @returns 
   */
  public static async getSuggestions(path: string): Promise<Suggestion[]> {
    const suggestions: Suggestion[] = [];

    if (!this.tokens) {
      this.tokens = await unzipJsonFile(FILE_TOKENS);
    }

    if (path.endsWith("/")) {
      path = path.substring(0, path.length -1);
    }

    const foundPath = this.tokens.find(t => t.path.toLowerCase() === path.toLowerCase());
    if (foundPath) {
      suggestions.push({ 
        description: `## ${foundPath.value}

${foundPath.description}${foundPath.methods && foundPath.methods.length > 0 ? `

## Supported ${pluralize(`method`, foundPath.methods.length)}: 

${foundPath.methods.map(m => `- **${m.name.toUpperCase()}**: ${m.description}`).join(`\n`)}` : ''}`, 
        value: foundPath.value,
        text: new SnippetString(`\${1:"${foundPath.snippetText}"}`),
        completion: CompletionItemKind.Keyword
      });
    }

    return suggestions;
  }
}