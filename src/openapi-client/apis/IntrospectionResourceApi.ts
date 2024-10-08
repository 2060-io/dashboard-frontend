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


import * as runtime from '../runtime';
import type {
  UIAction,
} from '../models/index';
import {
    UIActionFromJSON,
    UIActionToJSON,
} from '../models/index';

export interface IntrospEnumNameUiActionGetRequest {
    name: string;
    uiAction: UIAction;
}

export interface IntrospVoNameGetRequest {
    name: string;
}

/**
 * 
 */
export class IntrospectionResourceApi extends runtime.BaseAPI {

    /**
     * List attributes of an enumeration, visibles to the connected user
     * List enumeration attributes
     */
    async introspEnumNameUiActionGetRaw(requestParameters: IntrospEnumNameUiActionGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['name'] == null) {
            throw new runtime.RequiredError(
                'name',
                'Required parameter "name" was null or undefined when calling introspEnumNameUiActionGet().'
            );
        }

        if (requestParameters['uiAction'] == null) {
            throw new runtime.RequiredError(
                'uiAction',
                'Required parameter "uiAction" was null or undefined when calling introspEnumNameUiActionGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/introsp/enum/{name}/{uiAction}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters['name']))).replace(`{${"uiAction"}}`, encodeURIComponent(String(requestParameters['uiAction']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * List attributes of an enumeration, visibles to the connected user
     * List enumeration attributes
     */
    async introspEnumNameUiActionGet(requestParameters: IntrospEnumNameUiActionGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.introspEnumNameUiActionGetRaw(requestParameters, initOverrides);
    }

    /**
     * List attributes of an Entity, visibles to the connected user
     * List Entity attributes
     */
    async introspVoNameGetRaw(requestParameters: IntrospVoNameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['name'] == null) {
            throw new runtime.RequiredError(
                'name',
                'Required parameter "name" was null or undefined when calling introspVoNameGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/introsp/vo/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters['name']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * List attributes of an Entity, visibles to the connected user
     * List Entity attributes
     */
    async introspVoNameGet(requestParameters: IntrospVoNameGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.introspVoNameGetRaw(requestParameters, initOverrides);
    }

}
