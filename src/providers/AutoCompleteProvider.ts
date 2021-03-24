import { OpenApiParser } from './../utils/OpenApiParser';
const url = require('native-url');
import { CancellationToken, CompletionItem, CompletionItemKind, CompletionItemProvider, Position, TextDocument } from 'vscode';
import { PATH_BETA, PATH_V1 } from '../constants';
import { Suggestion, OpenApiType, OpenApiResponse, Value } from '../models';
import { AutoComplete } from '../utils/AutoComplete';
import { sanitizePath } from '../utils/SanitizePathSegments';
import { CacheProvider } from './CacheProvider';
import { ExtensionContext } from 'vscode';

export class AutoCompleteProvider implements CompletionItemProvider {
  private lastApiPath: string = "";
  private values: Value[] = [];
  private cache: CacheProvider;
  
  constructor(context: ExtensionContext) {
    this.cache = CacheProvider.getInstance(context, "cache", { v1: {}, beta: {} });

    // When initialized, do the default API calls instead of doing this on startup
    this.getPaths(true, "/");
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

    const apiSplit = currentLine.split(v1 ? `/${PATH_V1}` : `/${PATH_BETA}`);
    const apiPath = apiSplit.pop();
    let suggestions: Suggestion[] = [];

    if (character === "/") {
      this.values = [];
      suggestions = await this.getPaths(v1, apiPath as string);
    } else if (character === "?" || character === "&") {
      this.values = [];
      let api = apiPath as string;
      if (api.endsWith("?") || api.endsWith("&")) {
        api = api.substring(0, api.length - 1);
      }
      suggestions = await this.getParameters(v1, api);
    } else if (character === "=" || character === "," ) {
      if (this.values.length > 0) {
        suggestions = this.getParameterValues(apiPath as string);
      } else {
        return [];
      }
    }

    return suggestions.map(s => {
      const suggestion = new CompletionItem(s.value, s.completion || CompletionItemKind.Value);
      if (s.description) {
        suggestion.detail = s.description;
      }
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
      this.lastApiPath = path;

      if (path === "/users/") {
        suggestions.push({ description: "Provide your user ID or username", value: "{users-id}", completion: CompletionItemKind.Keyword });
      }

      let apiPath = path;
      if (apiPath !== "/") {
        apiPath = path.substring(0, path.length - 1);
        apiPath = sanitizePath(apiPath);
      }

      let parsedApiData: OpenApiResponse | null = null;

      const cachedData = await this.cache.get((isV1 ? "v1" : "beta"), apiPath);
      if (cachedData) {
        parsedApiData = OpenApiParser.parseOpenApiResponse({ response: cachedData, url: apiPath });
      } else {
        const apiData = await AutoComplete.get(apiPath, isV1 ? PATH_V1 : PATH_BETA);
        
        if (apiData) {
          await this.cache.put((isV1 ? "v1" : "beta"), apiPath, apiData);
        }
        
        parsedApiData = apiData ? OpenApiParser.parseOpenApiResponse({ response: apiData, url: apiPath }) : null;
      }

      if (parsedApiData && parsedApiData.parameters && parsedApiData.parameters.length > 0) {
        suggestions = [...suggestions, ...parsedApiData.parameters[0].links.map(l => ({ description: "", value: l }))];
      }
    }

    return suggestions;
  }

  /**
   * Retrieve the parameters for the current API
   * @param isV1 
   * @param path 
   */
  private async getParameters(isV1: boolean, path: string | null): Promise<Suggestion[]> {
    let suggestions: Suggestion[] = [];
    
    if (path) {
      const receivedPath = url.parse(path);
      if (!path.endsWith("/") && !receivedPath.query) {
        path = `${path}/`;
      }

      const uri = url.parse(path);
      let { pathname } = uri;
      if (!pathname.endsWith("/")) {
        pathname = `${pathname}/`;
      }

      let apiPath = path;
      if (apiPath !== "/") {
        apiPath = path.substring(0, path.length - 1);
        apiPath = sanitizePath(apiPath);
      }

      let parsedApiData: OpenApiResponse | null = null;

      const cachedData = await this.cache.get((isV1 ? "v1" : "beta"), apiPath);
      if (cachedData) {
        parsedApiData = OpenApiParser.parseOpenApiResponse({ response: cachedData, url: apiPath });
      } else {
        const apiData = await AutoComplete.get(apiPath, isV1 ? PATH_V1 : PATH_BETA);
        
        if (apiData) {
          await this.cache.put((isV1 ? "v1" : "beta"), apiPath, apiData);
        }
  
        parsedApiData = apiData ? OpenApiParser.parseOpenApiResponse({ response: apiData, url: apiPath }) : null;
      }

      if (parsedApiData && parsedApiData.parameters && parsedApiData.parameters.length > 0) {
        this.values = parsedApiData.parameters[0].values;
        suggestions = parsedApiData.parameters[0].values.map(v => ({ description: v.description, value: v.name }));
      } else {
        this.values = [];
      }
    }

    return suggestions;
  }

  /**
   * Retrieves the parameter values
   */
  private getParameterValues(path: string | null): Suggestion[] {
    let suggestions: Suggestion[] = [];

    if (path) {
      const uri = url.parse(path);
      
      if (!uri.query) {
        return suggestions;
      }
      
      const lastQuery: string = uri.query.split("&").pop();

      for (const value of this.values) {
        if (lastQuery.includes(value.name)) {
          suggestions = value.items.map(i => ({ description: "", value: i }));
        }
      }
    }

    return suggestions;
  }
}