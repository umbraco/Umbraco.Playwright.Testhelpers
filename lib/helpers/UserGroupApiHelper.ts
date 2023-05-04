import {ApiHelpers} from "./ApiHelpers";

export class UserGroupApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureUserGroupNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + sb.id);
        }
      }
    }
    return null;
  }

  async createUserGroup(name: string, hasAccessToAllLanguages: boolean, sections: string[] = [], languages: string[] = [], permissions: string[] = [], icon?: string, documentStartNodeId?: string, mediaStartNodeId?: string) {
    const userGroupData = {
      "name": name,
      "icon": icon,
      "sections": sections,
      "languages": languages,
      "hasAccessToAllLanguages": hasAccessToAllLanguages,
      "documentStartNodeId": documentStartNodeId,
      "mediaStartNodeId": mediaStartNodeId,
      "permissions": permissions
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user-group', userGroupData);
  }

  async getUserGroupByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + sb.id);
          return await response.json();
        }
      }
    }
    return null;
  }

  async getUserGroupById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getAllUserGroups() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group?skip=0&take=10000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  // Does not work yet
  async updateUserGroupById(id: string, userGroup) {
    const response = await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + id, userGroup);
    return response.text();
  }

  async doesUserGroupWithNameExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group?skip=0&take=10000');
    const json = await response.json();
    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async deleteUserGroupById(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + id);
  }
}