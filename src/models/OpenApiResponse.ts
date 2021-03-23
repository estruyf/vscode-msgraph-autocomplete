export interface OpenApiResponse {
  url: string;
  parameters: Parameter[];
}

export interface Parameter {
  verb: "get" | "post" | "patch" | "delete";
  values: Value[];
  links: string[];
}

export interface Value {
  name: string;
  description: string;
  items: string[];
}