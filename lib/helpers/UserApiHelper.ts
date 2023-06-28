﻿import {ApiHelpers} from "./ApiHelpers";

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

  async exists(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user/' + id);
    return response.status() === 200;
  }

  async nameExists(name: string) {
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

  async create(email, name, userGroupIds) {
    const userData = {
      "email": email,
      "userName": email,
      "name": name,
      "userGroupIds": userGroupIds
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user', userData);
    // Returns the id of the user
    const json = await response.json();
    return json.userId;
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

  // Avatar
  async addAvatar(id: string, fileId) {
    const avatar = {
      'fileId': fileId
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/avatar/' + id, avatar);
  }

  async removeAvatar(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user/avatar/' + id);
  }

  // Enable/Disabled and Unlock

  async disable(ids) {
    const users = {
      "userIds": ids
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/disable', users);
  }

  async enable(ids) {
    const users = {
      "userIds": ids
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/enable', users);
  }

  async unlock(ids) {
    const users = {
      "userIds": ids
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/unlock', users);
  }

  // Set User Groups for Users
  async setUserGroups(userIds, userGroupIds) {
    const userGroupsForUsers = {
      "userIds": userIds,
      "userGroupIds": userGroupIds
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
  async invite(email: string, name: string, userGroupIds, message: string) {
    const userInvite = {
      "email": email,
      "userName": email,
      "name": name,
      "userGroupIds": userGroupIds,
      "message": message
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user/invite', userInvite);
  }
}