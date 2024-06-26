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

import { mapValues } from '../runtime';
import type { EntityState } from './EntityState';
import {
    EntityStateFromJSON,
    EntityStateFromJSONTyped,
    EntityStateToJSON,
} from './EntityState';

/**
 * 
 * @export
 * @interface DtsVO
 */
export interface DtsVO {
    /**
     * 
     * @type {string}
     * @memberof DtsVO
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof DtsVO
     */
    description?: string;
    /**
     * 
     * @type {EntityState}
     * @memberof DtsVO
     */
    state?: EntityState;
    /**
     * 
     * @type {Array<EntityState>}
     * @memberof DtsVO
     */
    allowedTransitionStates?: Array<EntityState>;
    /**
     * 
     * @type {string}
     * @memberof DtsVO
     */
    label?: string;
    /**
     * 
     * @type {string}
     * @memberof DtsVO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof DtsVO
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof DtsVO
     */
    config?: string;
    /**
     * 
     * @type {string}
     * @memberof DtsVO
     */
    templateFk?: string;
    /**
     * 
     * @type {boolean}
     * @memberof DtsVO
     */
    debug?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof DtsVO
     */
    createdTs?: Date;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof DtsVO
     */
    deploymentConfig?: { [key: string]: string; };
}

/**
 * Check if a given object implements the DtsVO interface.
 */
export function instanceOfDtsVO(value: object): boolean {
    return true;
}

export function DtsVOFromJSON(json: any): DtsVO {
    return DtsVOFromJSONTyped(json, false);
}

export function DtsVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): DtsVO {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'] == null ? undefined : json['title'],
        'description': json['description'] == null ? undefined : json['description'],
        'state': json['state'] == null ? undefined : EntityStateFromJSON(json['state']),
        'allowedTransitionStates': json['allowedTransitionStates'] == null ? undefined : ((json['allowedTransitionStates'] as Array<any>).map(EntityStateFromJSON)),
        'label': json['label'] == null ? undefined : json['label'],
        'id': json['id'] == null ? undefined : json['id'],
        'name': json['name'] == null ? undefined : json['name'],
        'config': json['config'] == null ? undefined : json['config'],
        'templateFk': json['templateFk'] == null ? undefined : json['templateFk'],
        'debug': json['debug'] == null ? undefined : json['debug'],
        'createdTs': json['createdTs'] == null ? undefined : (new Date(json['createdTs'])),
        'deploymentConfig': json['deploymentConfig'] == null ? undefined : json['deploymentConfig'],
    };
}

export function DtsVOToJSON(value?: DtsVO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
        'description': value['description'],
        'state': EntityStateToJSON(value['state']),
        'allowedTransitionStates': value['allowedTransitionStates'] == null ? undefined : ((value['allowedTransitionStates'] as Array<any>).map(EntityStateToJSON)),
        'label': value['label'],
        'id': value['id'],
        'name': value['name'],
        'config': value['config'],
        'templateFk': value['templateFk'],
        'debug': value['debug'],
        'createdTs': value['createdTs'] == null ? undefined : ((value['createdTs']).toISOString()),
        'deploymentConfig': value['deploymentConfig'],
    };
}

