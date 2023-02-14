import { CacheProvider } from './providers/CacheProvider';
import * as vscode from 'vscode';
import { EXTENSION_NAME } from './constants';
import { AutoCompleteProvider } from './providers/AutoCompleteProvider';

export async function activate(context: vscode.ExtensionContext) {

	const selector : vscode.DocumentSelector = [{
		pattern: '**'
	}];

	const disposable = vscode.languages.registerCompletionItemProvider(selector, new AutoCompleteProvider(context), '/', '?', '&', '=', ',', '-');

	const clearCache = vscode.commands.registerCommand('msgraph.autocomplete.clearCache', async () => {
		const cache: CacheProvider = CacheProvider.getInstance(context, "name");
		cache.clear();
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(clearCache);

	console.log(`${EXTENSION_NAME} active`);
}

// this method is called when your extension is deactivated
export function deactivate() {}
