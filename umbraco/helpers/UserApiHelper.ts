import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";
import { umbracoConfig } from "../../umbraco.config";

export class UserApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureEmailNotExits(email:string){
    let response = await this.api.get(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/Users/GetPagedUsers?pageNumber=1&pageSize=1&orderBy=Name&orderDirection=Ascending&filter=${email}`)
    const searchBody = await JsonHelper.getBody(response);
    if (searchBody.totalItems >= 1) {
      const userId = searchBody.items[0].id;
      await this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/Users/PostDeleteNonLoggedInUser?id=${userId}`)
    }
  }

  async deleteContentById(id){
    await this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/Content/DeleteById?id=${id}`)
  }
}