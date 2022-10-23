import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";
import {umbracoConfig} from "../../umbraco.config";

export class UserApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureEmailNotExits(email: string) {
    let response = await this.api.get(`${this.api.baseUrl}/umbraco/backoffice/UmbracoApi/Users/GetPagedUsers?pageNumber=1&pageSize=1&orderBy=Name&orderDirection=Ascending&filter=${email}`)
    const searchBody = await JsonHelper.getBody(response);
    if (searchBody.totalItems >= 1) {
      const userId = searchBody.items[0].id;
      await this.api.post(`${this.api.baseUrl}/umbraco/backoffice/UmbracoApi/Users/PostDeleteNonLoggedInUser?id=${userId}`)
    }
  }

  async ensureUserBelongsToGroup(name: string) {
    let response = await this.api.get(`${this.api.baseUrl}/umbraco/backoffice/umbracoapi/authentication/GetCurrentUser`)
    const searchBody = await JsonHelper.getBody(response);
    let userGroup = null;
    if (searchBody !== null) {
      for (const ug of searchBody.userGroups) {
        if (ug == name) {
            userGroup = ug;
        }
      }

      if (userGroup == null) {
        let params:{ [key: string]: string | number | boolean; } = {};
        params["userGroupAliases[0]"] = name;
        searchBody.userGroups.forEach(function (alias, i) {
            params[`userGroupAliases[${i + 1}]`] = alias;
        });
        params["userIds"] = searchBody.id;
        await this.api.get(`${this.api.baseUrl}/umbraco/backoffice/UmbracoApi/Users/PostSetUserGroupsOnUsers`, params);
        return;
      }
    }
  }

  async setCurrentLanguage(language) {
    let response = await this.api.get(`${this.api.baseUrl}/umbraco/backoffice/umbracoapi/authentication/GetCurrentUser`)
    const searchBody = await JsonHelper.getBody(response);
    const user = {
      id: searchBody.id,
      parentId: -1,
      name: searchBody.name,
      username: searchBody.email,
      culture: language,
      email: searchBody.email,
      startContentIds: [],
      startMediaIds: [],
      userGroups: searchBody.userGroups
    }
    await this.api.post(`${this.api.baseUrl}/umbraco/backoffice/umbracoapi/users/PostSaveUser`, user)
  }

  async deleteContentById(id) {
    await this.api.post(`${this.api.baseUrl}/umbraco/backoffice/UmbracoApi/Content/DeleteById?id=${id}`)
  }
  
  async postCreateUser(user){
      await this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/umbracoapi/users/PostCreateUser`, user)
  };
  
  
  
}