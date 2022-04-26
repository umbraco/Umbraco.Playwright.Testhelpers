import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class MacroApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }


  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoTrees/MacrosTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let macroId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        macroId = sb.id;
      }
    }

    if (macroId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Macros/DeleteById?id=' + macroId);
    }
  }
  
  async saveMacro(name) {
    await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Macros/Create?name=' + name);
  }
  
  async exists(name){
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoTrees/MacrosTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);
    if (searchBody.length > 0) {
      for (const sb of searchBody) {
        if (sb.name === name) {
          return true;
        }
      }
    }
    return false;
  }
}