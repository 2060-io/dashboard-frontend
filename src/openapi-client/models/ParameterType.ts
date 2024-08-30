/* tslint:disable */
/* eslint-disable */
/**
 * dashboard-backend API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: main-20240823173931
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const ParameterType = {
    Global: 'GLOBAL',
    Keycloak: 'KEYCLOAK',
    EntityManagement: 'ENTITY_MANAGEMENT',
    Stats: 'STATS',
    ApiPolicies: 'API_POLICIES',
    ApiDebug: 'API_DEBUG',
    DaoDebug: 'DAO_DEBUG',
    ServiceDebug: 'SERVICE_DEBUG'
} as const;
export type ParameterType = typeof ParameterType[keyof typeof ParameterType];


export function instanceOfParameterType(value: any): boolean {
    return Object.values(ParameterType).includes(value);
}

export function ParameterTypeFromJSON(json: any): ParameterType {
    return ParameterTypeFromJSONTyped(json, false);
}

export function ParameterTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ParameterType {
    return json as ParameterType;
}

export function ParameterTypeToJSON(value?: ParameterType | null): any {
    return value as any;
}

