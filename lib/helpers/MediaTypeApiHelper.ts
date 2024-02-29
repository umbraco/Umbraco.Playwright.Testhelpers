import {ApiHelpers} from "./ApiHelpers";
import {AliasHelper} from "./AliasHelper";
import {MediaTypeBuilder} from "@umbraco/json-models-builders";

export class MediaTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const rootMediaTypes = await this.getAllAtRoot();
    const jsonMediaTypes = await rootMediaTypes.json();

    for (const mediaType of jsonMediaTypes.items) {
      if (mediaType.name === name) {
        if (mediaType.isFolder) {
          return await this.recurseDeleteChildren(mediaType);
        }
        return await this.delete(mediaType.id);
      } else if (mediaType.hasChildren) {
        await this.recurseChildren(name, mediaType.id, true);
      }
    }
    return null;
  }

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/media-type/root?skip=0&take=10000&foldersOnly=false');
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

  private async recurseDeleteChildren(mediaTypeFolder) {
    if (!mediaTypeFolder.hasChildren) {
      return await this.deleteFolder(mediaTypeFolder.id);
    }
    const items = await this.getChildren(mediaTypeFolder.id);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteChildren(child);
      } else if (child.isFolder) {
        await this.deleteFolder(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.deleteFolder(mediaTypeFolder.id);
  }

  async getChildren(id: string) {
    const response = await this.api.get(`${this.api.baseUrl}/umbraco/management/api/v1/tree/media-type/children?parentId=${id}&skip=0&take=10000&foldersOnly=false`);
    const items = await response.json();
    return items.items;
  }

  async deleteFolder(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/media-type/folder/' + id);
  }

  async create(mediaType) {
    if (mediaType == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/media-type', mediaType)
    return response.headers().location.split("/").pop();
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/media-type/' + id);
    const json = await response.json();
    if (json !== null) {
      return json;
    }
    return null;
  }

  async getFolder(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/media-type/folder/' + id);
    return await response.json();
  }

  async delete(id: string) {
    if (id == null) {
      return;
    }
    const response = await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/media-type/' + id);
    return response.status();
  }

  async getByName(name: string) {
    const rootMediaTypes = await this.getAllAtRoot();
    const jsonMediaTypes = await rootMediaTypes.json();

    for (const mediaType of jsonMediaTypes.items) {
      if (mediaType.name === name) {
        if (mediaType.isFolder) {
          return this.getFolder(mediaType.id);
        }
        return this.get(mediaType.id);
      } else if (mediaType.isContainer || mediaType.hasChildren) {
        const result = await this.recurseChildren(name, mediaType.id, false);
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

  async createDefaultMediaType(mediaTypeName: string) {
    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
      .build();
    return await this.create(mediaType);
  }

  async createMediaTypeWithPropertyEditor(mediaTypeName: string, dataTypeName: string, dataTypeId: string, groupName: string = "GroupTest")
  {
    const crypto = require('crypto');
    const containerId = crypto.randomUUID();

    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
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
      .build();
    return await this.create(mediaType);
  }

  async createMediaTypeWithTwoPropertyEditors(mediaTypeName: string, dataTypeNameOne: string, dataTypeIdOne: string, dataTypeNameTwo: string, dataTypeIdTwo: string, groupName: string = "GroupTest")
  {
    const crypto = require('crypto');
    const containerId = crypto.randomUUID();

    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
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
    return await this.create(mediaType);
  }
}