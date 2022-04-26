import {ApiHelpers} from "./ApiHelpers";
import {umbracoConfig} from "../../umbraco.config";
import {JsonHelper} from "./JsonHelper";

export class ScriptApiHelper {
  api: ApiHelpers
  
  constructor(api: ApiHelpers) {
    this.api = api;
  }
  
  async ensureNameNotExists(name: string) {
    const response = await this.api.get(`${umbracoConfig.environment.baseUrl}/umbraco/BackOffice/Api/ScriptsTree/GetNodes?id=-1`);
    const content = await JsonHelper.getBody(response);
    
    if(content.length > 0){
      let scriptId = null;
      
      for(const node of content){
        if(node.name === name){
          scriptId = node.id;
        }
      }
      
      if(scriptId !== null){
        return this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/CodeFile/Delete?type=scripts&virtualPath=${scriptId}`)
      }
    }
  }
  
  async exists(name : string) : Promise<boolean> {
    
    const response = await this.api.get(`${umbracoConfig.environment.baseUrl}/umbraco/BackOffice/Api/ScriptsTree/GetNodes?id=-1`)
    const content = await JsonHelper.getBody(response);
    
    if(content.length > 0){
      for (const node of content){
        if(node.name === name){
          return true;
        }
      }
    }
    
    return false;
  }
}