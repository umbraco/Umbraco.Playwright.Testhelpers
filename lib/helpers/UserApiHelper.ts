import {ApiHelpers} from "./ApiHelpers";
import {UserBuilder} from "@umbraco/json-models-builders";
import {Page} from "@playwright/test";

export class UserApiHelper {
  api: ApiHelpers;
  page: Page;

  constructor(api: ApiHelpers, page: Page) {
    this.api = api;
    this.page = page;
  }

  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          // It takes a while to create the user, so if we delete it too fast. We get a DB lock
          await this.page.waitForTimeout(500);
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
    await this.page.waitForTimeout(500);
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user/' + id);
  }

  async deleteByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          await this.page.waitForTimeout(500);
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
    await this.page.waitForTimeout(500);
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
      "userIds": userIds.map(id => ({id})),
      "userGroupIds": userGroupIds.map(id => ({id}))
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/set-user-groups', userGroupsForUsers);
  }

  // Password
  async updateCurrentUserPassword(newPassword: string, oldPassword: string) {
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

  async updatePassword(id: string, newPassword: string) {
    const updatePassword = {
      "newPassword": newPassword,
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/' + id + '/change-password/', updatePassword);
  }
  
  // User Permissions
  async setUserSettingsToDefault(userName: string, userEmail: string, userPassword: string, userGroupId) {
    let user = await this.getByName(userName);
    if(!user) {
      await this.createDefaultUser(userName, userEmail, [userGroupId]);
      user = await this.getByName(userName);
      console.log(user);
      await this.updatePassword(user.id, userPassword);
    }

    // Makes sure the password is correct
    if(user.password !== userPassword) {
      await this.updatePassword(user.id, userPassword);
    }
    
    user.DocumentStartNodeIds = [];
    user.HasDocumentRootAccess = false;
    user.HasMediaRootAccess = false;
    user.MediaStartNodeIds = [];
    user.userGroupIds = [{id: userGroupId}];
    
    return await this.update(user.id, user);
  }
  
  async loginToUser(userName: string, userEmail: string,  userPassword: string) {
    const user = await this.getByName(userName);
    if(user) {
      await this.api.login.login(userEmail, userPassword);
    }

    // const currentUser = await this.getCurrentUser();
    // if(currentUser.name !== userName) {
    //   throw new Error('User is not logged in');
    // }
    // Reloads page to ensure the user is logged in
    await this.page.reload();
    
  }
  
}