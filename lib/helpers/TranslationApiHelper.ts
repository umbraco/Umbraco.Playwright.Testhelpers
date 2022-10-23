import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";
export class TranslationApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureKeyNotExists(key: string) {
    let response = await this.api.get(`${this.api.baseUrl}/umbraco/backoffice/UmbracoApi/Dictionary/GetList`)
    const searchBody = await JsonHelper.getBody(response);
    let keyId = null;
    for (const sb of searchBody) {
      if (sb.name == key) {
        keyId = sb.id;
      }
    }

    if (keyId !== null) {
        await this.api.post(`${this.api.baseUrl}/umbraco/backoffice/UmbracoApi/Dictionary/DeleteById?id=${keyId}`);
    }
  }
}
