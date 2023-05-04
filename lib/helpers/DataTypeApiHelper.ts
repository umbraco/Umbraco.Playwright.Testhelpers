import {ApiHelpers} from "./ApiHelpers";

export class DataTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureDataTypeNameNotExistsAtRoot(name: string) {
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

  async getDataTypeById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getDataTypeByNameAtRoot(name: string) {
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

  async createDataType(name: string, propertyEditorAlias: string, values: { alias: string; value: string; }[], parentId?: string, propertyEditorUiAlias?: string) {
    const dataType = {
      "name": name,
      "propertyEditorAlias": propertyEditorAlias,
      "propertyEditorUiAlias": propertyEditorUiAlias,
      "values": values,
      "parentId": parentId
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type', dataType);
  }

  async updateDataTypeById(id: string, dataType) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id, dataType);
  }

  async deleteDataTypeById(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
  }

  async deleteDataTypeByNameAtRoot(name: string) {
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

  async getDataTypeItemsByIds(ids: string[]) {
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

  async getAllDataTypesAtRoot() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async doesDataTypeWithNameExistAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async moveDataTypeToFolderById(dataTypeId: string, folderId: string) {
    const folderIdBody = {
      "targetId": folderId
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + dataTypeId + '/move', folderIdBody);
  }

  async copyDataTypeToFolderById(dataTypeId: string, folderId: string) {
    const folderIdBody = {
      "targetId": folderId
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + dataTypeId + '/copy', folderIdBody);
  }

  // FOLDER
  async getDataTypeFolderById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
    return await response.json();
  }

  async getDataTypeFolderByName(name: string) {
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

  async createDataTypeFolder(name: string, parentId?: string) {
    const folderData = {
      "name": name,
      "parentId": parentId
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder', folderData);
  }

  async updateDataTypeFolderById(id: string, dataTypeFolder) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id, dataTypeFolder);
  }

  async deleteDataTypeFolderById(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
  }

  async deleteDataTypeFolderByName(name: string) {
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

  async getDataTypeChildrenById(id: string) {
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
}