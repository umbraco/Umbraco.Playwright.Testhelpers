import {ApiHelpers} from "./ApiHelpers";

export class DictionaryApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureDictionaryNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + sb.id);
        }
      }
    }
    return null;
  }

  async getDictionaryById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getDictionaryByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + sb.id);
          return await response.json();
        }
      }
    }
    return null;
  }

  async createDictionary(name: string, translations?: { isoCode: string, translation: string }[], parentId?: string) {
    const dictionary = {
      "name": name,
      "translations":
      translations,
      "parentId": parentId
    }
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/dictionary', dictionary);
  }

  async deleteDictionaryById(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id);
  }

  async deleteDictionaryByName(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary?skip=0&take=100000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null)
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + sb.id);
      }
    }
    return null;
  }

  async updateDictionaryById(id: string, dictionary: object) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id, dictionary);
  }

  async doesDictionaryWithNameExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary?skip=0&take=100000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async getDictionaryChildrenById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/dictionary/children?parentId=' + id + '&skip=0&take=10000');
    const json = response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getDictionaryItemsByIds(ids: string[]) {
    let idArray = 'id=' + ids[0];
    let i: number;

    for (i = 1; i < ids.length; ++i) {
      idArray += '&id=' + ids[i];
    }

    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/dictionary/item?' + idArray);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getAllDictionariesAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/dictionary/root?skip=0&take=10000');
  }
}