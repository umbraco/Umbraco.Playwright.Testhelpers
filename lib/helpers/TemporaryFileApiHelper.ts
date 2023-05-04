import {ApiHelpers} from "./ApiHelpers";
import * as fs from "fs";

export class TemporaryFileApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureTemporaryFileWithIdNotExists(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile/' + id);
    const json = await response.json();
    if (json !== null) {
      return json.id;
    }
    return null;
  }

  async createTemporaryFile(id: string, name: string, mimeType, filePath) {
    const response = await this.api.page.request.post(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile', {
      ignoreHTTPSErrors: true,
      multipart: {
        Id: id,
        File: {
          name: name,
          mimeType: mimeType,
          buffer: fs.readFileSync(filePath)
        }
      }
    });
    return await response.text();
  }

  async getTemporaryFileById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async deleteTemporaryFileById(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile/' + id);
  }

  async doesTemporaryFileWithIdExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/temporaryfile/' + id);
    const json = await response.json();
    return json.id == id;
  }
}