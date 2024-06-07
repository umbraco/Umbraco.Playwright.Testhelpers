import {ApiHelpers} from "./ApiHelpers";
import {UserBuilder} from "@umbraco/json-models-builders";

export class UserApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user/' + sb.id);
        }
      }
    }
    return null;
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user/' + id);
    return response.status() === 200;
  }

  async doesNameExist(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user/' + sb.id);
          return await response.json();
        }

      }
    }
    return null;
  }

  async create(userData) {
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user', userData);
    return response.headers().location.split("/").pop();
  }

  async update(id: string, userData) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/user/' + id, userData);
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user/' + id);
  }

  async deleteByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user/' + sb.id);

        }
      }
    }
    return null;
  }

  async saveUser(user) {
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user', user);
  }

  // Avatar
  async addAvatar(id: string, fileId: string) {
    const avatar = {
      'file':
        {
          'id': fileId
        }
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/avatar/' + id, avatar);
  }

  async removeAvatar(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user/avatar/' + id);
  }

  // Enable/Disabled and Unlock
  async disable(ids: string[]) {
    const users = {
      "userIds": ids.map(id => ({id}))
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/disable', users);
  }

  async enable(ids: string[]) {
    const users = {
      "userIds": ids.map(id => ({id}))
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/enable', users);
  }

  async unlock(ids: string[]) {
    const users = {
      "userIds": ids.map(id => ({id}))
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/unlock', users);
  }

  async getCurrentUser() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user/current');
    return await response.json();
  }

  // Set User Groups for Users
  async setUserGroups(userIds: string[], userGroupIds: string[]) {
    const userGroupsForUsers = {
      "userIds": userIds.map(id => ({id}))
      ,
      "userGroupIds": userGroupIds.map(id => ({id}))

    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/set-user-groups', userGroupsForUsers);
  }

  // Password
  async updatePassword(newPassword: string, oldPassword: string) {
    const updatePassword = {
      "newPassword": newPassword,
      "oldPassword": oldPassword
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/change-password/', updatePassword);
  }

  // Invite
  async invite(email: string, name: string, userGroupIds: string[], message: string) {
    const userInvite = {
      "email": email,
      "userName": email,
      "name": name,
      "userGroupIds": userGroupIds.map(id => ({id})),
      "message": message
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/invite', userInvite);
  }

  async createDefaultUser(nameOfUser: string, email: string, userGroupIds: string[]) {
    const user = new UserBuilder()
      .withName(nameOfUser)
      .withEmail(email)
      .build();

    for (const userGroupId of userGroupIds) {
      user.userGroupIds.push({id: userGroupId});
    }
    return await this.create(user);
  }

  async addDefaultAvatarImageToUser(userId: string) {
    const crypto = require('crypto');
    const temporaryFileId = crypto.randomUUID();
    const filePath = './fixtures/mediaLibrary/Umbraco.png';
    const fileName = 'Umbraco.png';
    const mimeType = 'image/png';
    await this.api.temporaryFile.create(temporaryFileId, fileName, mimeType, filePath);

    return await this.addAvatar(userId, temporaryFileId);
  }

  async doesUserContainUserGroupIds(userName: string, userGroupIds: string[]) {
    const user = await this.getByName(userName);
    if (!user.userGroupIds || user.userGroupIds.length === 0) {
      return false;
    }
    const userGroupIdsArray = user.userGroupIds.map(group => group.id);
    return userGroupIdsArray.every(id => userGroupIds.includes(id));
  }

  async doesUserContainContentStartNodeIds(userName: string, documentStartNodeIds: string[]) {
    const user = await this.getByName(userName);
    if (!user.documentStartNodeIds || user.documentStartNodeIds.length === 0) {
      return false;
    }
    const documentStartNodeIdsArray = user.documentStartNodeIds.map(documentStartNode => documentStartNode.id);
    return documentStartNodeIdsArray.every(id => documentStartNodeIds.includes(id));
  }

  async doesUserContainMediaStartNodeIds(userName: string, mediaStartNodeIds: string[]) {
    const user = await this.getByName(userName);
    if (!user.mediaStartNodeIds || user.mediaStartNodeIds.length === 0) {
      return false;
    }
    const mediaStartNodeIdsArray = user.mediaStartNodeIds.map(mediaStartNode => mediaStartNode.id);
    return mediaStartNodeIdsArray.every(id => mediaStartNodeIds.includes(id));
  }
}