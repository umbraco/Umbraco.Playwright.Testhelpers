import {ApiHelpers} from "../ApiHelpers";

export class DeliveryApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async getAllContentItems() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/delivery/api/v2/content?skip=0&take=10000');
    return await response.json();
  }

  async getContentItemWithId(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/delivery/api/v2/content/item/' + id);
    return await response.json();
  }

  async getContentItemWithPath(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/delivery/api/v2/content/item/key/' + path);
    return await response.json();
  }

  async getAllMediaChildItemsAtRootLevel() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/delivery/api/v2/media?fetch=children:/&skip=0&take=10000');
    return await response.json();
  }

  async getMediaItemWithId(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/delivery/api/v2/media/item/' + id);
    return await response.json();
  }

  async getMediaItemWithPath(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/delivery/api/v2/media/item/key/' + path);
    return await response.json();
  }

  async doesContentItemWithIdContainValues(id: string, contentName: string, documentTypeName: string, properties: {dataTypeName: string; dataTypeValue: string }[]) {
    const contentItem = await this.getContentItemWithId(id);

    if (contentItem.name === contentName && contentItem.contentType === documentTypeName) {
      if (properties && properties.length > 0) {
        for (const property of properties) {
          const {dataTypeName, dataTypeValue} = property;
          const contentItemPropertyValue = contentItem.properties[dataTypeName];
          if (contentItemPropertyValue !== dataTypeValue) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  async doesMediaItemWithIdContainValues(id: string, mediaName: string, mediaTypeName: string, url: string) {
    const mediaItem = await this.getMediaItemWithId(id);

    return mediaItem.name === mediaName && mediaItem.mediaType === mediaTypeName && mediaItem.url === url;
  }
}