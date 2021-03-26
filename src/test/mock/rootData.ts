export const rootData = {
  "openapi": "3.0.1",
  "info": {
    "title": "Partial Graph API",
    "version": "v1.0"
  },
  "servers": [
    {
      "url": "https://graph.microsoft.com/v1.0/",
      "description": "Core"
    }
  ],
  "paths": {
    "/": {
      "get": {
        "operationId": "graphService.GetGraphService",
        "responses": {
          "200": {
            "description": "OK",
            "links": {
              "invitations": { },
              "users": { },
              "applicationTemplates": { },
              "authenticationMethodConfigurations": { },
              "identityProviders": { },
              "applications": { },
              "certificateBasedAuthConfiguration": { },
              "contacts": { },
              "contracts": { },
              "devices": { },
              "directoryObjects": { },
              "directoryRoles": { },
              "directoryRoleTemplates": { },
              "domainDnsRecords": { },
              "domains": { },
              "groups": { },
              "groupSettings": { },
              "groupSettingTemplates": { },
              "localizations": { },
              "oauth2PermissionGrants": { },
              "organization": { },
              "permissionGrants": { },
              "scopedRoleMemberships": { },
              "servicePrincipals": { },
              "subscribedSkus": { },
              "workbooks": { },
              "places": { },
              "drives": { },
              "shares": { },
              "sites": { },
              "schemaExtensions": { },
              "groupLifecyclePolicies": { },
              "agreementAcceptances": { },
              "agreements": { },
              "dataPolicyOperations": { },
              "subscriptions": { },
              "chats": { },
              "teams": { },
              "teamsTemplates": { },
              "auditLogs": { },
              "authenticationMethodsPolicy": { },
              "identity": { },
              "branding": { },
              "directory": { },
              "me": { },
              "policies": { },
              "education": { },
              "drive": { },
              "communications": { },
              "identityGovernance": { },
              "deviceAppManagement": { },
              "deviceManagement": { },
              "reports": { },
              "search": { },
              "planner": { },
              "print": { },
              "security": { },
              "appCatalogs": { },
              "teamwork": { },
              "informationProtection": { }
            }
          }
        }
      }
    }
  },
  "components": { },
  "security": [
    {
      "azureaadv2": [ ]
    }
  ]
};