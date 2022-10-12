import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";
import {Package} from "@umbraco/json-models-builders";

export class PackageApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/package/GetCreatedPackages');
    const searchBody = await JsonHelper.getBody(response);

    let packageId = null;

    for (const sb of searchBody) {
      if (sb.name == name) {
        packageId = sb.id;
      }
    }

    if (packageId !== null) {
      await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/package/DeleteCreatedPackage?packageId=' + packageId);
    }
  }

  async doesNameExist(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/package/GetCreatedPackages');
    const searchBody = await JsonHelper.getBody(response);

    let packageId = null;
    let doesExist = false;
    
    for (const sb of searchBody) {
      if (sb.name == name) {
        packageId = sb.id;
      }
    }

    if (packageId !== null) {
      doesExist = true;
    }
    return doesExist
  }

  async save(packageToSave: Package) {
    await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/package/PostSavePackage', packageToSave);
  }
}