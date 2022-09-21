import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";
import {umbracoConfig} from "../../umbraco.config";

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
  
  async save(name) {
    await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Macros/Create?name=' + name);
  }
  
  async saveWithPartial(macro){
    let response = await this.api.partialViews.savePartialViewMacro(macro.partialView);
    let partialView = await JsonHelper.getBody(response);
    response = await this.api.post(umbracoConfig.environment.baseUrl + "/umbraco/backoffice/UmbracoApi/Macros/Create?name=" + macro.name);
    const macroId = await JsonHelper.getBody(response);
    response = await this.api.get(umbracoConfig.environment.baseUrl + "/umbraco/backoffice/UmbracoApi/Macros/GetById?id=" + macroId);
    const savedMacro = await JsonHelper.getBody(response);
    savedMacro.view = '~' + partialView.virtualPath;
    savedMacro.cacheByPage = macro.cacheByPage;
    savedMacro.cacheByUser = macro.cacheByUser;
    savedMacro.renderInEditor = macro.renderInEditor;
    savedMacro.useInEditor = macro.useInEditor;
    savedMacro.name = macro.name;
    
    return await this.api.post(umbracoConfig.environment.baseUrl + "/umbraco/backoffice/UmbracoApi/Macros/Save", savedMacro);
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