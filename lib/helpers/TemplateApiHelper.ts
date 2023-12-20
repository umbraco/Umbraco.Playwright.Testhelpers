import {ApiHelpers} from "./ApiHelpers";

export class TemplateApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/template/' + id);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/template/' + id);
    return response.status() === 200;
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

  async update(id: string, template: object) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/template/' + id, template);
  }

  async getChildren(id: string) {
    const response = await this.api.get(`${this.api.baseUrl}/umbraco/management/api/v1/tree/template/children?parentId=${id}&skip=0&take=10000`);
    const items = await response.json();
    return items.items;
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

  async doesNameExist(name: string) {
    return await this.getByName(name);
  }

  private async recurseDeleteChildren(id: string) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.isContainer || child.hasChildren) {
        await this.recurseDeleteChildren(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.delete(id);
  }

  private async recurseChildren(name: string, id: string, toDelete: boolean) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.name === name) {
        if (!toDelete) {
          return await this.get(child.id);
        }
        if (child.isContainer || child.hasChildren) {
          return await this.recurseDeleteChildren(child.id);
        } else {
          return await this.delete(child.id);
        }
      } else if (child.isContainer || child.hasChildren) {
        await this.recurseChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  async getByName(name: string) {
    const rootTemplates = await this.getAllAtRoot();
    const jsonTemplates = await rootTemplates.json();

    for (const template of jsonTemplates.items) {
      if (template.name === name) {
        return this.get(template.id);
      } else if (template.isContainer || template.hasChildren) {
        const result = await this.recurseChildren(name, template.id, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  async ensureNameNotExists(name: string) {
    const rootTemplates = await this.getAllAtRoot();
    const jsonTemplates = await rootTemplates.json();

    for (const template of jsonTemplates.items) {
      if (template.name === name) {
        if (template.isContainer || template.hasChildren) {
          await this.recurseDeleteChildren(template.id);
        }
        await this.delete(template.id);
      } else {
        if (template.isContainer || template.hasChildren) {
          await this.recurseChildren(name, template.id, true);
        }
      }
    }
  }
}