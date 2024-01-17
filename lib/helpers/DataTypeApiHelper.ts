import {ApiHelpers} from "./ApiHelpers";
import {DatePickerDataTypeBuilder} from "@umbraco/json-models-builders";

export class DataTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.isFolder == false) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + sb.id);
        } else {
          if (sb.hasChildren == true) {
            return await this.recurseFolderChildren(sb.id);
          } else {
            return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + sb.id);
          }
        }
      }
    }
    return null;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getByNameAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + sb.id);
          return response.json();
        }
      }
    }
    return null;
  }

  async create(name: string, editorAlias: string, values: { alias: string; value: string; }[], parentId?: string, editorUiAlias?: string) {
    const dataType = {
      "name": name,
      "editorAlias": editorAlias,
      "editorUiAlias": editorUiAlias,
      "values": values,
      "parentId": parentId
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type', dataType);
    // Returns the id of the created dataType
    return response.headers().location.split("/").pop();
  }

  async update(id: string, dataType) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id, dataType);
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
  }

  async deleteByNameAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + sb.id);
        }
      }
    }
    return null;
  }

  async getItems(ids: string[]) {
    let idArray = 'id=' + ids[0];
    let i: number;

    for (i = 1; i < ids.length; ++i) {
      idArray += '&id=' + ids[i];
    }

    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/item?' + idArray);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getAllAtRoot() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async exists(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
    return response.status() === 200;
  }

  async nameExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async moveToFolder(dataTypeId: string, folderId: string) {
    const folderIdBody = {
      "targetId": folderId
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + dataTypeId + '/move', folderIdBody);
  }

  async copyToFolder(dataTypeId: string, folderId: string) {
    const folderIdBody = {
      "targetId": folderId
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + dataTypeId + '/copy', folderIdBody);
    // Returns the id of the copied dataType
    return response.headers().location.split("/").pop();
  }

  // FOLDER
  async getFolder(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
    return await response.json();
  }

  async folderExists(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
    return response.status() === 200;
  }

  async getFolderByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=true');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + sb.id);
          return response.json();
        }
      }
    }
    return null;
  }

  async createFolder(name: string, parentId?: string) {
    const folderData = {
      "name": name,
      "parentId": parentId
    };

    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder', folderData);
    // Returns the id of the created dataTypeFolder
    return response.headers().location.split("/").pop();
  }

  async updateFolder(id: string, dataTypeFolder) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id, dataTypeFolder);
  }

  async deleteFolder(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
  }

  async deleteFolderByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=true');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + sb.id);
        }
      }
    }
    return null;
  }

  async getChildren(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/children?parentId=' + id + '&skip=0&take=100&foldersOnly=false');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async recurseFolderChildren(id: string) {
    const parentDataType = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/children?parentId=' + id + '&skip=0&take=10000');
    const itemsJson = await parentDataType.json();

    for (const child of itemsJson.items) {
      if (child.path !== null) {
        if (child.isFolder == true) {
          if (child.hasChildren == true) {
            await this.recurseFolderChildren(child.path);
          } else {
            await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + child.id);
          }
        } else {
          await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + child.id);
        }
      }
    }
    await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
  }

  async save(dataType) {
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type', dataType)
    return response.headers().location.split("/").pop();
  }

  async createDateTypeDataType(name: string) {
    await this.ensureNameNotExistsAtRoot(name);

    const dataType = new DatePickerDataTypeBuilder()
      .withName(name)
      .build();
    console.log(dataType);
    return await this.save(dataType);
  }
}