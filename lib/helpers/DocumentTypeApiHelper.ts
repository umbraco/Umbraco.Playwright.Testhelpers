import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";

export class DocumentTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoTrees/ContentTypeTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let documentTypeId = null;
    if (searchBody !== null) {
      for (const sb of searchBody) {
        if (sb.name == name) {
          documentTypeId = sb.id;
        }
      }

      if (documentTypeId !== null) {
        await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/ContentType/DeleteById?id=' + documentTypeId);
      }
    }
  }

  async save(docType) {
    if (docType == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/ContentType/PostSave', docType)
    return await JsonHelper.getBody(response);
  }
}