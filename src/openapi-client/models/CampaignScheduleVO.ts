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
 * @interface CampaignScheduleVO
 */
export interface CampaignScheduleVO {
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    label?: string;
    /**
     * 
     * @type {EntityState}
     * @memberof CampaignScheduleVO
     */
    state?: EntityState;
    /**
     * 
     * @type {Array<EntityState>}
     * @memberof CampaignScheduleVO
     */
    allowedTransitionStates?: Array<EntityState>;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    campaignName?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    campaignId?: string;
    /**
     * 
     * @type {Date}
     * @memberof CampaignScheduleVO
     */
    fromTs?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CampaignScheduleVO
     */
    toTs?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    monday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    tuesday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    wednesday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    thursday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    friday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    saturday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    sunday?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h0?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h1?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h2?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h3?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h4?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h5?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h6?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h7?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h8?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h9?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h10?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h11?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h12?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h13?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h14?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h15?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h16?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h17?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h18?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h19?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h20?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h21?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h22?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof CampaignScheduleVO
     */
    h23?: boolean;
    /**
     * 
     * @type {number}
     * @memberof CampaignScheduleVO
     */
    sentLimit?: number;
    /**
     * 
     * @type {Date}
     * @memberof CampaignScheduleVO
     */
    deletedTs?: Date;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    todaySent?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    todayDelivered?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    todayViewed?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    todayPa?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    todayCtr?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    todayCtrPercentColor?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    allTimeSent?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    allTimeDelivered?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    allTimeViewed?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    allTimePa?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    allTimeCtr?: string;
    /**
     * 
     * @type {string}
     * @memberof CampaignScheduleVO
     */
    allTimeCtrPercentColor?: string;
    /**
     * 
     * @type {number}
     * @memberof CampaignScheduleVO
     */
    todayEfficiency?: number;
    /**
     * 
     * @type {number}
     * @memberof CampaignScheduleVO
     */
    allTimeEfficiency?: number;
}

/**
 * Check if a given object implements the CampaignScheduleVO interface.
 */
export function instanceOfCampaignScheduleVO(value: object): boolean {
    return true;
}

export function CampaignScheduleVOFromJSON(json: any): CampaignScheduleVO {
    return CampaignScheduleVOFromJSONTyped(json, false);
}

export function CampaignScheduleVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CampaignScheduleVO {
    if (json == null) {
        return json;
    }
    return {
        
        'description': json['description'] == null ? undefined : json['description'],
        'label': json['label'] == null ? undefined : json['label'],
        'state': json['state'] == null ? undefined : EntityStateFromJSON(json['state']),
        'allowedTransitionStates': json['allowedTransitionStates'] == null ? undefined : ((json['allowedTransitionStates'] as Array<any>).map(EntityStateFromJSON)),
        'campaignName': json['campaignName'] == null ? undefined : json['campaignName'],
        'id': json['id'] == null ? undefined : json['id'],
        'campaignId': json['campaignId'] == null ? undefined : json['campaignId'],
        'fromTs': json['fromTs'] == null ? undefined : (new Date(json['fromTs'])),
        'toTs': json['toTs'] == null ? undefined : (new Date(json['toTs'])),
        'monday': json['monday'] == null ? undefined : json['monday'],
        'tuesday': json['tuesday'] == null ? undefined : json['tuesday'],
        'wednesday': json['wednesday'] == null ? undefined : json['wednesday'],
        'thursday': json['thursday'] == null ? undefined : json['thursday'],
        'friday': json['friday'] == null ? undefined : json['friday'],
        'saturday': json['saturday'] == null ? undefined : json['saturday'],
        'sunday': json['sunday'] == null ? undefined : json['sunday'],
        'h0': json['h0'] == null ? undefined : json['h0'],
        'h1': json['h1'] == null ? undefined : json['h1'],
        'h2': json['h2'] == null ? undefined : json['h2'],
        'h3': json['h3'] == null ? undefined : json['h3'],
        'h4': json['h4'] == null ? undefined : json['h4'],
        'h5': json['h5'] == null ? undefined : json['h5'],
        'h6': json['h6'] == null ? undefined : json['h6'],
        'h7': json['h7'] == null ? undefined : json['h7'],
        'h8': json['h8'] == null ? undefined : json['h8'],
        'h9': json['h9'] == null ? undefined : json['h9'],
        'h10': json['h10'] == null ? undefined : json['h10'],
        'h11': json['h11'] == null ? undefined : json['h11'],
        'h12': json['h12'] == null ? undefined : json['h12'],
        'h13': json['h13'] == null ? undefined : json['h13'],
        'h14': json['h14'] == null ? undefined : json['h14'],
        'h15': json['h15'] == null ? undefined : json['h15'],
        'h16': json['h16'] == null ? undefined : json['h16'],
        'h17': json['h17'] == null ? undefined : json['h17'],
        'h18': json['h18'] == null ? undefined : json['h18'],
        'h19': json['h19'] == null ? undefined : json['h19'],
        'h20': json['h20'] == null ? undefined : json['h20'],
        'h21': json['h21'] == null ? undefined : json['h21'],
        'h22': json['h22'] == null ? undefined : json['h22'],
        'h23': json['h23'] == null ? undefined : json['h23'],
        'sentLimit': json['sentLimit'] == null ? undefined : json['sentLimit'],
        'deletedTs': json['deletedTs'] == null ? undefined : (new Date(json['deletedTs'])),
        'todaySent': json['todaySent'] == null ? undefined : json['todaySent'],
        'todayDelivered': json['todayDelivered'] == null ? undefined : json['todayDelivered'],
        'todayViewed': json['todayViewed'] == null ? undefined : json['todayViewed'],
        'todayPa': json['todayPa'] == null ? undefined : json['todayPa'],
        'todayCtr': json['todayCtr'] == null ? undefined : json['todayCtr'],
        'todayCtrPercentColor': json['todayCtrPercentColor'] == null ? undefined : json['todayCtrPercentColor'],
        'allTimeSent': json['allTimeSent'] == null ? undefined : json['allTimeSent'],
        'allTimeDelivered': json['allTimeDelivered'] == null ? undefined : json['allTimeDelivered'],
        'allTimeViewed': json['allTimeViewed'] == null ? undefined : json['allTimeViewed'],
        'allTimePa': json['allTimePa'] == null ? undefined : json['allTimePa'],
        'allTimeCtr': json['allTimeCtr'] == null ? undefined : json['allTimeCtr'],
        'allTimeCtrPercentColor': json['allTimeCtrPercentColor'] == null ? undefined : json['allTimeCtrPercentColor'],
        'todayEfficiency': json['todayEfficiency'] == null ? undefined : json['todayEfficiency'],
        'allTimeEfficiency': json['allTimeEfficiency'] == null ? undefined : json['allTimeEfficiency'],
    };
}

