import {ApiHelpers} from "./ApiHelpers";

export class LanguagesApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async create(name: string, isDefault = false, isMandatory = false, isoCode: string, fallbackIsoCode = "en-US") {
    const langData = {
      "name": name,
      "isDefault": isDefault,
      "isMandatory": isMandatory,
      "fallbackIsoCode": fallbackIsoCode,
      "isoCode": isoCode
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/language', langData);
    // Returns the id of the created language
    return response.headers().location.split("/").pop();
  }

  async get(isoCode: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language?skip=0&take=100000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.isoCode !== null) {
          const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language/' + sb.isoCode);
          return await response.json();
        }
      }
    }
    return null;
  }

  async exists(isoCode: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode);
    return response.status() === 200;
  }

  async update(isoCode: string, language: object) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode, language);
  }

  async delete(isoCode: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode);
  }

  async ensureNameNotExists(name: string) {
    const language = await this.getByName(name);
    if (language !== null) {
      await this.delete(language.isoCode);
    }
  }

  async getAll() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language?skip=0&take=100000');
    return await response.json();
  }

  async createDefaultDanishLanguage() {
    await this.ensureNameNotExists("Dansk")
    const langData = {
      "name": "Dansk",
      "isDefault": false,
      "isMandatory": false,
      "fallbackIsoCode": null,
      "isoCode": "da-DK"
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/language', langData);
    // Returns the id of the created language
    return response.headers().location.split("/").pop();
  }
}