import {ApiHelpers} from "./ApiHelpers";
import {umbracoConfig} from "../../umbraco.config";
import {JsonHelper} from "./JsonHelper";

export class DatatypeApiHelper {
  api: ApiHelpers
  
  constructor(api: ApiHelpers) {
    this.api = api;
  }
  
  async ensureNameNotExists(name: string){
    const response = await this.api.get(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/DataType/GetByName?name=${name}`);
    const content = await JsonHelper.getBody(response);
    
    if(content != null){
      const dataTypeId = content.id;
      
      if(dataTypeId !== null){
        await this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/DataType/DeleteById?id=${dataTypeId}`);
      }
    }
  }
  
  async save(dataType: any){
    if(dataType == null){
      return;
    }
    
    return this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/DataType/PostSave`, dataType);
  }
}