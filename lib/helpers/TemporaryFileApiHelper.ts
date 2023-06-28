import {ApiHelpers} from "./ApiHelpers";

export class TemporaryFileApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async exists(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile/' + id);
    return response.status() === 200;
  }

  async create(id: string, name: string, mimeType, filePath) {
    return this.api.postMultiPartForm(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile', id, name, mimeType, filePath)
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile/' + id);
  }
}