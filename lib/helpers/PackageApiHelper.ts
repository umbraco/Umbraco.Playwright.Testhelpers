import {ApiHelpers} from "./ApiHelpers";

export class PackageApiHelper {
  api: ApiHelpers;

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  private buildUrl(path: string = ''): string {
    return `${this.api.baseUrl}/umbraco/management/api/v1/package/created${path}`;
  }

  async get(id: string) {
    const response = await this.api.get(this.buildUrl('/' + id));
    const json = await response.json();
    return json !== null ? json : null;
  }

  async getAll() {
    const response = await this.api.get(this.buildUrl('?skip=0&take=10000'));
    const json = await response.json();
    return json !== null ? json : null;
  }

  async getByName(name: string) {
    const json = await this.getAll();

    if (name !== null && json !== null) {
      for (const item of json.items) {
        if (item.name === name && item.id !== null) {
          return await this.get(item.id);
        }
      }
    }
    return null;
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.buildUrl('/' + id));
    return response.status() === 200;
  }

  async doesNameExist(name: string) {
    const json = await this.getAll();

    if (name !== null && json !== null) {
      for (const item of json.items) {
        if (item.name === name) {
          return true;
        }
      }
    }
    return false;
  }

  async ensureNameNotExists(name: string) {
    const json = await this.getAll();

    if (json !== null) {
      for (const item of json.items) {
        if (item.name === name && item.id !== null) {
          return await this.delete(item.id);
        }
      }
    }
    return null;
  }

  async create(name: string, contentLoadChildNodes = false, mediaLoadChildNodes = false, contentNodeId?: string, mediaIds?: string[], documentTypes?, mediaTypes?, dataTypes?, templates?, partialViews?, stylesheets?, scripts?, languages?, dictionaryItems?) {
    const packageData = {
      "name": name,
      "contentNodeId": contentNodeId,
      "contentLoadChildNodes": contentLoadChildNodes,
      "mediaIds": mediaIds,
      "mediaLoadChildNodes": mediaLoadChildNodes,
      "documentTypes": [documentTypes],
      "mediaTypes": [mediaTypes],
      "dataTypes": [dataTypes],
      "templates": [templates],
      "partialViews": [partialViews],
      "stylesheets": [stylesheets],
      "scripts": [scripts],
      "languages": [languages],
      "dictionaryItems": [dictionaryItems]
    };

    const response = await this.api.post(this.buildUrl(), packageData);
    return response.headers().location.split("/").pop();
  }

  async update(id: string, packageData) {
    return await this.api.put(this.buildUrl('/' + id), packageData);
  }

  async delete(id: string) {
    return await this.api.delete(this.buildUrl('/' + id));
  }

  async download(id: string) {
    const response = await this.api.get(this.buildUrl('/' + id + '/download'));
    return await response.text();
  }

  async createEmptyPackage(name: string) {
    return await this.create(name);
  }
}