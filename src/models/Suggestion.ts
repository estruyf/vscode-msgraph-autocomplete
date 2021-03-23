import { CompletionItemKind } from "vscode";

export interface Suggestion { 
  value: string; 
  description: string;
  completion?: CompletionItemKind;
}