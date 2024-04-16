import {ApiHelpers} from "./ApiHelpers";

export class TemporaryFileApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/temporary-file/' + id);
    return response.status() === 200;
  }

  async create(id: string, name: string, mimeType, filePath) {
    return this.api.postMultiPartForm(this.api.baseUrl + '/umbraco/management/api/v1/temporary-file', id, name, mimeType, filePath)
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/temporary-file/' + id);
    return await response.json();
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/temporary-file/' + id);
  }
}