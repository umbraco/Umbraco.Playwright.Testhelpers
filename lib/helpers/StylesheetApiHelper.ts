import {ApiHelpers} from "./ApiHelpers";

export class StylesheetApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExistsAtRoot(name: string) {
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

  async nameExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/stylesheet/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async exists(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + path);
    return response.status() === 200;
  }

  async get(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + path);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getByNameAtRoot(name: string) {
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

  async create(name: string, content: string, parentPath: string = "") {
    const stylesheetData = {
      "name": name,
      "content": content,
      "parentPath": parentPath
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet', stylesheetData);
    // Returns the path of the created stylesheet
    return response.headers().location.split("=").pop();
  }

  async update(stylesheet) {
    const stylesheetData = {
      "name": stylesheet.name,
      "content": stylesheet.content,
      "existingPath": stylesheet.path
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet', stylesheetData);
  }

  async delete(path: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + path);
  }

  // Folder
  async getFolder(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async folderExists(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
    return response.status() === 200;
  }


  async getFolderChildren(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/stylesheet/children?path=' + path + '&skip=0&take=10000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async createFolder(name: string, parentPath = "") {
    const stylesheetFolderData =
      {
        "name": name,
        "parentPath": parentPath
      };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder', stylesheetFolderData);
    // Returns the id of the created stylesheetFolder
    const json = await response.json();
    return json.path;
  }

  async deleteFolder(path: string) {
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