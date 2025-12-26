import {ApiHelpers} from "./ApiHelpers";

export abstract class BaseApiHelper {
  api: ApiHelpers;
  protected abstract resourcePath: string;

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  // === URL Builder ===
  protected buildUrl(path: string = ''): string {
    return `${this.api.baseUrl}/umbraco/management/api/v1/${this.resourcePath}${path}`;
  }

  // === Utility Methods ===
  protected extractIdFromLocation(response: any): string {
    return response.headers().location.split("/").pop();
  }

  // === Overridable methods for different key types ===
  // Override these in subclasses that use different key types (isoCode, path, etc.)
  protected getItemKey(item: any): string {
    return item.id;
  }

  protected getItemName(item: any): string {
    return item.name;
  }

  // === CRUD Operations ===
  async get(key: string): Promise<any> {
    const response = await this.api.get(this.buildUrl('/' + key));
    const json = await response.json();
    return json !== null ? json : null;
  }

  async delete(key: string): Promise<number | undefined> {
    if (key == null) return;
    const response = await this.api.delete(this.buildUrl('/' + key));
    return response.status();
  }

  async create(data: any): Promise<string | undefined> {
    if (data == null) return;
    const response = await this.api.post(this.buildUrl(), data);
    return this.extractIdFromLocation(response);
  }

  async update(key: string, data: any): Promise<any> {
    const response = await this.api.put(this.buildUrl('/' + key), data);
    return response.text();
  }

  // === List Operations ===
  async getAll(): Promise<any> {
    const response = await this.api.get(this.buildUrl('?skip=0&take=10000'));
    return await response.json();
  }

  // === Search & Check ===
  async getByName(name: string): Promise<any> {
    const json = await this.getAll();
    for (const item of json.items) {
      if (this.getItemName(item) === name) {
        const key = this.getItemKey(item);
        if (key !== null) {
          return await this.get(key);
        }
      }
    }
    return null;
  }

  async doesNameExist(name: string): Promise<boolean> {
    return (await this.getByName(name)) !== null;
  }

  async doesExist(key: string): Promise<boolean> {
    const response = await this.api.get(this.buildUrl('/' + key));
    return response.status() === 200;
  }

  // === Cleanup ===
  async ensureNameNotExists(name: string): Promise<any> {
    const json = await this.getAll();
    for (const item of json.items) {
      if (this.getItemName(item) === name) {
        const key = this.getItemKey(item);
        if (key !== null) {
          return await this.delete(key);
        }
      }
    }
    return null;
  }
}
