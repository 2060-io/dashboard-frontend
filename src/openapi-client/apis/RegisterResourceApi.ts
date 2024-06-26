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


import * as runtime from '../runtime';
import type {
  App,
} from '../models/index';
import {
    AppFromJSON,
    AppToJSON,
} from '../models/index';

export interface RegisterAppInstanceIdEntityIdPutRequest {
    app: App;
    entityId: string;
    instanceId: string;
}

/**
 * 
 */
export class RegisterResourceApi extends runtime.BaseAPI {

    /**
     * Register a App Instance with id instanceId for App app, optionally linked to Entity entityId (link required for DTS Apps.
     * Register an App instance, optionally linked to Entity entityId (link required for DTS Apps)
     */
    async registerAppInstanceIdEntityIdPutRaw(requestParameters: RegisterAppInstanceIdEntityIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['app'] == null) {
            throw new runtime.RequiredError(
                'app',
                'Required parameter "app" was null or undefined when calling registerAppInstanceIdEntityIdPut().'
            );
        }

        if (requestParameters['entityId'] == null) {
            throw new runtime.RequiredError(
                'entityId',
                'Required parameter "entityId" was null or undefined when calling registerAppInstanceIdEntityIdPut().'
            );
        }

        if (requestParameters['instanceId'] == null) {
            throw new runtime.RequiredError(
                'instanceId',
                'Required parameter "instanceId" was null or undefined when calling registerAppInstanceIdEntityIdPut().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/register/{app}/{instanceId}/{entityId}`.replace(`{${"app"}}`, encodeURIComponent(String(requestParameters['app']))).replace(`{${"entityId"}}`, encodeURIComponent(String(requestParameters['entityId']))).replace(`{${"instanceId"}}`, encodeURIComponent(String(requestParameters['instanceId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Register a App Instance with id instanceId for App app, optionally linked to Entity entityId (link required for DTS Apps.
     * Register an App instance, optionally linked to Entity entityId (link required for DTS Apps)
     */
    async registerAppInstanceIdEntityIdPut(requestParameters: RegisterAppInstanceIdEntityIdPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.registerAppInstanceIdEntityIdPutRaw(requestParameters, initOverrides);
    }

}
