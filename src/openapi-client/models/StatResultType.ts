/* tslint:disable */
/* eslint-disable */
/**
 * dashboard-backend API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
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
export const StatResultType = {
    List: 'LIST',
    Sum: 'SUM',
    ListAndSum: 'LIST_AND_SUM'
} as const;
export type StatResultType = typeof StatResultType[keyof typeof StatResultType];


export function instanceOfStatResultType(value: any): boolean {
    return Object.values(StatResultType).includes(value);
}

export function StatResultTypeFromJSON(json: any): StatResultType {
    return StatResultTypeFromJSONTyped(json, false);
}

export function StatResultTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): StatResultType {
    return json as StatResultType;
}

export function StatResultTypeToJSON(value?: StatResultType | null): any {
    return value as any;
}
