export interface DtscCollectionVO {
    /**
     * @type {string}
     * @memberof DtscCollectionVO
     */
    description?:string;

    /**
     * @type {string}
     * @memberof DtscCollectionVO
     */
    id?:string;

    /**
     * @type {string}
     * @memberof DtscCollectionVO
     */
    name?:string;

    /**
     * @type {string}
     * @memberof DtscCollectionVO
     */
    template?:string;

    /**
     * @type {string}
     * @memberof DtscCollectionVO
     */
    templateRepo?:string;

    /**
     * @type {Date}
     * @memberof DtscCollectionVO
     */
    createdTs?: Date;
}

/**
 * Check if a given object implements the DtscCollectionVO interface.
 */
export function instanceOfDtscCollectionVO(value: object): boolean {
    return true;
}

export function DtscCollectionVOFromJSON(json: any): DtscCollectionVO {
    return DtscCollectionVOFromJSONTyped(json, false);
}

export function DtscCollectionVOFromJSONTyped(json: any, ignoreDiscriminator: boolean): DtscCollectionVO {
    if(null == json){
        return json;
    }
    return {
        description: json['description'] === null ? undefined : json['description'],
        id: json['id'] === null ? undefined : json['id'],
        name: json['name'] === null ? undefined : json['name'],
        template: json['template'] === null ? undefined : json['template'],
        templateRepo: json['templateRepo'] === null ? undefined : json['templateRepo'],
        createdTs: json['createdTs'] === null ? undefined : new Date(json['createdTs']),
    }
}

export function DtscCollectionVOToJSON(value?: DtscCollectionVO | null): any {
    if(null == value){
        return value;
    }
    return {
        description: value['description'],
        id: value['id'],
        name: value['name'],
        template: value['template'],
        templateRepo: value['templateRepo'],
        createdTs: value['createdTs'],
    }
}