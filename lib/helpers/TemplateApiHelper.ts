import {ApiHelpers} from "./ApiHelpers";

export class TemplateApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureTemplateNameNotExistsAtRoot(name: string) {
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

  async getTemplateById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/template/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getTemplateByNameAtRoot(name: string) {
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

  async createTemplate(name: string, alias: string, content: string) {
    const templateData = {
      "name": name,
      "alias": alias,
      "content": content
    };
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/template', templateData);
  }

  async deleteTemplateById(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id);
  }

  async deleteTemplateByNameAtRoot(name: string) {
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

  async updateTemplateById(id: string, template: object) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/template/' + id, template);
  }

  async getChildrenTemplatesById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/children?skip=0&take=10000' + id);
    const json = await response.json();

    if (json !== null) {
      return json
    }
    return null;
  }

  async getTemplateItemsByIds(ids: string[]) {
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

  async getTemplatesAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/template/root?skip=0&take=10000');
  }

  async doesTemplateWithNameExistAtRoot(name: string) {
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