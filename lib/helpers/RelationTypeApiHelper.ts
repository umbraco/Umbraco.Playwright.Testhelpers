import {TreeApiHelper} from "./TreeApiHelper";

export class RelationTypeApiHelper extends TreeApiHelper {
  protected resourcePath = 'relation-type';
  protected treePath = 'tree/relation-type';

  // RelationType-specific create with different signature
  async createRelationType(name: string, isBidirectional: boolean, isDependency: boolean, parentObjectTypeId?: string, childObjectTypeId?: string, id?: string) {
    const relationTypeData = {
      "name": name,
      "isBidirectional": isBidirectional,
      "parentObjectType": parentObjectTypeId,
      "childObjectType": childObjectTypeId,
      "isDependency": isDependency,
      "id": id
    };
    const response = await this.api.post(this.buildUrl(), relationTypeData);
    return response.headers().location.split("/").pop();
  }

  async getItems(ids: string[]) {
    let idArray = 'id=' + ids[0];
    for (let i = 1; i < ids.length; ++i) {
      idArray += '&id=' + ids[i];
    }
    const response = await this.api.get(this.buildUrl('/item?' + idArray));
    const json = await response.json();
    return json !== null ? json : null;
  }

  // Override - RelationType has no folders
  async getByName(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name && item.id !== null) {
        return await this.get(item.id);
      }
    }
    return null;
  }

  // Override - RelationType has no folders
  async ensureNameNotExists(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name && item.id !== null) {
        return await this.delete(item.id);
      }
    }
    return null;
  }

  async doesNameExist(name: string): Promise<boolean> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    if (name !== null) {
      for (const item of jsonItems.items) {
        if (item.name === name) {
          return true;
        }
      }
    }
    return false;
  }
}