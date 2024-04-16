﻿import {ApiHelpers} from "./ApiHelpers";
import {DocumentTypeBuilder} from "@umbraco/json-models-builders";
import {AliasHelper} from "./AliasHelper";

export class DocumentTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const rootDocumentTypes = await this.getAllAtRoot();
    const jsonDocumentTypes = await rootDocumentTypes.json();

    for (const documentType of jsonDocumentTypes.items) {
      if (documentType.name === name) {
        if (documentType.isFolder) {
          return await this.recurseDeleteChildren(documentType);
        }
        return await this.delete(documentType.id);
      } else if (documentType.hasChildren) {
        await this.recurseChildren(name, documentType.id, true);
      }
    }
    return null;
  }

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/document-type/root?skip=0&take=10000&foldersOnly=false');
  }

  private async recurseChildren(name: string, id: string, toDelete: boolean) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.name === name) {
        if (!toDelete) {
          if (child.isFolder) {
            return await this.getFolder(child.id);
          }
          return await this.get(child.id);
        }
        if (child.isFolder) {
          return await this.recurseDeleteChildren(child);
        }
        return await this.delete(child.id);
      } else if (child.hasChildren) {
        return await this.recurseChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  private async recurseDeleteChildren(documentTypeFolder) {
    if (!documentTypeFolder.hasChildren) {
      return await this.deleteFolder(documentTypeFolder.id);
    }
    const items = await this.getChildren(documentTypeFolder.id);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteChildren(child);
      } else if (child.isFolder) {
        await this.deleteFolder(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.deleteFolder(documentTypeFolder.id);
  }

  async getChildren(id: string) {
    const response = await this.api.get(`${this.api.baseUrl}/umbraco/management/api/v1/tree/document-type/children?parentId=${id}&skip=0&take=10000&foldersOnly=false`);
    const items = await response.json();
    return items.items;
  }
  
  async create(documentType) {
    if (documentType == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/document-type', documentType);
    return response.headers().location.split("/").pop();
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/document-type/' + id);
    const json = await response.json();
    if (json !== null) {
      return json;
    }
    return null;
  }
  
  async getByName(name: string) {
    const rootDocumentTypes = await this.getAllAtRoot();
    const jsonDocumentTypes = await rootDocumentTypes.json();

    for (const documentType of jsonDocumentTypes.items) {
      if (documentType.name === name) {
        if (documentType.isFolder) {
          return this.getFolder(documentType.id);
        }
        return this.get(documentType.id);
      } else if (documentType.hasChildren) {
        const result = await this.recurseChildren(name, documentType.id, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }
  
  async doesNameExist(name: string) {
    return await this.getByName(name)
  }

  async delete(id: string) {
    if (id == null) {
      return;
    }
    const response = await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/document-type/' + id);
    return response.status();
  }

  // FOLDER
  async getFolder(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/document-type/folder/' + id);
    return await response.json();
  }

  async deleteFolder(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/document-type/folder/' + id);
  }
  
  async createFolder(name: string, parentId? : string) {
    const folder = {
      name: name,
      parentId: parentId
    }
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/document-type/folder', folder);
  }
  
  async renameFolder(folderId: string, folderName: string) {
    const folder = {
      name: folderName
    }
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/document-type/folder/' + folderId, folder);
  }
  
  async createDefaultDocumentType(documentTypeName: string){
    const documentType = new DocumentTypeBuilder()
      .withName(documentTypeName)
      .withAlias(AliasHelper.toAlias(documentTypeName))
      .build();
    return await this.create(documentType);
  }
  
  async createDocumentTypeWithPropertyEditor(documentTypeName: string, dataTypeName: string, dataTypeId: string, groupName: string = "GroupTest", varyByCulture: boolean = false) 
  {
    const crypto = require('crypto');
    const containerId = crypto.randomUUID();

    const documentType = new DocumentTypeBuilder()
      .withName(documentTypeName)
      .withAlias(AliasHelper.toAlias(documentTypeName))
      .addContainer()
        .withName(groupName)
        .withId(containerId)
        .withType("Group")
        .done()
      .addProperty()
        .withContainerId(containerId)
        .withAlias(AliasHelper.toAlias(dataTypeName))
        .withName(dataTypeName)
        .withDataTypeId(dataTypeId)
        .done()
      .withVariesByCulture(varyByCulture)
      .build();
    return await this.create(documentType);
  }
  
  async createDocumentTypeWithTwoPropertyEditors(documentTypeName: string, dataTypeNameOne: string, dataTypeIdOne: string, dataTypeNameTwo: string, dataTypeIdTwo: string, groupName: string = "GroupTest")
  {
    const crypto = require('crypto');
    const containerId = crypto.randomUUID();

    const documentType = new DocumentTypeBuilder()
      .withName(documentTypeName)
      .withAlias(AliasHelper.toAlias(documentTypeName))
      .addContainer()
        .withName(groupName)
        .withId(containerId)
        .withType("Group")
        .done()
      .addProperty()
        .withContainerId(containerId)
        .withAlias(AliasHelper.toAlias(dataTypeNameOne))
        .withName(dataTypeNameOne)
        .withDataTypeId(dataTypeIdOne)
        .done()
      .addProperty()
        .withContainerId(containerId)
        .withAlias(AliasHelper.toAlias(dataTypeNameTwo))
        .withName(dataTypeNameTwo)
        .withDataTypeId(dataTypeIdTwo)
        .done()
      .build();
    return await this.create(documentType);
  }
  
  async createDefaultDocumentTypeWithAllowAsRoot(documentTypeName: string) {
    await this.ensureNameNotExists(documentTypeName);
    const documentType = new DocumentTypeBuilder()
      .withName(documentTypeName)
      .withAlias(AliasHelper.toAlias(documentTypeName))
      .withAllowedAsRoot(true)
      .build();
    return await this.create(documentType);
  }
  
  async createDocumentTypeWithAllowedChildNode(documentTypeName: string, allowedChildNodeId: string) {
    await this.ensureNameNotExists(documentTypeName);
    const documentType = new DocumentTypeBuilder()
      .withName(documentTypeName)
      .withAlias(AliasHelper.toAlias(documentTypeName))
      .withAllowedAsRoot(true)
      .addAllowedDocumentType()
        .withId(allowedChildNodeId)
        .done()
      .build();
    return await this.create(documentType);
  }
  
  async createDocumentTypeWithAllowedTemplate(documentTypeName: string, allowedTemplateId: string) {
    await this.ensureNameNotExists(documentTypeName);
    const documentType = new DocumentTypeBuilder()
      .withName(documentTypeName)
      .withAlias(AliasHelper.toAlias(documentTypeName))
      .addAllowedTemplateId()
        .withId(allowedTemplateId)
        .done()
      .build();
    return await this.create(documentType);
  }
}