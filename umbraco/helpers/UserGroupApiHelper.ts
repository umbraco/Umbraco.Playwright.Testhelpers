import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";
import { umbracoConfig } from "../../umbraco.config";

export class UserGroupApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureEmailNotExits(name:string){
    let response = await this.api.get(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/UserGroups/GetUserGroups?onlyCurrentUserGroups=false`);
    const searchBody = await JsonHelper.getBody(response);
    if (searchBody.length > 0) {
      let userGroupId = null;
      for (const sb of searchBody) {
        if (sb.name === name) {
          userGroupId = sb.id;
        }
      }

      if (userGroupId !== null) {
        await this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/UserGroups/PostDeleteUserGroups?userGroupIds=${userGroupId}`)
      }
    }
  }

  async deleteContentById(id){
    await this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/Content/DeleteById?id=${id}`)
  }
}