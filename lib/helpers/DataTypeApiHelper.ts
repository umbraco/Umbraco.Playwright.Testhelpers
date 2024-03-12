import {ApiHelpers} from "./ApiHelpers";
import {DatePickerDataTypeBuilder} from "@umbraco/json-models-builders";

export class DataTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
    return await response.json();
  }

  async create(name: string, editorAlias: string, values: { alias: string; value: string; }[], parentId?: string, editorUiAlias?: string, id?: string) {
    const dataType = {
      "name": name,
      "editorAlias": editorAlias,
      "editorUiAlias": editorUiAlias,
      "values": values,
      "id": id,
      "parent": parentId ? {"id" : parentId} : null
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type', dataType);
    // Returns the id of the created dataType
    return response.headers().location.split("v1/data-type/").pop();
  }

  async update(id: string, dataType) {
    const updateDataType = {
      "name": dataType.name,
      "editorAlias": dataType.editorAlias,
      "editorUiAlias": dataType.editorUiAlias,
      "values": dataType.values,
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id, updateDataType);
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
  }

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
    return response.status() === 200;
  }

  async getItems(ids: string[]) {
    let idArray = 'id=' + ids[0];
    let i: number;

    for (i = 1; i < ids.length; ++i) {
      idArray += '&id=' + ids[i];
    }

    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/item?' + idArray);
    return await response.json();
  }

  async getByName(name: string) {
    const rootDataTypes = await this.getAllAtRoot();
    const jsonDataTypes = await rootDataTypes.json();

    for (const dataType of jsonDataTypes.items) {
      if (dataType.name === name) {
        return this.get(dataType.id);
      } else if (dataType.isContainer || dataType.hasChildren) {
        const result = await this.recurseChildren(name, dataType.id, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  async ensureNameNotExists(name: string) {
    const rootDataTypes = await this.getAllAtRoot();
    const jsonDataTypes = await rootDataTypes.json();

    for (const dataType of jsonDataTypes.items) {
      if (dataType.name === name) {
        if (dataType.isFolder) {
          return await this.recurseDeleteChildren(dataType);
        }
        return await this.delete(dataType.id);
      } else if (dataType.hasChildren) {
        await this.recurseChildren(name, dataType.id, true);

      }
    }
    return null;
  }

  async doesNameExist(name: string) {
    return await this.getByName(name);
  }

  async moveToFolder(dataTypeId: string, folderId: string) {
    const folderIdBody = {
      "target": { id: folderId }
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + dataTypeId + '/move', folderIdBody);
  }

  async copyToFolder(dataTypeId: string, folderId: string) {
    const folderIdBody = {
      "target": { id: folderId }
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + dataTypeId + '/copy', folderIdBody);
    // Returns the id of the copied dataType
    return response.headers().location.split("v1/data-type/").pop();
  }

  // FOLDER
  async getFolder(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
    return await response.json();
  }

  async createFolder(name: string, id?: string, parentId?: string) {
    const folderData = {
      "name": name,
      "id": id,
      "parent": parentId ? {"id" : parentId} : null
    };

    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder', folderData);
    // Returns the id of the created dataTypeFolder
    return response.headers().location.split("v1/data-type/folder/").pop();
  }

  async renameFolder(id: string, name: string) {
    const folderData = {
      "name": name,
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id, folderData);
  }

  async deleteFolder(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
  }

  async doesFolderExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
    return response.status() === 200;
  }

  async getChildren(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/children?parentId=' + id + '&skip=0&take=100&foldersOnly=false');
    const items = await response.json();
    return items.items;
  }

  private async recurseDeleteChildren(dataFolder) {
    if (!dataFolder.hasChildren) {
      return await this.deleteFolder(dataFolder.id);
    }
    const items = await this.getChildren(dataFolder.id);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteChildren(child);
      } else if (child.isFolder) {
        await this.deleteFolder(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.deleteFolder(dataFolder.id);
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

  async save(dataType) {
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type', dataType)
    return response.headers().location.split("v1/data-type/").pop();
  }

  async createDateTypeDataType(name: string) {
    await this.ensureNameNotExists(name);

    const dataType = new DatePickerDataTypeBuilder()
      .withName(name)
      .build();
    return await this.save(dataType);
  }
}