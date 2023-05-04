import {ApiHelpers} from "./ApiHelpers";

export class StylesheetApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureStylesheetNameNotExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/stylesheet/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.isFolder == false) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + sb.path);
        } else {
          if (sb.hasChildren == true) {
            return await this.recurseFolderChildren(sb.path);
          } else {
            return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + sb.path);
          }
        }
      }
    }
    return null;
  }

  async doesStylesheetWithNameExistAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/stylesheet/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async getStylesheetByPath(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + path);
    return await response.json();
  }

  async getStylesheetByNameAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/stylesheet/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.isFolder === false) {
          const stylesheet = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + sb.path);
          return await stylesheet.json();
        } else {
          const stylesheetFolder = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + sb.path);
          return await stylesheetFolder.json();
        }
      }
    }
    return null;
  }

  async createStylesheet(name: string, content: string, parentPath: string = "") {
    const stylesheetData = {
      "name": name,
      "content": content,
      "parentPath": parentPath
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet', stylesheetData);
  }

  async updateStylesheet(stylesheet) {
    const stylesheetData = {
      "name": stylesheet.name,
      "content": stylesheet.content,
      "existingPath": stylesheet.path
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet', stylesheetData);
  }

  async deleteStylesheetByPath(path: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + path);
  }

  // Folder
  async doesStylesheetWithPathExist(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
    const json = await response.json();

    return json !== null;
  }

  async getStylesheetFolderByPath(path) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
    return await response.json();
  }

  async getChildrenInStylesheetFolderByPath(path) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/stylesheet/children?path=' + path + '&skip=0&take=10000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async createStylesheetFolder(name: string, parentPath = "") {
    const stylesheetFolderData =
      {
        "name": name,
        "parentPath": parentPath
      };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder', stylesheetFolderData);
  }

  async deleteStylesheetFolder(path: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
  }

  async recurseFolderChildren(path: string) {
    const parentStylesheet = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/stylesheet/children?path=' + path + '&skip=0&take=10000');
    const itemsJson = await parentStylesheet.json();

    for (const child of itemsJson.items) {
      if (child.path !== null) {
        if (child.isFolder == true) {
          if (child.hasChildren == true) {
            await this.recurseFolderChildren(child.path);
          } else {
            await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + child.path);
          }
        } else {
          await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/?path=' + child.path);
        }
      }
    }
    await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
  }
}