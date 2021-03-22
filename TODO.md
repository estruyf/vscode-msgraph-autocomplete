# TODO

Get the items from the enum for things you can select or expand

"paths": {
    "/me/drive": {
      "get": {
        "tags": [
          "me.drive"
        ],
        "summary": "Get drive from me",
        "operationId": "me.GetDrive",
        "parameters": [
          {
            "name": "$select",
            "in": "query",
            "description": "Select properties to be returned",
            "style": "form",
            "explode": false,
            "schema": {
              "uniqueItems": true,
              "type": "array",
              "items": {
                "enum": [
                  "id",
                  "createdBy",
                  "createdDateTime",
                  "description",
                  "eTag",
                  "lastModifiedBy",
                  "lastModifiedDateTime",
                  "name",
                  "parentReference",
                  "webUrl",
                  "driveType",
                  "owner",
                  "quota",
                  "sharePointIds",
                  "system",
                  "createdByUser",
                  "lastModifiedByUser",
                  "following",
                  "items",
                  "list",
                  "root",
                  "special"
                ],
                "type": "string"
              }
            }
          },
          {
            "name": "$expand",
            "in": "query",
            "description": "Expand related entities",
            "style": "form",
            "explode": false,
            "schema": {
              "uniqueItems": true,
              "type": "array",
              "items": {
                "enum": [
                  "*",
                  "createdByUser",
                  "lastModifiedByUser",
                  "following",
                  "items",
                  "list",
                  "root",
                  "special"
                ],
                "type": "string"
              }
            }
          }
        ],