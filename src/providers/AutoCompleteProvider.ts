const url = require('native-url');
import { CancellationToken, CompletionItem, CompletionItemKind, CompletionItemProvider, MarkdownString, Position, TextDocument, ExtensionContext } from 'vscode';
import { MS_GRAPH, PATH_BETA, PATH_V1 } from '../constants';
import { Suggestion, OpenApiResponse, Value } from '../models';
import { CacheProvider } from './CacheProvider';
import { AutoComplete, GraphTokens, OpenApiParser, sanitizePath, ApiSuggestion } from '../utils';
import { SnippetProvider } from './SnippetProvider';

export class AutoCompleteProvider implements CompletionItemProvider {
  private lastApiPath: string = "";
  private values: Value[] = [];
  private cache: CacheProvider;
  
  constructor(context: ExtensionContext) {
    this.cache = CacheProvider.getInstance(context, "cache", { v1: {}, beta: {} });
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
      if (currentLine.toLowerCase().includes(MS_GRAPH)) {
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

    else if(character === "-"){
      const splicedPath = currentLine.slice(0,-1);
      const snippetObject = await SnippetProvider.initialize(splicedPath);
      const snippet = snippetObject.getSnippet();
      const snippetCompletionItem = new CompletionItem(snippet);
      snippetCompletionItem.documentation = snippet;
      snippetCompletionItem.insertText = "\n" + snippet;
      return [snippetCompletionItem];
    }

    return suggestions.map(s => {
      const suggestion = new CompletionItem(s.value, s.completion || CompletionItemKind.Value);
      if (s.description) {
        suggestion.documentation = new MarkdownString(s.description);
      }
      suggestion.insertText = s.text || s.value;
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

      suggestions = await GraphTokens.getSuggestions(path);

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
        const links = parsedApiData.parameters[0].links;
        const tokens: Suggestion[] = [];
        for (const link of links) {
          tokens.push(await ApiSuggestion.get(apiPath, link));
        }
        suggestions = [...suggestions, ...tokens];
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