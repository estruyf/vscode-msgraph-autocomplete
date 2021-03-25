# MS Graph Completion

This VSCode extension allows you to auto-complete the Microsoft Graph API URLs you are writing. You get the most useful Microsoft Graph Explorer functionality in your favorite editor.

> **Info**: The extension does this with the help of the APIs behind the Microsoft Graph Explorer.

![](./assets/how-it-works.gif)

## Usage

Start typing `https://graph.microsoft.com/`, and you will automatically get suggestions to autocomplete the URL with API paths, query string parameters, and values.

### Tokens

The extension lets you know when you can insert values like the `user ID`, `UPN`, `group ID`, and more. It will do this for the known paths which are registered in the [tokens.json](./src/tokens.json) file.

![](./assets/user-id.gif)

> **Info**: The `tokens.json` file is automatically updated during the release process of the extension.

### Commands

#### MS Graph: Clear autocomplete cache

By default, the cached data persists for 5 days. If you want, you can always clear the cache by using the *MS Graph: Clear autocomplete cache* (`msgraph.autocomplete.clearCache`) command.

![](./assets/clear-cache.png)

## What is supported?

Currently, the extension only supports the `GET` requests for the Microsoft Graph.

## Contributing

If you find this a useful extension and want to see more functionalities added. Feel free to contribute: [GitHub Repository](https://github.com/estruyf/vscode-msgraph-autocomplete).

## Feedback / issues / ideas

Please submit them via creating an issue in the project repository: [issue list](https://github.com/estruyf/vscode-msgraph-autocomplete/issues).

<p align="center">
  <a href="#">
      <img src="https://estruyf-github.azurewebsites.net/api/VisitorHit?user=estruyf&repo=vscode-msgraph-autocomplete&countColor=%23161938" />
   </a>
</p>