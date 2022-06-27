import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class MemberApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureEmailNotExists(email: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Member/GetPagedResults?pageNumber=1&pageSize=1&orderBy=Name&orderDirection=Ascending&filter=' + email);
    const searchBody = await JsonHelper.getBody(response);

    if(searchBody.totalItems >= 1){
      const memberKey = searchBody.items[0].key;

      if (memberKey !== null) {
        await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Member/DeleteByKey?key=' + memberKey);
      }
    }    
  }
}