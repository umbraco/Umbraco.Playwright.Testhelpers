import {ApiHelpers} from "./ApiHelpers";

export class PackageApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensurePackageNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/package/created?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/package/created/' + sb.id);
        }
      }
    }
    return null;
  }

  async doesPackageWithNameExist(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/package/created?skip=0&take=10000');
    const json = await response.json();

    if (name !== null) {
      for (const sb of json.items) {
        if (sb.name === name) {
          return true;
        }
      }
    }
    return false;
  }

  async createPackage(name: string, contentLoadChildNodes = true, mediaLoadChildNodes = true, contentNodeId?: string, mediaIds?: string[], documentTypes?, mediaTypes?, dataTypes?, templates?, partialViews?, stylesheets?, scripts?, languages?, dictionaryItems?) {
    const packageData = {
      "name": name,
      "contentNodeId": contentNodeId,
      "contentLoadChildNodes": contentLoadChildNodes,
      "mediaIds": mediaIds,
      "mediaLoadChildNodes": mediaLoadChildNodes,
      "documentTypes": [
        documentTypes
      ],
      "mediaTypes": [
        mediaTypes
      ],
      "dataTypes": [
        dataTypes
      ],
      "templates": [
        templates
      ],
      "partialViews": [
        partialViews
      ],
      "stylesheets": [
        stylesheets
      ],
      "scripts": [
        scripts
      ],
      "languages": [
        languages
      ],
      "dictionaryItems": [
        dictionaryItems
      ]
    };

    return this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/package/created', packageData);
  }

  async getPackageByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/package/created?skip=0&take=10000');
    const json = await response.json();

    if (name !== null) {
      for (const sb of json.items) {
        if (sb.name === name) {
          if (sb.id !== null) {
            const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/package/created/' + sb.id);
            return await response.json();
          }
        }
      }
    }
    return null;
  }

  async getPackageById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/package/created/' + id);
    return await response.json();
  }

  async getAllPackages() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/package/created?skip=0&take=10000');
    return await response.json();
  }

  async updatePackageById(id: string, packageData) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/package/created/' + id, packageData);
  }

  async deletePackageById(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/package/created/' + id);
  }

  async downloadPackageById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/package/created/' + id + '/download');
    return await response.text();
  }
}