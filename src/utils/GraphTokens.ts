import { CompletionItemKind, SnippetString } from "vscode";
import { Suggestion } from "../models";


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

    const lastPath = path.split('/').pop()

    switch(lastPath?.toLowerCase()) {
      case "users":
        suggestions.push({ 
          description: "Provide the `user ID` or `UPN`", 
          value: "{users-id}",
          text: new SnippetString('${1:"Enter the user ID or UPN"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "calendargroups":
        suggestions.push({ 
          description: "Provide the `calendar group ID`", 
          value: "{calendarGroup-id}",
          text: new SnippetString('${1:"Enter the calendar group ID"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "calendars":
        suggestions.push({ 
          description: "Provide the `calendar ID`", 
          value: "{calendar-id}",
          text: new SnippetString('${1:"Enter the calendar ID"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "contactfolders":
        suggestions.push({ 
          description: "Provide the `contact folder ID`", 
          value: "{contactFolder-id}",
          text: new SnippetString('${1:"Enter the contact folder ID"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "childfolders":
        suggestions.push({ 
          description: "Provide the `contact child folder ID`", 
          value: "{childFolders-id}",
          text: new SnippetString('${1:"Enter the contact child folder ID"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "drives":
        suggestions.push({ 
          description: "Provide the `drive ID`", 
          value: "{drive-id}",
          text: new SnippetString('${1:"Enter the drive ID"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "items":
        suggestions.push({ 
          description: "Provide the `item ID`", 
          value: "{items-id}",
          text: new SnippetString('${1:"Enter the items ID"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "root:":
        suggestions.push({ 
          description: "Provide the `path relative to the root`", 
          value: "{path-relative-to-root}",
          text: new SnippetString('${1:"Enter the path relative to the root"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "manageddevices":
        suggestions.push({ 
          description: "Provide the `managed device ID`", 
          value: "{managedDevice-id}",
          text: new SnippetString('${1:"Provide the managed device ID"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
      case "detectedapps":
        suggestions.push({ 
          description: "Provide the `detected app ID`", 
          value: "{detectedApp-id}",
          text: new SnippetString('${1:"Provide the detected app ID"}'),
          completion: CompletionItemKind.Keyword
        });
        break;
    }

    return suggestions;
  }
}