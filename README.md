<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-msgraph-autocomplete">
    <img alt="Doctor" src="./assets/logo.png" height="200">
  </a>
</p>

<h1 align="center">MS Graph Completion</h1>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-msgraph-autocomplete" title="Check it out on the Visual Studio Marketplace">
    <img src="https://vsmarketplacebadge.apphb.com/version/eliostruyf.vscode-msgraph-autocomplete.svg" alt="Visual Studio Marketplace" style="display: inline-block" />
  </a>

  <img src="https://vsmarketplacebadge.apphb.com/installs/eliostruyf.vscode-msgraph-autocomplete.svg" alt="Number of installs"  style="display: inline-block;margin-left:10px" />
  
  <img src="https://vsmarketplacebadge.apphb.com/rating/eliostruyf.vscode-msgraph-autocomplete.svg" alt="Ratings" style="display: inline-block;margin-left:10px" />
</p>

This VSCode extension allows you to auto-complete the Microsoft Graph API URLs you are writing. You get the most useful Microsoft Graph Explorer functionality in your favorite editor.

> **Info**: The extension does this with the help of the APIs behind the Microsoft Graph Explorer.

![](./assets/how-it-works.gif)

## Usage

Start typing `https://graph.microsoft.com/`, and you will automatically get suggestions to autocomplete the URL with API paths, query string parameters, and values.

### Tokens

The extension lets you know when you can insert values like the `user ID`, `UPN`, `group ID`, and more. It will do this for the known paths which are registered in the [tokens.json](./src/tokens.json) file.

![](./assets/user-id.gif)

> **Info**: The `tokens.json` file is automatically updated during the release process of the extension.

### Method(s)

During the build and release process of the extension, it fetches the metadata from Microsoft Graph and creates a library of known API endpoints. With this library, the extension is able to show you which API methods are available per endpoint.

![](./assets/methods-path.png)

The extension does this as well for the endpoints with tokens:

![](./assets/methods-tokens.png)

![](./assets/methods-tokens-path.png)

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