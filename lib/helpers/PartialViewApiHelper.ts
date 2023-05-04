import {ApiHelpers} from "./ApiHelpers";

export class PartialViewApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensurePartialViewNameNotExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/partial-view/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.isFolder == false) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/partial-view?path=' + sb.path);
        } else {
          if (sb.hasChildren == true) {
            return await this.recurseFolderChildren(sb.path);
          } else {
            return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/partial-view/folder?path=' + sb.path);
          }
        }
      }
    }
    return null;
  }

  async doesPartialViewWithNameExistAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/partial-view/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async getPartialViewByPath(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/partial-view?path=' + path);
    return await response.json();
  }

  async getPartialViewByNameAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/partial-view/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.isFolder === false) {
          const partialView = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/partial-view?path=' + sb.path);
          return await partialView.json();
        } else {
          const partialViewFolder = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/partial-view/folder?path=' + sb.path);
          return await partialViewFolder.json();
        }
      }
    }
    return null;
  }

  async createPartialView(name: string, content: string, parentPath: string = "") {
    const partialViewData = {
      "name": name,
      "content": content,
      "parentPath": parentPath
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/partial-view', partialViewData);
  }

  async updatePartialView(partialView) {
    const partialViewData = {
      "name": partialView.name,
      "content": partialView.content,
      "existingPath": partialView.path
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/partial-view', partialViewData);
  }

  async deletePartialViewByPath(path: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/partial-view?path=' + path);
  }

  // Folder

  async getPartialViewFolderByPath(path) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/partial-view/folder?path=' + path);
    return await response.json();
  }

  async getChildrenInPartialViewFolderByPath(path) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/partial-view/children?path=' + path + '&skip=0&take=10000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async createPartialViewFolder(name: string, parentPath = "") {
    const partialViewFolderData =
      {
        "name": name,
        "parentPath": parentPath
      };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/partial-view/folder', partialViewFolderData);
  }

  async deletePartialViewFolder(path: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/partial-view/folder?path=' + path);
  }

  async recurseFolderChildren(path: string) {
    const parentPartialView = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/partial-view/children?path=' + path + '&skip=0&take=10000');
    const itemsJson = await parentPartialView.json();

    for (const child of itemsJson.items) {
      if (child.path !== null) {
        if (child.isFolder == true) {
          if (child.hasChildren == true) {
            await this.recurseFolderChildren(child.path);
          } else {
            await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/partial-view/folder?path=' + child.path);
          }
        } else {
          await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/partial-view/?path=' + child.path);
        }
      }
    }
    await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/partial-view/folder?path=' + path);
  }
}