export function CampaignScheduleVOToJSON(value?: CampaignScheduleVO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'description': value['description'],
        'label': value['label'],
        'state': EntityStateToJSON(value['state']),
        'allowedTransitionStates': value['allowedTransitionStates'] == null ? undefined : ((value['allowedTransitionStates'] as Array<any>).map(EntityStateToJSON)),
        'campaignName': value['campaignName'],
        'id': value['id'],
        'campaignId': value['campaignId'],
        'fromTs': value['fromTs'] == null ? undefined : ((value['fromTs']).toISOString()),
        'toTs': value['toTs'] == null ? undefined : ((value['toTs']).toISOString()),
        'monday': value['monday'],
        'tuesday': value['tuesday'],
        'wednesday': value['wednesday'],
        'thursday': value['thursday'],
        'friday': value['friday'],
        'saturday': value['saturday'],
        'sunday': value['sunday'],
        'h0': value['h0'],
        'h1': value['h1'],
        'h2': value['h2'],
        'h3': value['h3'],
        'h4': value['h4'],
        'h5': value['h5'],
        'h6': value['h6'],
        'h7': value['h7'],
        'h8': value['h8'],
        'h9': value['h9'],
        'h10': value['h10'],
        'h11': value['h11'],
        'h12': value['h12'],
        'h13': value['h13'],
        'h14': value['h14'],
        'h15': value['h15'],
        'h16': value['h16'],
        'h17': value['h17'],
        'h18': value['h18'],
        'h19': value['h19'],
        'h20': value['h20'],
        'h21': value['h21'],
        'h22': value['h22'],
        'h23': value['h23'],
        'sentLimit': value['sentLimit'],
        'deletedTs': value['deletedTs'] == null ? undefined : ((value['deletedTs']).toISOString()),
        'todaySent': value['todaySent'],
        'todayDelivered': value['todayDelivered'],
        'todayViewed': value['todayViewed'],
        'todayPa': value['todayPa'],
        'todayCtr': value['todayCtr'],
        'todayCtrPercentColor': value['todayCtrPercentColor'],
        'allTimeSent': value['allTimeSent'],
        'allTimeDelivered': value['allTimeDelivered'],
        'allTimeViewed': value['allTimeViewed'],
        'allTimePa': value['allTimePa'],
        'allTimeCtr': value['allTimeCtr'],
        'allTimeCtrPercentColor': value['allTimeCtrPercentColor'],
        'todayEfficiency': value['todayEfficiency'],
        'allTimeEfficiency': value['allTimeEfficiency'],
    };
}

