import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class DocumentTypeApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  // TODO: Use relative urls E.g. /backoffice/...
  async EnsureNameNotExists(name: string) {
    const response = await this.api.get('https://localhost:44331/umbraco/backoffice/UmbracoTrees/ContentTypeTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let documentTypeId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        documentTypeId = sb.id;
      }
    }

    if (documentTypeId !== null) {
      await this.api.post('https://localhost:44331/umbraco/backoffice/UmbracoApi/ContentType/DeleteById?id=' + documentTypeId);
    }
  }
}