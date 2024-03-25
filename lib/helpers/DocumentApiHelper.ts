import {ApiHelpers} from "./ApiHelpers";
import {DocumentBuilder} from "@umbraco/json-models-builders";

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

  async createDefaultDocument(documentName: string, documentTypeId: string) {
    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .build();
    return await this.create(document);
  }
}