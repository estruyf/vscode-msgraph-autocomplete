const url = require('native-url');
import { CancellationToken, CompletionItem, CompletionItemKind, CompletionItemProvider, Position, TextDocument } from 'vscode';
import { PATH_BETA, PATH_V1 } from '../constants';
import { Suggestion, OpenApiGet, OpenApiType, Parameter } from '../models';
import { AutoComplete } from '../utils/AutoComplete';

export class AutoCompleteProvider implements CompletionItemProvider {
  private lastPath: string = "";
  private cache: { [version: string]: { [path: string]: any } } = {};
  
  constructor(rootData: OpenApiType | null) {
    this.cache = {
      v1: {
        "/": rootData
      },
      beta: {}
    };
  }

  /**
   * Autocomplete provider for Microsoft Graph
   * @param document 
   * @param position 
   * @param token 
   * @returns 
   */
  public async provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {
    let currentLine = document.getText(document.lineAt(position).range);
    // Stripping out the text of where you placed the slash
    currentLine = currentLine.substring(0, position.character);

    const character = currentLine.substring(position.character - 1, position.character);

    const v1 = currentLine.toLowerCase().includes(`/${PATH_V1}/`);
    const beta = currentLine.toLowerCase().includes(`/${PATH_BETA}/`);

    if (!v1 && !beta) {
      if (currentLine.toLowerCase().includes("https://graph.microsoft.com/")) {
        return [
          new CompletionItem(`${PATH_V1}`, CompletionItemKind.Value),
          new CompletionItem(`${PATH_BETA}`, CompletionItemKind.Value)
        ];
      }
      return [];
    }

    const split = currentLine.split(v1 ? `/${PATH_V1}` : `/${PATH_BETA}`);
    const last = split.pop();
    let suggestions: Suggestion[] = [];

    if (character === "/") {
      suggestions = await this.getPaths(v1, last as string);
    } else if (character === "?" || character === "&") {
      let path = last as string;
      if (path.endsWith("?") || path.endsWith("&")) {
        path = path.substring(0, path.length - 1);
      }
      suggestions = await this.getParameters(v1, path);
    }

    return suggestions.map(s => {
      const suggestion = new CompletionItem(s.value, CompletionItemKind.Value);
      suggestion.detail = s.description;
      return suggestion;
    });
  }

  /**
   * Get all path suggestions
   * @param isV1 
   * @param path 
   * @returns 
   */
  private async getPaths(isV1: boolean, path: string): Promise<Suggestion[]> {
    let suggestions: Suggestion[] = [];

    if (path) {
      this.lastPath = path;
      const apiPath = path === "/" ? "/" : path.substring(0, path.length - 1);

      if (this.cache[isV1 ? "v1" : "beta"][apiPath]) {
        suggestions = this.getLinkValues(this.cache[isV1 ? "v1" : "beta"][apiPath]?.paths[apiPath].get);
      } else {
        const apiData = await AutoComplete.get(apiPath, isV1 ? PATH_V1 : PATH_BETA);
        
        this.cache[isV1 ? "v1" : "beta"][apiPath] = apiData;
  
        suggestions = this.getLinkValues(apiData?.paths[apiPath].get);
      }
    }

    return suggestions;
  }

  /**
   * Retrieve the parameters for the current API
   * @param isV1 
   * @param path 
   */
  private async getParameters(isV1: boolean, path: string): Promise<Suggestion[]> {
    let suggestions: Suggestion[] = [];

    if (!path.endsWith("/")) {
      path = `${path}/`;
    }
    
    if (path) {
      const uri = url.parse(path);
      const { pathname } = uri;
      let apiPath = pathname === "/" ? "/" : pathname.substring(0, pathname.length - 1);

      if (this.cache[isV1 ? "v1" : "beta"][apiPath]) {
        suggestions = this.getVerbParameterValues(this.cache[isV1 ? "v1" : "beta"][apiPath]?.paths[apiPath].get);
      } else {
        const apiData = await AutoComplete.get(apiPath, isV1 ? PATH_V1 : PATH_BETA);
        
        this.cache[isV1 ? "v1" : "beta"][apiPath] = apiData;
  
        suggestions = this.getVerbParameterValues(apiData?.paths[apiPath].get);
      }
    }

    return suggestions;
  }

  /**
   * Retrieve the available parameters
   * @param values 
   * @returns 
   */
  private getVerbParameterValues(values: OpenApiGet | undefined): Suggestion[] {
    const parameterValues: Suggestion[] = [];

    if (values) {
      const queryParameters = values.parameters;
      if (queryParameters && queryParameters.length > 0) {
        queryParameters.forEach((parameter: Parameter) => {
          if (parameter.name && parameter.in === 'query') {
            parameterValues.push({
              value: parameter.name,
              description: parameter.description
            });
          }
        });
      }
    }

    return parameterValues;
  }

  /**
   * Retrieve all the values for available endpoints
   * @param values 
   * @returns 
   */
  private getLinkValues(values: OpenApiGet | undefined): Suggestion[] {
    if (values) {
      const responses = values.responses;
      if (responses) {
        const responsesAtIndex200 = responses['200'];
        if (responsesAtIndex200 && responsesAtIndex200.links) {
          return Object.keys(responsesAtIndex200.links).map(s => ({ value: s, description: responsesAtIndex200.description }));
        }
      }
    }
    return [];
  }
}