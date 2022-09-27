import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class PartialViewApiHelper{
    api: ApiHelpers

    constructor(api: ApiHelpers) {
        this.api = api;
    }

    async ensureNameNotExists(name: string) {
        const response = await this.api.get(this.api.baseUrl + "/umbraco/backoffice/UmbracoTrees/PartialViewsTree/GetNodes?id=-1");
        const content = await JsonHelper.getBody(response);

        if(content.length > 0){
            
            for(const node of content){
                if(node.name === name){
                    return this.api.post(this.api.baseUrl + "/umbraco/backoffice/UmbracoApi/CodeFile/Delete?type=partialViews&virtualPath=" + name);
                }
            }
        }
        return null;
    }

    async ensureMacroFileNameNotExists(name: string) {
        const response = await this.api.get(this.api.baseUrl + "/umbraco/backoffice/UmbracoTrees/PartialViewMacrosTree/GetNodes?id=-1");
        const content = await JsonHelper.getBody(response);

        if(content.length > 0){
            let partialViewMacroId = null;

            for(const node of content){
                if(node.name === name){
                    partialViewMacroId = node.id;
                }
            }

            if(partialViewMacroId !== null){
                return this.api.post(this.api.baseUrl + "/umbraco/backoffice/UmbracoApi/CodeFile/Delete?type=partialViewMacros&virtualPath=" + partialViewMacroId);
            }
        }
        
        return null;
    }
    
    async save(partialView){
        await this.api.post(this.api.baseUrl + "/umbraco/backoffice/UmbracoApi/CodeFile/PostSave", partialView)
    }
    
    async savePartialViewMacro(partialViewMacro){
        return await this.api.saveCodeFile(partialViewMacro);
    }
}