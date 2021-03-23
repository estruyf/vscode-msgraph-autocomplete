import { OpenApiData, OpenApiResp, OpenApiResponse, Parameter, PathValue, Value } from "../models";


export class OpenApiParser {

  public static parseOpenApiResponse(params: OpenApiData): OpenApiResponse {
    const { response: { paths }, url } = params;
  
    try {
      const parameters: Parameter[] = [];
      const requestUrl = Object.keys(paths)[0];
      const verbs = Object.keys(paths[requestUrl]);
      const pathValues: PathValue = Object.values(paths)[0];
  
      verbs.forEach((verb: string) => {
        parameters.push({
          verb: verb as any,
          values: this.getVerbParameterValues(pathValues[verb]),
          links: this.getLinkValues(pathValues[verb])
        });
      });
  
      return { url, parameters };
    } catch (error) {
      throw new Error(error);
    }
  }

  public static getVerbParameterValues(values: OpenApiResp): Value[] {
    const parameterValues: any[] = [];
    const queryParameters = values.parameters;
    if (queryParameters && queryParameters.length > 0) {
      queryParameters.forEach((parameter) => {
        if (parameter.name && parameter.in === 'query') {
          parameterValues.push({
            name: parameter.name,
            description: parameter.description,
            items: (parameter.schema && parameter.schema.items) ? parameter.schema.items.enum : []
          });
        }
      });
    }
    return parameterValues;
  }

  public static getLinkValues(values: OpenApiResp): string[] {
    const responses = values.responses;
    if (responses) {
      const responsesAtIndex200 = responses['200'];
      if (responsesAtIndex200 && responsesAtIndex200.links) {
        return Object.keys(responsesAtIndex200.links);
      }
    }
    return [];
  }
}