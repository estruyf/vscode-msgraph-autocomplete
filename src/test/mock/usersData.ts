export const usersData = {
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
    "/users": {
      "get": {
        "tags": [
          "users.user"
        ],
        "summary": "Get entities from users",
        "operationId": "users.user.ListUser",
        "parameters": [
          {
            "name": "ConsistencyLevel",
            "in": "header",
            "description": "Indicates the requested consistency level. Documentation URL: https://developer.microsoft.com/en-us/office/blogs/microsoft-graph-advanced-queries-for-directory-objects-are-now-generally-available/",
            "schema": {
              "type": "string"
            },
            "examples": {
              "example-1": {
                "description": "$search and $count queries require the client to set the ConsistencyLevel HTTP header to 'eventual'.",
                "value": "eventual"
              }
            }
          },
          {
            "name": "$top",
            "in": "query",
            "description": "Show only the first n items",
            "schema": {
              "minimum": 0,
              "type": "integer"
            },
            "example": 50
          },
          {
            "name": "$skip",
            "in": "query",
            "description": "Skip the first n items",
            "schema": {
              "minimum": 0,
              "type": "integer"
            }
          },
          {
            "name": "$search",
            "in": "query",
            "description": "Search items by search phrases",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "$filter",
            "in": "query",
            "description": "Filter items by property values",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "$count",
            "in": "query",
            "description": "Include count of items",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "$orderby",
            "in": "query",
            "description": "Order items by property values",
            "style": "form",
            "explode": false,
            "schema": {
              "uniqueItems": true,
              "type": "array",
              "items": {
                "enum": [
                  "id",
                  "id desc",
                  "deletedDateTime",
                  "deletedDateTime desc",
                  "accountEnabled",
                  "accountEnabled desc",
                  "ageGroup",
                  "ageGroup desc",
                  "assignedLicenses",
                  "assignedLicenses desc",
                  "assignedPlans",
                  "assignedPlans desc",
                  "businessPhones",
                  "businessPhones desc",
                  "city",
                  "city desc",
                  "companyName",
                  "companyName desc",
                  "consentProvidedForMinor",
                  "consentProvidedForMinor desc",
                  "country",
                  "country desc",
                  "createdDateTime",
                  "createdDateTime desc",
                  "creationType",
                  "creationType desc",
                  "department",
                  "department desc",
                  "displayName",
                  "displayName desc",
                  "employeeHireDate",
                  "employeeHireDate desc",
                  "employeeId",
                  "employeeId desc",
                  "employeeOrgData",
                  "employeeOrgData desc",
                  "employeeType",
                  "employeeType desc",
                  "externalUserState",
                  "externalUserState desc",
                  "externalUserStateChangeDateTime",
                  "externalUserStateChangeDateTime desc",
                  "faxNumber",
                  "faxNumber desc",
                  "givenName",
                  "givenName desc",
                  "identities",
                  "identities desc",
                  "imAddresses",
                  "imAddresses desc",
                  "isResourceAccount",
                  "isResourceAccount desc",
                  "jobTitle",
                  "jobTitle desc",
                  "lastPasswordChangeDateTime",
                  "lastPasswordChangeDateTime desc",
                  "legalAgeGroupClassification",
                  "legalAgeGroupClassification desc",
                  "licenseAssignmentStates",
                  "licenseAssignmentStates desc",
                  "mail",
                  "mail desc",
                  "mailNickname",
                  "mailNickname desc",
                  "mobilePhone",
                  "mobilePhone desc",
                  "officeLocation",
                  "officeLocation desc",
                  "onPremisesDistinguishedName",
                  "onPremisesDistinguishedName desc",
                  "onPremisesDomainName",
                  "onPremisesDomainName desc",
                  "onPremisesExtensionAttributes",
                  "onPremisesExtensionAttributes desc",
                  "onPremisesImmutableId",
                  "onPremisesImmutableId desc",
                  "onPremisesLastSyncDateTime",
                  "onPremisesLastSyncDateTime desc",
                  "onPremisesProvisioningErrors",
                  "onPremisesProvisioningErrors desc",
                  "onPremisesSamAccountName",
                  "onPremisesSamAccountName desc",
                  "onPremisesSecurityIdentifier",
                  "onPremisesSecurityIdentifier desc",
                  "onPremisesSyncEnabled",
                  "onPremisesSyncEnabled desc",
                  "onPremisesUserPrincipalName",
                  "onPremisesUserPrincipalName desc",
                  "otherMails",
                  "otherMails desc",
                  "passwordPolicies",
                  "passwordPolicies desc",
                  "passwordProfile",
                  "passwordProfile desc",
                  "postalCode",
                  "postalCode desc",
                  "preferredLanguage",
                  "preferredLanguage desc",
                  "provisionedPlans",
                  "provisionedPlans desc",
                  "proxyAddresses",
                  "proxyAddresses desc",
                  "showInAddressList",
                  "showInAddressList desc",
                  "signInSessionsValidFromDateTime",
                  "signInSessionsValidFromDateTime desc",
                  "state",
                  "state desc",
                  "streetAddress",
                  "streetAddress desc",
                  "surname",
                  "surname desc",
                  "usageLocation",
                  "usageLocation desc",
                  "userPrincipalName",
                  "userPrincipalName desc",
                  "userType",
                  "userType desc",
                  "mailboxSettings",
                  "mailboxSettings desc",
                  "deviceEnrollmentLimit",
                  "deviceEnrollmentLimit desc",
                  "aboutMe",
                  "aboutMe desc",
                  "birthday",
                  "birthday desc",
                  "hireDate",
                  "hireDate desc",
                  "interests",
                  "interests desc",
                  "mySite",
                  "mySite desc",
                  "pastProjects",
                  "pastProjects desc",
                  "preferredName",
                  "preferredName desc",
                  "responsibilities",
                  "responsibilities desc",
                  "schools",
                  "schools desc",
                  "skills",
                  "skills desc"
                ],
                "type": "string"
              }
            }
          },
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
                  "deletedDateTime",
                  "accountEnabled",
                  "ageGroup",
                  "assignedLicenses",
                  "assignedPlans",
                  "businessPhones",
                  "city",
                  "companyName",
                  "consentProvidedForMinor",
                  "country",
                  "createdDateTime",
                  "creationType",
                  "department",
                  "displayName",
                  "employeeHireDate",
                  "employeeId",
                  "employeeOrgData",
                  "employeeType",
                  "externalUserState",
                  "externalUserStateChangeDateTime",
                  "faxNumber",
                  "givenName",
                  "identities",
                  "imAddresses",
                  "isResourceAccount",
                  "jobTitle",
                  "lastPasswordChangeDateTime",
                  "legalAgeGroupClassification",
                  "licenseAssignmentStates",
                  "mail",
                  "mailNickname",
                  "mobilePhone",
                  "officeLocation",
                  "onPremisesDistinguishedName",
                  "onPremisesDomainName",
                  "onPremisesExtensionAttributes",
                  "onPremisesImmutableId",
                  "onPremisesLastSyncDateTime",
                  "onPremisesProvisioningErrors",
                  "onPremisesSamAccountName",
                  "onPremisesSecurityIdentifier",
                  "onPremisesSyncEnabled",
                  "onPremisesUserPrincipalName",
                  "otherMails",
                  "passwordPolicies",
                  "passwordProfile",
                  "postalCode",
                  "preferredLanguage",
                  "provisionedPlans",
                  "proxyAddresses",
                  "showInAddressList",
                  "signInSessionsValidFromDateTime",
                  "state",
                  "streetAddress",
                  "surname",
                  "usageLocation",
                  "userPrincipalName",
                  "userType",
                  "mailboxSettings",
                  "deviceEnrollmentLimit",
                  "aboutMe",
                  "birthday",
                  "hireDate",
                  "interests",
                  "mySite",
                  "pastProjects",
                  "preferredName",
                  "responsibilities",
                  "schools",
                  "skills",
                  "appRoleAssignments",
                  "createdObjects",
                  "directReports",
                  "licenseDetails",
                  "manager",
                  "memberOf",
                  "oauth2PermissionGrants",
                  "ownedDevices",
                  "ownedObjects",
                  "registeredDevices",
                  "scopedRoleMemberOf",
                  "transitiveMemberOf",
                  "calendar",
                  "calendarGroups",
                  "calendars",
                  "calendarView",
                  "contactFolders",
                  "contacts",
                  "events",
                  "inferenceClassification",
                  "mailFolders",
                  "messages",
                  "outlook",
                  "people",
                  "photo",
                  "photos",
                  "drive",
                  "drives",
                  "followedSites",
                  "extensions",
                  "agreementAcceptances",
                  "managedDevices",
                  "managedAppRegistrations",
                  "deviceManagementTroubleshootingEvents",
                  "planner",
                  "insights",
                  "settings",
                  "onenote",
                  "activities",
                  "onlineMeetings",
                  "presence",
                  "authentication",
                  "joinedTeams",
                  "teamwork",
                  "todo"
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
                  "appRoleAssignments",
                  "createdObjects",
                  "directReports",
                  "licenseDetails",
                  "manager",
                  "memberOf",
                  "oauth2PermissionGrants",
                  "ownedDevices",
                  "ownedObjects",
                  "registeredDevices",
                  "scopedRoleMemberOf",
                  "transitiveMemberOf",
                  "calendar",
                  "calendarGroups",
                  "calendars",
                  "calendarView",
                  "contactFolders",
                  "contacts",
                  "events",
                  "inferenceClassification",
                  "mailFolders",
                  "messages",
                  "outlook",
                  "people",
                  "photo",
                  "photos",
                  "drive",
                  "drives",
                  "followedSites",
                  "extensions",
                  "agreementAcceptances",
                  "managedDevices",
                  "managedAppRegistrations",
                  "deviceManagementTroubleshootingEvents",
                  "planner",
                  "insights",
                  "settings",
                  "onenote",
                  "activities",
                  "onlineMeetings",
                  "presence",
                  "authentication",
                  "joinedTeams",
                  "teamwork",
                  "todo"
                ],
                "type": "string"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Retrieved entities"
          },
          "default": {
            "description": "error"
          }
        },
        "x-ms-pageable": {
          "nextLinkName": "@odata.nextLink",
          "operationName": "listMore"
        },
        "x-ms-docs-operation-type": "operation"
      },
      "post": {
        "tags": [
          "users.user"
        ],
        "summary": "Add new entity to users",
        "operationId": "users.user.CreateUser",
        "requestBody": {
          "description": "New entity",
          "content": { },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Created entity"
          },
          "default": {
            "description": "error"
          }
        },
        "x-ms-docs-operation-type": "operation"
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