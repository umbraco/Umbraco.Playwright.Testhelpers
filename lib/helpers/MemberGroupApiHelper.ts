import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class MemberGroupApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoTrees/MemberGroupTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let memberGroupId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        memberGroupId = sb.id;
      }
    }

    if (memberGroupId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/MemberGroup/DeleteById?id=' + memberGroupId);
    }
  }
}