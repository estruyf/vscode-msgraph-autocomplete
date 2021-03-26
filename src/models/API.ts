export interface API {
  path: string;
  description: string;
  methods: APIMethod[];
  value: string;
  snippetText?: string;
}

export interface APIMethod {
  name: string;
  description: string;
}