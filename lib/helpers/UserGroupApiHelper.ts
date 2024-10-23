﻿import {ApiHelpers} from "./ApiHelpers";
import {UserGroupBuilder} from "@umbraco/json-models-builders";


export class UserGroupApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const json = await this.getAll();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + sb.id);
        }
      }
    }
    return null;
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + id);
    return response.status() === 200;
  }

  async create(userGroupData) {
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/user-group', userGroupData);
    // Returns the id of the userGroup
    return response.headers().location.split("/").pop();
  }

  async getByName(name: string) {
    const json = await this.getAll();

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

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getAll() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/user-group?skip=0&take=10000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async update(id: string, userGroup) {
    const response = await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + id, userGroup);
    return response.text();
  }

  async doesNameExist(name: string) {
    const json = await this.getAll();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }
  
  async doesUserGroupContainLanguage(userGroupName: string, languageName: string) {
    const userGroup = await this.getByName(userGroupName);
    return userGroup.languages.includes(languageName);
  }

  async doesUserGroupContainAccessToAllLanguages(userGroupName: string) {
    const userGroup = await this.getByName(userGroupName);
    return userGroup.hasAccessToAllLanguages;
  }

  async doesUserGroupContainDocumentRootAccess(userGroupName: string) {
    const userGroup = await this.getByName(userGroupName);
    return userGroup.documentRootAccess;
  }

  async doesUserGroupContainMediaRootAccess(userGroupName: string) {
    const userGroup = await this.getByName(userGroupName);
    return userGroup.mediaRootAccess;
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/user-group/' + id);
  }

  async createEmptyUserGroup(name: string) {
    await this.ensureNameNotExists(name);

    const userGroup = new UserGroupBuilder()
      .withName(name)
      .build();

    return await this.create(userGroup);
  }

  async createSimpleUserGroupWithContentSection(name: string) {
    await this.ensureNameNotExists(name);

    const userGroup = new UserGroupBuilder()
      .withName(name)
      .addSection('Umb.Section.Content')
      .addFallbackPermission()
        .withBrowseNodePermission(true)
        .done()
      .build();

    return await this.create(userGroup);
  }

  async createUserGroupWithMediaSection(name: string) {
    await this.ensureNameNotExists(name);

    const userGroup = new UserGroupBuilder()
      .withName(name)
      .addSection('Umb.Section.Media')
      .addFallbackPermission()
        .withBrowseNodePermission(true)
        .done()
      .build();

    return await this.create(userGroup);
  }

  async createUserGroupWithDocumentAccess(name: string) {
    await this.ensureNameNotExists(name);

    const userGroup = new UserGroupBuilder()
      .withName(name)
      .withDocumentRootAccess(true)
      .build();

    return await this.create(userGroup);
  }
  
  async createUserGroupWithDocumentStartNode(name: string, startNodeId: string) {
    await this.ensureNameNotExists(name);

    const userGroup = new UserGroupBuilder()
      .withName(name)
      .addSection('Umb.Section.Content')
      .withDocumentRootAccess(false)
      .withDocumentStartNodeId(startNodeId)
      .addFallbackPermission()
        .withBrowseNodePermission(true)
        .done()
      .build();

    return await this.create(userGroup);
  }
  
  async createUserGroupWithMediaStartNode(name: string, startNodeId: string) {
    await this.ensureNameNotExists(name);

    const userGroup = new UserGroupBuilder()
      .withName(name)
      .addSection('Umb.Section.Media')
      .withMediaRootAccess(false)
      .withMediaStartNodeId(startNodeId)
      .addFallbackPermission()
        .withBrowseNodePermission(true)
        .done()
      .build();

    return await this.create(userGroup);
  }
  
  async createUserGroupWithLanguage(name: string, languageName: string) {
    await this.ensureNameNotExists(name);

    const userGroup = new UserGroupBuilder()
      .withName(name)
      .addLanguage(languageName)
      .build();

    return await this.create(userGroup);
  }

  async createUserGroupWithLanguageAndContentSection(name: string, languageName: string) {
    await this.ensureNameNotExists(name);
    
    const userGroup = new UserGroupBuilder()
      .withName(name)
      .addSection('Umb.Section.Content')
      .addLanguage(languageName)
      .withDocumentRootAccess(true)
      .addFallbackPermission()
        .withBrowseNodePermission(true)
        .withUpdatePermission(true)
        .done()
      .build();

    return await this.create(userGroup);
  }
  
  async createUserGroupWithPermissionsForSpecificDocumentWithBrowseNode(name: string, documentId: string) {
    await this.ensureNameNotExists(name);

    const userGroup = new UserGroupBuilder()
      .withName(name)
      .addPermission()
        .withDocumentId(documentId)
        .addVerbs()
          .withBrowseNodePermission(true)
          .done()
        .done()
      .build();

    return await this.create(userGroup);
  }

  async doesUserGroupContainContentStartNodeId(userGroupName: string, documentStartNodeId: string) {
    const userGroup = await this.getByName(userGroupName);
    if (userGroup.documentStartNode === null) {
      return false;
    }
    return userGroup.documentStartNode.id.includes(documentStartNodeId);
  }

  async doesUserGroupContainMediaStartNodeId(userGroupName: string, mediaStartNodeId: string) {
    const userGroup = await this.getByName(userGroupName);
    if (userGroup.mediaStartNode === null) {
      return false;
    }
    return userGroup.mediaStartNode.id.includes(mediaStartNodeId);
  }
  
  async doesUserGroupContainGranularPermissionsForDocument(userGroupName: string, documentId: string, granularPermissions : string[]) {
    const userGroup = await this.getByName(userGroupName);
    for (const permission of userGroup.permissions) {
      if (permission.document.id === documentId) {
        for (const verb of permission.verbs) {
          if (!granularPermissions.includes(verb)) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }
}