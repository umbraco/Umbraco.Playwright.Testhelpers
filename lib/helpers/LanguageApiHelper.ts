import {ApiHelpers} from "./ApiHelpers";

export class LanguagesApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async get(isoCode: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode);
    const json = await response.json();

    return json !== null ? json : null;
  }

  async doesExist(isoCode: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode);
    return response.status() === 200;
  }

  async create(name: string, isDefault = false, isMandatory = false, isoCode: string, fallbackIsoCode = "en-US") {
    const languageData = {
      "name": name,
      "isDefault": isDefault,
      "isMandatory": isMandatory,
      "fallbackIsoCode": fallbackIsoCode,
      "isoCode": isoCode
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/language', languageData);
    // Returns the id of the created language
    return response.headers().location.split("/").pop();
  }

  async update(isoCode: string, language: object) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode, language);
  }

  async delete(isoCode: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode);
  }

  async getByName(name: string) {
    const allLanguages = await this.getAll();
    const jsonLanguages = await allLanguages.json();

    for (const language of jsonLanguages.items) {
      if (language.name === name && language.isoCode !== null) {
        return await this.get(language.isoCode);
      }
    }
    return null;
  }

  async ensureNameNotExists(name: string) {
    const allLanguages = await this.getAll();
    const jsonLanguages = await allLanguages.json();

    for (const language of jsonLanguages.items) {
      if (language.name === name && language.isoCode !== null) {     
        return await this.delete(language.isoCode);
      }
    }
    return null;
  }

  async getAll() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language?skip=0&take=10000');
  }
}