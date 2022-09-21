import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class StylesheetApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backOffice/Api/StylesheetsTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let stylesheetId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        stylesheetId = sb.id;
      }
    }

    if (stylesheetId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/CodeFile/Delete?type=stylesheets&virtualPath=' + stylesheetId);
    }
  }
  
  async save(stylesheet){
    await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/codefile/PostSave', stylesheet);
  }
}