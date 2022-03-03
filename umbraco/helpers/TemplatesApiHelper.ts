import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class TemplatesApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  // TODO: Use relative urls E.g. /backoffice/...
  async EnsureNameNotExists(name: string) {
    const response = await this.api.get('https://localhost:44331/umbraco/backoffice/UmbracoTrees/TemplatesTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let templateId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        templateId = sb.id;
      }
    }

    if (templateId !== null) {
      await this.api.post('https://localhost:44331/umbraco/backoffice/UmbracoApi/Template/DeleteById?id=' + templateId);
    }
  }
}