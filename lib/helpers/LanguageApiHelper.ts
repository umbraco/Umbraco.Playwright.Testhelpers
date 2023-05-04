import {ApiHelpers} from "./ApiHelpers";

export class LanguagesApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureIsoCodeNotExists(isoCode: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language?skip=0&take=10000');
    const json = await response.json();

    let langISO = null;

    for (const sb of json.items) {
      if (sb.isoCode === isoCode) {
        langISO = sb.isoCode;
      }
    }

    if (langISO !== null) {
      await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/language/' + langISO);
    }
  }

  async createLanguage(name: string, isDefault = false, isMandatory = false, isoCode: string, fallbackIsoCode = "en-US") {
    const langData = {
      "name": name,
      "isDefault": isDefault,
      "isMandatory": isMandatory,
      "fallbackIsoCode": fallbackIsoCode,
      "isoCode": isoCode
    };

    await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/language', langData);
  }

  async getLanguageByIsoCode(isoCode: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getLanguageByName(name: string) {
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

  async doesLanguageWithIsoCodeExist(isoCode: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/language?skip=0&take=100000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.isoCode === isoCode) {
        return true;
      }
    }
    return false;
  }

  async updateLanguageWithIsoCode(isoCode: string, language: object) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode, language);
  }

  async deleteLanguageWithIsoCode(isoCode: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/language/' + isoCode);
  }
}