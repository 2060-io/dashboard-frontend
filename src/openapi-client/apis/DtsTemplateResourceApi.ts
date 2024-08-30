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
  DtsTemplateFilter,
  DtsTemplateVO,
  ErrorResponse,
} from '../models/index';
import {
    DtsTemplateFilterFromJSON,
    DtsTemplateFilterToJSON,
    DtsTemplateVOFromJSON,
    DtsTemplateVOToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
} from '../models/index';

export interface DtstCloneIdCloneIdPutRequest {
    cloneId: string;
    id: string;
}

export interface DtstGetIdGetRequest {
    id: string;
}

export interface DtstListPostRequest {
    dtsTemplateFilter?: DtsTemplateFilter;
}

export interface DtstSavePostRequest {
    dtsTemplateVO?: DtsTemplateVO;
}

/**
 * 
 */
export class DtsTemplateResourceApi extends runtime.BaseAPI {

    /**
     * Clone and return a Dts Template
     * Clone and return a Dts Template
     */
    async dtstCloneIdCloneIdPutRaw(requestParameters: DtstCloneIdCloneIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DtsTemplateVO>> {
        if (requestParameters['cloneId'] == null) {
            throw new runtime.RequiredError(
                'cloneId',
                'Required parameter "cloneId" was null or undefined when calling dtstCloneIdCloneIdPut().'
            );
        }

        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling dtstCloneIdCloneIdPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/dtst/clone/{id}/{cloneId}`.replace(`{${"cloneId"}}`, encodeURIComponent(String(requestParameters['cloneId']))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DtsTemplateVOFromJSON(jsonValue));
    }

    /**
     * Clone and return a Dts Template
     * Clone and return a Dts Template
     */
    async dtstCloneIdCloneIdPut(requestParameters: DtstCloneIdCloneIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DtsTemplateVO> {
        const response = await this.dtstCloneIdCloneIdPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a Dts Template
     * Get a Dts Template
     */
    async dtstGetIdGetRaw(requestParameters: DtstGetIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DtsTemplateVO>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling dtstGetIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/dtst/get/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DtsTemplateVOFromJSON(jsonValue));
    }

    /**
     * Get a Dts Template
     * Get a Dts Template
     */
    async dtstGetIdGet(requestParameters: DtstGetIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DtsTemplateVO> {
        const response = await this.dtstGetIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List Dts Templates
     * List Dts Templates
     */
    async dtstListPostRaw(requestParameters: DtstListPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<DtsTemplateVO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/dtst/list`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DtsTemplateFilterToJSON(requestParameters['dtsTemplateFilter']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DtsTemplateVOFromJSON));
    }

    /**
     * List Dts Templates
     * List Dts Templates
     */
    async dtstListPost(requestParameters: DtstListPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<DtsTemplateVO>> {
        const response = await this.dtstListPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create or update a Dts Template
     * Create or update a Dts Template
     */
    async dtstSavePostRaw(requestParameters: DtstSavePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/dtst/save`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DtsTemplateVOToJSON(requestParameters['dtsTemplateVO']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create or update a Dts Template
     * Create or update a Dts Template
     */
    async dtstSavePost(requestParameters: DtstSavePostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.dtstSavePostRaw(requestParameters, initOverrides);
    }

}
