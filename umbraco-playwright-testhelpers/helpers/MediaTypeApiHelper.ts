import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class MediaTypeApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }


  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoTrees/MediaTypeTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let mediaTypeId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        mediaTypeId = sb.id;
      }
    }

    if (mediaTypeId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/MediaType/DeleteById?id=' + mediaTypeId);
    }
  }
}