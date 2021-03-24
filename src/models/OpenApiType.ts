export interface OpenApiType {
  openapi: string;
  info: Info;
  servers: Server[];
  paths: Paths;
  components: any;
  security: Security[];
}

export interface Security {
  azureaadv2: any[];
}

export interface Paths {
  [apiPath: string]: PathValue;
}

export interface PathValue {
  [verb: string]: PathValueResp;
}

export interface PathValueResp {
  operationId: string;
  responses: Responses;
  parameters: ApiParameter[];
  tags: string[];
  summary: string;
  requestBody: any;
}

interface Items {
  enum: string[];
  type: string;
}

export interface Responses {
  '200': OkResponse;
}

export interface OkResponse {
  description: string;
  links: any[];
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