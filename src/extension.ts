import * as vscode from 'vscode';
import { AutoCompleteProvider } from './providers/AutoCompleteProvider';
import { AutoComplete } from './utils/AutoComplete';

export async function activate(context: vscode.ExtensionContext) {
	const initData = await AutoComplete.get("/");

	const selector : vscode.DocumentSelector = [{
		pattern: '**'
	}];

	let disposable = vscode.languages.registerCompletionItemProvider(selector, new AutoCompleteProvider(initData), '/');

	context.subscriptions.push(disposable);

	console.log('Congratulations, your extension "vscode-msgraph-autocomplete" is now active!');
}

// this method is called when your extension is deactivated
export function deactivate() {}
