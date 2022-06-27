import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class MemberApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureEmailNotExists(email: string) {
    const response = await this.api.get(this.api.baseUrl + '/backoffice/UmbracoApi/Member/GetPagedResults?pageNumber=1&pageSize=1&orderBy=Name&orderDirection=Ascending&filter=' + email);
    const searchBody = await JsonHelper.getBody(response);

    if(searchBody.length <= 0){
      return;
    }

    let memberKey = null;

    for (const sb of searchBody) {
      if (sb.name === name) {
        memberKey = sb.id;
      }
    }

    if (memberKey !== null) {
      await this.api.post(this.api.baseUrl + '/backoffice/UmbracoApi/Member/DeleteByKey?key=' + memberKey);
    }
  }
}