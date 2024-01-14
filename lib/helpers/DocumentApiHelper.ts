import {ApiHelpers} from "./ApiHelpers";

export class DocumentApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async create(document) {
    if (document == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/document', document)
    return response.headers().location.split("/").pop();
  }
}