import {ApiHelpers} from "./ApiHelpers";
import {MediaBuilder} from "@umbraco/json-models-builders";

export class MediaApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async create(media) {
    if (media == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/media', media)
    return response.headers().location.split("/").pop();
  }

  async createDefaultMedia(mediaName: string, mediaTypeId: string) {
    const media = new MediaBuilder()
      .withContentTypeId(mediaTypeId)
      .addVariant()
      .withName(mediaName)
      .done()
      .build();
    return await this.create(media);
  }
}