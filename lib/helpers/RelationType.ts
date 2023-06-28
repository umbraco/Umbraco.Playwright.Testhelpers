import {ApiHelpers} from "./ApiHelpers";

export class RelationTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/relation-type/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + sb.id);
        }
      }
    }
    return null;
  }

  async exists(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + id);
    return response.status() === 200;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getItems(ids) {
    let idArray = 'id=' + ids[0];
    let i: number;

    for (i = 1; i < ids.length; ++i) {
      idArray += '&id=' + ids[i];
    }

    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/item?' + idArray);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getAllAtRoot() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/relation-type/root?skip=0&take=10000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getByNameAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/relation-type/root?skip=0&take=10000');
    const json = await response.json();

    for (const sb of json.items) {
      if (sb.name === name) {
        if (sb.id !== null) {
          const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + sb.id);
          return await response.json();
        }
      }
    }
    return null;
  }

  async create(name: string, id: string, isBidirectional: boolean, isDependency: boolean, parentObjectTypeId: string, childObjectTypeId: string) {
    const relationTypeData = {
      "name": name,
      "isBidirectional": isBidirectional,
      "parentObjectType": parentObjectTypeId,
      "childObjectType": childObjectTypeId,
      "isDependency": isDependency,
      "id": id
    };

    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/relation-type', relationTypeData);
    // Returns the id of the created relationType
    return response.headers().location.split("/").pop();
  }

  async update(id: string, relationType) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + id, relationType);
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + id);
  }

  async nameExistsAtRoot(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/relation-type/root?skip=0&take=10000');
    const searchBody = await response.json();

    if (name !== null) {
      for (const sb of searchBody.items) {
        if (sb.name === name) {
          return true;
        }
      }
    }
    return false;
  }
}