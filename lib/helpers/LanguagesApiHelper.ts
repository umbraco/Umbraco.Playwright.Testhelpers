import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class LanguagesApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }


  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Language/GetAllLanguages');
    const searchBody = await JsonHelper.getBody(response);

    let languageId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        languageId = sb.id;
      }
    }

    if (languageId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Language/DeleteLanguage?id=' + languageId);
    }
  }
  
  async ensureCultureNotExists(culture : string){
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/language/GetAllLanguages');
    const searchBody = await JsonHelper.getBody(response);

    let languageId = null;

    for (const sb of searchBody) {
      if (sb.culture == culture) {
        languageId = sb.id;
      }
    }

    if (languageId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/language/DeleteLanguage?id=' + languageId);
    }
  }
  
  async createLanguage(culture, isMandatory = false, fallbackLanguageId = 1){
    
    var langData =
      {
        "culture": culture,
        "isMandatory": isMandatory,
        "fallbackLanguageId": fallbackLanguageId
      };
    
    await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/language/SaveLanguage', langData);
  }
  
  async getLanguageId(culture : string){
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/language/GetAllLanguages');
    const searchBody = await JsonHelper.getBody(response);
    
    let languageId = null;

    for (const sb of searchBody) {
      if (sb.culture == culture) {
        languageId = sb.id;
      }
    }
    return languageId;
  }
}