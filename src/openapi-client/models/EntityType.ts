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
export const EntityType = {
    Dts: 'DTS',
    Campaign: 'CAMPAIGN',
    CampaignSchedule: 'CAMPAIGN_SCHEDULE',
    Parameter: 'PARAMETER',
    DtsTemplate: 'DTS_TEMPLATE'
} as const;
export type EntityType = typeof EntityType[keyof typeof EntityType];


export function instanceOfEntityType(value: any): boolean {
    return Object.values(EntityType).includes(value);
}

export function EntityTypeFromJSON(json: any): EntityType {
    return EntityTypeFromJSONTyped(json, false);
}

export function EntityTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityType {
    return json as EntityType;
}

export function EntityTypeToJSON(value?: EntityType | null): any {
    return value as any;
}

