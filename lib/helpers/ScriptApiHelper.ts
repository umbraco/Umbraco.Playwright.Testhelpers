import {ApiHelpers} from "./ApiHelpers";

export class ScriptApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/script/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.isFolder == false) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/script?path=' + sb.path);
        } else {
          if (sb.hasChildren == true) {
            return await this.recurseFolderChildren(sb.path);
          } else {
            return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/script/folder?path=' + sb.path);
          }
        }
      }
    }
    return null;
  }

  async nameExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/script/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async exists(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/script?path=' + path);
    return response.status() === 200;
  }

  async get(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/script?path=' + path);
    return await response.json();
  }

  async getByNameAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/script/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.isFolder === false) {
          const script = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/script?path=' + sb.path);
          return await script.json();
        } else {
          const scriptFolder = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/script/folder?path=' + sb.path);
          return await scriptFolder.json();
        }
      }
    }
    return null;
  }

  async create(name: string, content: string, parentPath: string = "") {
    const scriptData = {
      "name": name,
      "content": content,
      "parentPath": parentPath
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/script', scriptData);
    // Returns the path of the created Script
    return response.headers().location.split("=").pop();
  }

  async update(script) {
    const scriptData = {
      "name": script.name,
      "content": script.content,
      "existingPath": script.path
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/script', scriptData);
  }

  async delete(path: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/script?path=' + path);
  }

  // Folder
  async getFolder(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/script/folder?path=' + path);
    return await response.json();
  }

  async folderExists(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/script/folder?path=' + path);
    return response.status() === 200;
  }

  async getFolderChildren(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/script/children?path=' + path + '&skip=0&take=10000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async createFolder(name: string, parentPath = "") {
    const scriptFolderData =
      {
        "name": name,
        "parentPath": parentPath
      };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/script/folder', scriptFolderData);
    // Returns the id of the created scriptFolder
    const json = await response.json();
    return json.path;
  }

  async deleteFolder(path: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/script/folder?path=' + path);
  }

  async recurseFolderChildren(path: string) {
    const parentScript = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/script/children?path=' + path + '&skip=0&take=10000');
    const itemsJson = await parentScript.json();

    for (const child of itemsJson.items) {
      if (child.path !== null) {
        if (child.isFolder == true) {
          if (child.hasChildren == true) {
            await this.recurseFolderChildren(child.path);
          } else {
            await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/script/folder?path=' + child.path);
          }
        } else {
          await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/script/?path=' + child.path);
        }
      }
    }
    await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/script/folder?path=' + path);
  }
}