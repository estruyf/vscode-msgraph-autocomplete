import { CancellationToken, CompletionItem, CompletionItemProvider, Position, TextDocument } from 'vscode';
import { OpenApiGet, OpenApiType } from '../models/OpenApiType';
import { AutoComplete } from '../utils/AutoComplete';


export class AutoCompleteProvider implements CompletionItemProvider {
  
  constructor(private rootData: OpenApiType | null) {}

  public async provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionItem[]> {
    let currentLine = document.getText(document.lineAt(position).range);

    currentLine = currentLine.substring(0, position.character);

    const v1 = currentLine.toLowerCase().includes("/v1.0/");
    const beta = currentLine.toLowerCase().includes("/beta/");

    if (!v1 && !beta) {
      return [];
    }

    const split = currentLine.split(v1 ? "/v1.0" : "/beta");
    const last = split.pop();
    let links: string[] = [];

    if (last === "/") {
      links = this.getLinkValues(this.rootData?.paths['/'].get);
    } else if (last) {
      const apiPath = last.substring(0, last.length - 1);

      const apiData = await AutoComplete.get(apiPath, v1 ? "v1.0" : "beta");
      console.log(apiData);

      links = this.getLinkValues(apiData?.paths[apiPath].get);
    }

    console.log(links);

    return links.map(l => new CompletionItem(l));
  }


  private getLinkValues(values: OpenApiGet | undefined): string[] {
    if (values) {
      const responses = values.responses;
      if (responses) {
        const responsesAtIndex200 = responses['200'];
        if (responsesAtIndex200 && responsesAtIndex200.links) {
          return Object.keys(responsesAtIndex200.links);
        }
      }
    }
    return [];
  }
}