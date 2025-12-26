import {ApiHelpers} from "./ApiHelpers";

/**
 * Base class for resources that use variants for name (Member, Document, Media).
 * These resources have `variants[0].name` instead of direct `name` property.
 */
export abstract class VariantBasedApiHelper {
  api: ApiHelpers;
  protected abstract resourcePath: string;
  protected abstract filterPath: string;

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  // === URL Builder ===
  protected buildUrl(path: string = ''): string {
    return `${this.api.baseUrl}/umbraco/management/api/v1/${this.resourcePath}${path}`;
  }

  protected buildFilterUrl(path: string = ''): string {
    return `${this.api.baseUrl}/umbraco/management/api/v1/${this.filterPath}${path}`;
  }

  // === Utility Methods ===
  protected extractIdFromLocation(response: any, splitPattern?: string): string {
    const pattern = splitPattern || "/";
    return response.headers().location.split(pattern).pop();
  }

  // Get name from item - override if needed
  protected getItemName(item: any): string {
    return item.variants?.[0]?.name ?? item.name;
  }

  // === CRUD Operations ===
  async get(id: string): Promise<any> {
    const response = await this.api.get(this.buildUrl('/' + id));
    return await response.json();
  }

  async delete(id: string): Promise<number | undefined> {
    if (id == null) return;
    const response = await this.api.delete(this.buildUrl('/' + id));
    return response.status();
  }

  async create(data: any): Promise<string | undefined> {
    if (data == null) return;
    const response = await this.api.post(this.buildUrl(), data);
    return this.extractIdFromLocation(response, `v1/${this.resourcePath}/`);
  }

  async doesExist(id: string): Promise<boolean> {
    const response = await this.api.get(this.buildUrl('/' + id));
    return response.status() === 200;
  }

  // === List Operations ===
  async getAll(): Promise<any> {
    return await this.api.get(this.buildFilterUrl('?skip=0&take=10000'));
  }

  // === Search & Check ===
  async getByName(name: string): Promise<any> {
    const response = await this.getAll();
    const json = await response.json();

    for (const item of json.items) {
      if (this.getItemName(item) === name) {
        return await this.get(item.id);
      }
    }
    return false;
  }

  async doesNameExist(name: string): Promise<any> {
    return await this.getByName(name);
  }

  // === Cleanup ===
  async ensureNameNotExists(name: string): Promise<any> {
    const response = await this.getAll();
    const json = await response.json();

    for (const item of json.items) {
      if (this.getItemName(item) === name) {
        return await this.delete(item.id);
      }
    }
    return null;
  }
}
