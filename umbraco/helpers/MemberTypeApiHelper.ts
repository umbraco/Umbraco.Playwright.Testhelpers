import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class MemberTypeApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }
  
  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/MemberType/GetAllTypes');
    const searchBody = await JsonHelper.getBody(response);

    let memberTypeId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        memberTypeId = sb.id;
      }
    }

    if (memberTypeId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Template/DeleteById?id=' + memberTypeId);
    }
  }
}