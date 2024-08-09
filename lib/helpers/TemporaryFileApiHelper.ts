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

  async createDefaultTemporaryFile() {
    const mediaType = await this.api.mediaType.getByName('File');
    const crypto = require('crypto');
    const temporaryFileId = crypto.randomUUID();
    const fileName = 'File.txt';
    const filePath = './fixtures/mediaLibrary/' + fileName;
    const mimeType = 'text/plain';
    await this.api.temporaryFile.create(temporaryFileId, fileName, mimeType, filePath);

    return {mediaTypeId: mediaType.id, temporaryFileId: temporaryFileId};
  }
  
  async createDefaultTemporaryImageFile() {
    const mediaType = await this.api.mediaType.getByName('Image');
    const crypto = require('crypto');
    const temporaryFileId = crypto.randomUUID();
    const fileName = 'Umbraco.png';
    const filePath = './fixtures/mediaLibrary/' + fileName;
    const mimeType = 'image/png';
    await this.api.temporaryFile.create(temporaryFileId, fileName, mimeType, filePath);

    return {mediaTypeId: mediaType.id, temporaryFileId: temporaryFileId};
  }
}