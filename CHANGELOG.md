# Change Log

## [0.0.12]

- Implemented `gzip` for compressing the cached files
- Implemented API tests to validate API changes
- Show method descriptions

## [0.0.11]

- Enhanced the internal cache with the API methods
- Added support to show API methods per API
- Added support to show API methods for APIs with tokens

## [0.0.10]

- Adding all tokens via their full path to the `tokens.json` file

## [0.0.9]

- The `tokens.json` file gets automatically generated during the extension build

## [0.0.8]

- Pre-populate the cache during the extension release

## [0.0.7]

- Added `tokens.json` with all paths and their corresponding tokens

## [0.0.6]

- [#2](https://github.com/estruyf/vscode-msgraph-autocomplete/issues/2) - Included more MS Graph token support

## [0.0.5]

- License added
- Increased cache expiration to five days
- Changed the `{user-id}` snippet so that you can immediately enter your user ID or UPN

## [0.0.4]

- Faster extension activation by removing an async call on startup

## [0.0.3]

- Speed improvement by leveraging the `globalState` from VSCode for caching
- Added a command to clear the cache

## [0.0.2]

- [#1](https://github.com/estruyf/vscode-msgraph-autocomplete/issues/1): Added support for `{user-id}` token and `/users/` API path

## [0.0.1]

- Initial release