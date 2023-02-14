import { axiosFetch } from "../utils/AxiosFetch";
import * as vscode from 'vscode';

interface ISnippetRequestInformation {
    requestUrl: string;
    version: string;
    snippetLanguage: string;
}

export class SnippetProvider {
    private snippet: string = "";

    private constructor(snippet: string){
        this.snippet = snippet;
    } 

    static async initialize(currentPath: string){
        const { version, requestUrl } = SnippetProvider.generateParts(currentPath);
        const snippetLanguage = SnippetProvider.getCurrentLanguage();
        const generatedParts = { version, requestUrl, snippetLanguage };
        const generatedSnippetUrl = SnippetProvider.generateSnippetRequestUrl(generatedParts);
        const snippet = await SnippetProvider.makeSnippetRequest(generatedSnippetUrl);
        return new SnippetProvider(snippet);
    }

    private static getCurrentLanguage(){
        let activeEditor = vscode.window.activeTextEditor;
        let document = activeEditor!.document;
        return document.languageId || 'csharp';
    }

    private static generateParts = (currentPath: string) => {
        // https://graph.microsoft.com/v1.0/
        const v1Index = currentPath.indexOf('v1.0');
        const betaIndex = currentPath.indexOf('beta');
        const version = v1Index === -1 ? 'beta' : 'v1.0';
        const requestUrl = SnippetProvider.getRequestUrl(version, currentPath, v1Index, betaIndex);
        return { version, requestUrl };
    };

    private static getRequestUrl = (version: string, currentPath: string, vIndex: number, betaIndex: number) => {
        let requestUrl = '';
        if(version === 'beta'){
            requestUrl = currentPath.substring(betaIndex+4);
            return requestUrl;
        };
        requestUrl = currentPath.substring(vIndex+4);
        return requestUrl;
    };

    private static generateSnippetRequestUrl = (snippetRequestInformation: ISnippetRequestInformation): any => {
        const { requestUrl, version, snippetLanguage } = snippetRequestInformation;
    
        const method = 'post';
        let url = 'https://graphexplorerapi.azurewebsites.net/api/graphexplorersnippets';
        const headers = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/http'
        };
        const data = `GET /${version}/${requestUrl} HTTP/1.1\r\nHost: graph.microsoft.com\r\nContent-Type: application/json\r\n\r\n}`;
    
        if (snippetLanguage !== 'csharp') {
            url += `?lang=${snippetLanguage}`;
        }
        const openApiSnippets: string[] = ['go', 'powershell'];
        if (openApiSnippets.includes(snippetLanguage)) {
            url += '&generation=openapi';
        }    
        return { method, url, headers, data };
    };


    public static async makeSnippetRequest(generatedSnippetUrl: ISnippetRequestInformation): Promise<string>{
        const response: string= await axiosFetch(generatedSnippetUrl);
        return response;
    }

    public getSnippet(){
        return this.snippet;
    }
}