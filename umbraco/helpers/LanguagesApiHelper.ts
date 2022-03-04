import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class LanguagesApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }


  async EnsureNameNotExists(name: string) {
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
}