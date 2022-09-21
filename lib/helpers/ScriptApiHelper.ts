import {ApiHelpers} from "./ApiHelpers";
import {umbracoConfig} from "../../umbraco.config";
import {JsonHelper} from "./JsonHelper";
import {FolderApiHelper} from "./FolderApiHelper";

export class ScriptApiHelper {
  api: ApiHelpers
  private folderHelper: FolderApiHelper
  
  constructor(api: ApiHelpers) {
    this.api = api;
    this.folderHelper = new FolderApiHelper(api);
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
    
    return null;
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
  
  async save(script : object) {
    
    if(script == null) {
      return;
    }
    
    await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/codefile/PostSave', script);
  }
  
  async verifyContent(fileName : string, expectedContent : string){
    const response = await this.api.get(this.api.baseUrl + `/scripts/${fileName}`);
    const content = (await response.body()).toString();

    return content === expectedContent;
  }

  async saveFolder(name : string){
    return this.folderHelper.save('scripts', name);
  }
}