/**
 * Credits for this code to Graph Explorer
 * https://github.com/microsoftgraph/microsoft-graph-explorer-v4
 */

import pluralize = require("pluralize");

const ALL_ALPHA_REGEX = /^[a-z]+$/i;
// Matches strings with deprecation identifier
const DEPRECATION_REGEX = /^[a-z]+_v2$/gi;
// Matches patterns like users('MeganB@M365x214355.onmicrosoft.com')
const FUNCTION_CALL_REGEX = /^[a-z]+\(.*\)$/i;
// Matches entity and entity set name patterns like microsoft.graph.group or all letters
const ENTITY_NAME_REGEX = /^((microsoft.graph(.[a-z]+)+)|[a-z]+)$/i;
// Matches patterns like root: <value>
const SANITIZED_ITEM_PATH_REGEX = /^[a-z]+:<value>$/i;


export function isAllAlpha(str: string): boolean {
  return ALL_ALPHA_REGEX.test(str);
}

export function isDeprecation(segment: string): boolean {
  return DEPRECATION_REGEX.test(segment);
}

export function isFunctionCall(segment: string): boolean {
  return FUNCTION_CALL_REGEX.test(segment);
}

/**
 * Clear out any users/files/...
 * @param apiPath query url to be sanitized e.g. https://graph.microsoft.com/v1.0/users/{user-id}
 * @returns 
 */
export function sanitizePath(apiPath: string) {
  apiPath = apiPath.startsWith("/") ? apiPath.substring(1) : apiPath;
  const urlSegments = apiPath.split('/');
  urlSegments.forEach((segment, index) => {
    const sanitizedSegment = sanitizePathSegment(urlSegments[index - 1], segment);
    apiPath = apiPath.replace(segment, sanitizedSegment);
  });
  return `/${apiPath}`;
}

/**
 * Skipped segments:
 * - Entities, entity sets and navigation properties, expected to contain alphabetic letters only
 * - Deprecated entities in the form <entity>_v2
 * The remaining URL segments are assumed to be variables that need to be sanitized
 * @param previousSegment
 * @param segment
 */
export function sanitizePathSegment(previousSegment: string, segment: string): string {
  const segmentsToIgnore = ['$value', '$count', '$ref'];

  if (isAllAlpha(segment) || isDeprecation(segment) || SANITIZED_ITEM_PATH_REGEX.test(segment)
    || segmentsToIgnore.includes(segment.toLowerCase()) || ENTITY_NAME_REGEX.test(segment)) {
    return segment;
  }

  // Check if segment is in this form: users('<some-id>|<UPN>') and tranform to users(<value>)
  if (isFunctionCall(segment)) {
    const openingBracketIndex = segment.indexOf('(');
    const textWithinBrackets = segment.substr(openingBracketIndex + 1, segment.length - 2);
    const sanitizedText = textWithinBrackets.split(',').map(text => {
      if (text.includes('=')) {
        let key = text.split('=')[0];
        key = !isAllAlpha(key) ? '<key>' : key;
        return `${key}=<value>`;
      }
      return '<value>';
    }).join(',');
    return `${segment.substring(0, openingBracketIndex)}(${sanitizedText})`;
  }

  if (!isAllAlpha(previousSegment) && !isDeprecation(previousSegment)) {
    previousSegment = 'unknown';
  }

  return `{${pluralize.singular(previousSegment)}-id}`;
}