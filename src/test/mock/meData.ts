export const meData = {
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
    "/me": {
      "get": {
        "tags": [
          "me.user"
        ],
        "summary": "Get me",
        "operationId": "me.user.GetUser",
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
            "name": "$select",
            "in": "query",
            "description": "Select properties to be returned",
            "style": "form",
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
                  "chats",
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
            "description": "Retrieved entity",
            "links": {
              "appRoleAssignments": {
                "operationId": "me.ListAppRoleAssignments"
              },
              "createdObjects": {
                "operationId": "me.ListCreatedObjects"
              },
              "directReports": {
                "operationId": "me.ListDirectReports"
              },
              "licenseDetails": {
                "operationId": "me.ListLicenseDetails"
              },
              "manager": {
                "operationId": "me.GetManager"
              },
              "memberOf": {
                "operationId": "me.ListMemberOf"
              },
              "oauth2PermissionGrants": {
                "operationId": "me.ListOauth2PermissionGrants"
              },
              "ownedDevices": {
                "operationId": "me.ListOwnedDevices"
              },
              "ownedObjects": {
                "operationId": "me.ListOwnedObjects"
              },
              "registeredDevices": {
                "operationId": "me.ListRegisteredDevices"
              },
              "scopedRoleMemberOf": {
                "operationId": "me.ListScopedRoleMemberOf"
              },
              "transitiveMemberOf": {
                "operationId": "me.ListTransitiveMemberOf"
              },
              "calendar": {
                "operationId": "me.GetCalendar"
              },
              "calendarGroups": {
                "operationId": "me.ListCalendarGroups"
              },
              "calendars": {
                "operationId": "me.ListCalendars"
              },
              "calendarView": {
                "operationId": "me.ListCalendarView"
              },
              "contactFolders": {
                "operationId": "me.ListContactFolders"
              },
              "contacts": {
                "operationId": "me.ListContacts"
              },
              "events": {
                "operationId": "me.ListEvents"
              },
              "inferenceClassification": {
                "operationId": "me.GetInferenceClassification"
              },
              "mailFolders": {
                "operationId": "me.ListMailFolders"
              },
              "messages": {
                "operationId": "me.ListMessages"
              },
              "outlook": {
                "operationId": "me.GetOutlook"
              },
              "people": {
                "operationId": "me.ListPeople"
              },
              "photo": {
                "operationId": "me.GetPhoto"
              },
              "photos": {
                "operationId": "me.ListPhotos"
              },
              "drive": {
                "operationId": "me.GetDrive"
              },
              "drives": {
                "operationId": "me.ListDrives"
              },
              "followedSites": {
                "operationId": "me.ListFollowedSites"
              },
              "extensions": {
                "operationId": "me.ListExtensions"
              },
              "agreementAcceptances": {
                "operationId": "me.ListAgreementAcceptances"
              },
              "managedDevices": {
                "operationId": "me.ListManagedDevices"
              },
              "managedAppRegistrations": {
                "operationId": "me.ListManagedAppRegistrations"
              },
              "deviceManagementTroubleshootingEvents": {
                "operationId": "me.ListDeviceManagementTroubleshootingEvents"
              },
              "planner": {
                "operationId": "me.GetPlanner"
              },
              "insights": {
                "operationId": "me.GetInsights"
              },
              "settings": {
                "operationId": "me.GetSettings"
              },
              "onenote": {
                "operationId": "me.GetOnenote"
              },
              "activities": {
                "operationId": "me.ListActivities"
              },
              "onlineMeetings": {
                "operationId": "me.ListOnlineMeetings"
              },
              "presence": {
                "operationId": "me.GetPresence"
              },
              "authentication": {
                "operationId": "me.GetAuthentication"
              },
              "chats": {
                "operationId": "me.ListChats"
              },
              "joinedTeams": {
                "operationId": "me.ListJoinedTeams"
              },
              "teamwork": {
                "operationId": "me.GetTeamwork"
              },
              "todo": {
                "operationId": "me.GetTodo"
              }
            }
          },
          "default": {
            "description": "error"
          }
        },
        "x-ms-docs-operation-type": "operation"
      },
      "patch": {
        "tags": [
          "me.user"
        ],
        "summary": "Update me",
        "operationId": "me.user.UpdateUser",
        "requestBody": {
          "description": "New property values",
          "content": { },
          "required": true
        },
        "responses": {
          "204": {
            "description": "Success"
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