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

  async exists(id: string) {
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
    return  await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user', user);
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
  
  async getCurrentUser() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user/current');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
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

  async createDefaultUser(nameOfUser, email, userGroupOneId, userGroupTwoId?) {

    const user = new UserBuilder()
      .withName(nameOfUser)
      .addUserGroupId(userGroupOneId)
      .withEmail(email)
      .build();
    
    if(userGroupTwoId !=  null)
    {
      user.userGroupIds.push(userGroupTwoId);
    }
    return await this.create(user);
  }
}