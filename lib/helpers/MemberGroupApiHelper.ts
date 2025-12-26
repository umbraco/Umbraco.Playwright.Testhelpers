import {TreeApiHelper} from "./TreeApiHelper";

export class MemberGroupApiHelper extends TreeApiHelper {
  protected resourcePath = 'member-group';
  protected treePath = 'tree/member-group';

  // MemberGroup-specific create with optional id
  async createMemberGroup(name: string, id?: string) {
    const memberGroupData = {
      "name": name,
      "id": id ? id : null,
    };
    const response = await this.api.post(this.buildUrl(), memberGroupData);
    return response.headers().location.split("v1/member-group/").pop();
  }

  async rename(id: string, name: string) {
    const memberGroupData = {
      "name": name
    };
    return await this.api.put(this.buildUrl('/' + id), memberGroupData);
  }

  // Override - MemberGroup has no folders
  async getByName(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        return this.get(item.id);
      }
    }
    return false;
  }

  // Override - MemberGroup has no folders
  async ensureNameNotExists(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        return this.delete(item.id);
      }
    }
    return null;
  }
}