import {ApiHelpers} from "./ApiHelpers";

export class TemplateApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/template/' + sb.id);
        }
      }
    }
    return null;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/template/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async exists(path: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/template/' + path);
    return response.status() === 200;
  }

  async getByNameAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/template/' + sb.id);
          return await response.json();
        }
      }
    }
    return null;
  }

  async create(name: string, alias: string, content: string) {
    const templateData = {
      "name": name,
      "alias": alias,
      "content": content
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/template', templateData);
    // Returns the id of the created template
    return response.headers().location.split("/").pop();
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/template/' + id);
  }

  async deleteByNameAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/template/' + sb.id);
        }
      }
    }
    return null;
  }

  async update(id: string, template: object) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/template/' + id, template);
  }

  async getChildren(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/children?skip=0&take=10000' + id);
    const json = await response.json();

    if (json !== null) {
      return json
    }
    return null;
  }

  async getItems(ids: string[]) {
    let idArray = 'id=' + ids[0];
    let i: number;

    for (i = 1; i < ids.length; ++i) {
      idArray += '&id=' + ids[i];
    }

    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/item?' + idArray);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/root?skip=0&take=10000');
  }

  async nameExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        return true;
      }
    }
    return false;
  }
}