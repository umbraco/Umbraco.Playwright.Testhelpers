import {ApiHelpers} from "./ApiHelpers";

export class RelationTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureRelationTypeNameNotExistsAtRoot(name: string) {
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

  async getRelationTypeById(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getRelationTypeItems(ids) {
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

  async getRelationTypesAtRoot() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/relation-type/root?skip=0&take=10000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getRelationTypeByNameAtRoot(name: string) {
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

  async createRelationType(name: string, id: string, isBidirectional: boolean, isDependency: boolean, parentObjectTypeId: string, childObjectTypeId: string) {
    const relationTypeData = {
      "name": name,
      "isBidirectional": isBidirectional,
      "parentObjectType": parentObjectTypeId,
      "childObjectType": childObjectTypeId,
      "isDependency": isDependency,
      "id": id
    };

    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/relation-type', relationTypeData);
  }

  async updateRelationType(id: string, relationType) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + id, relationType);
  }

  async deleteRelationType(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/relation-type/' + id);
  }

  async doesRelationTypeWithNameExistAtRoot(name: string) {
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