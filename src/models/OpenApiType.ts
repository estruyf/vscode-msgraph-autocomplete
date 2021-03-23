export interface OpenApiType {
  openapi: string;
  info: Info;
  servers: Server[];
  paths: Paths;
  components: Invitations;
  security: Security[];
}

export interface Security {
  azureaadv2: any[];
}

export interface Paths {
  [apiPath: string]: PathValue;
}

export interface PathValue {
  [verb: string]: OpenApiResp;
}

export interface OpenApiResp {
  operationId: string;
  responses: Responses;
  parameters: ApiParameter[];
}

interface Items {
  enum: string[];
  type: string;
}

export interface Responses {
  '200': _200;
}

export interface _200 {
  description: string;
  links: Links;
}

export interface Links {
  invitations: Invitations;
  users: Invitations;
  applicationTemplates: Invitations;
  authenticationMethodConfigurations: Invitations;
  identityProviders: Invitations;
  applications: Invitations;
  certificateBasedAuthConfiguration: Invitations;
  contacts: Invitations;
  contracts: Invitations;
  devices: Invitations;
  directoryObjects: Invitations;
  directoryRoles: Invitations;
  directoryRoleTemplates: Invitations;
  domainDnsRecords: Invitations;
  domains: Invitations;
  groups: Invitations;
  groupSettings: Invitations;
  groupSettingTemplates: Invitations;
  localizations: Invitations;
  oauth2PermissionGrants: Invitations;
  organization: Invitations;
  permissionGrants: Invitations;
  scopedRoleMemberships: Invitations;
  servicePrincipals: Invitations;
  subscribedSkus: Invitations;
  workbooks: Invitations;
  places: Invitations;
  drives: Invitations;
  shares: Invitations;
  sites: Invitations;
  schemaExtensions: Invitations;
  groupLifecyclePolicies: Invitations;
  agreementAcceptances: Invitations;
  agreements: Invitations;
  dataPolicyOperations: Invitations;
  subscriptions: Invitations;
  chats: Invitations;
  teams: Invitations;
  teamsTemplates: Invitations;
  auditLogs: Invitations;
  authenticationMethodsPolicy: Invitations;
  identity: Invitations;
  branding: Invitations;
  directory: Invitations;
  me: Invitations;
  policies: Invitations;
  education: Invitations;
  drive: Invitations;
  communications: Invitations;
  identityGovernance: Invitations;
  deviceAppManagement: Invitations;
  deviceManagement: Invitations;
  reports: Invitations;
  search: Invitations;
  planner: Invitations;
  print: Invitations;
  security: Invitations;
  appCatalogs: Invitations;
  teamwork: Invitations;
  informationProtection: Invitations;
}

export interface Invitations {
}

export interface Server {
  url: string;
  description: string;
}

export interface Info {
  title: string;
  version: string;
}

export interface ApiParameter {
  name: string;
  in: string;
  description: string;
  schema: Schema;
  example?: number;
  style?: string;
  explode?: boolean;
}

export interface Schema {
  minimum?: number;
  type: string;
  uniqueItems?: boolean;
  items?: Items;
}