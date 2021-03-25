import { CompletionItemKind, SnippetString } from "vscode";

export interface Suggestion { 
  value: string; 
  description: string;
  completion?: CompletionItemKind;
  text?: string | SnippetString;
}