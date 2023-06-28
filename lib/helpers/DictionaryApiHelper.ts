import {ApiHelpers} from "./ApiHelpers";

export class DictionaryApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
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

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getByName(name: string) {
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

  async create(name: string, translations?: { isoCode: string, translation: string }[], parentId?: string) {
    const dictionary = {
      "name": name,
      "translations": translations,
      "parentId": parentId
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/dictionary', dictionary);
    // Returns the id of the created dictionary
    return response.headers().location.split("/").pop();
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id);
  }

  async deleteByName(name: string) {
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

  async update(id: string, dictionary: object) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id, dictionary);
  }

  async nameExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary?skip=0&take=100000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }

  async exists(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id);
    return response.status() === 200;
  }

  async getChildren(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/dictionary/children?parentId=' + id + '&skip=0&take=10000');
    const json = response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getItems(ids: string[]) {
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

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/dictionary/root?skip=0&take=10000');
  }
}