import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";

export class FolderApiHelper {
    api: ApiHelpers
    
    constructor(api: ApiHelpers) {
        this.api = api;
    }
    
    async save(section : string, name : string){
        const response = await this.api.post(this.api.baseUrl + `/umbraco/backoffice/UmbracoApi/CodeFile/PostCreateContainer?type=${section}&parentId=-1&name=${name}`);
        return JsonHelper.getBody(response);
    }
}