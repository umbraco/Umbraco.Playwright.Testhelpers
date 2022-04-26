import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class TemplatesApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }
  
  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoTrees/TemplatesTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let templateId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        templateId = sb.id;
      }
    }

    if (templateId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Template/DeleteById?id=' + templateId);
    }
  }
  
  async saveTemplate(template) {
    await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/Template/PostSave', template);
  }
}