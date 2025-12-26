import {ApiHelpers} from "./ApiHelpers";

/**
 * Base class for path-based tree resources like Script, Stylesheet, PartialView.
 * These resources use `path` as their key instead of `id`.
 */
export abstract class PathBasedTreeApiHelper {
  api: ApiHelpers;
  protected abstract resourcePath: string;
  protected abstract treePath: string;

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  // === URL Builder ===
  protected buildUrl(path: string = ''): string {
    return `${this.api.baseUrl}/umbraco/management/api/v1/${this.resourcePath}${path}`;
  }

  protected buildTreeUrl(path: string = ''): string {
    return `${this.api.baseUrl}/umbraco/management/api/v1/${this.treePath}${path}`;
  }

  protected extractPathFromLocation(response: any): string {
    const path = response.headers().location.split(`/v1/${this.resourcePath}/`).pop() as string;
    return decodeURIComponent(path);
  }

  protected extractFolderPathFromLocation(response: any): string {
    const path = response.headers().location.split(`/v1/${this.resourcePath}/folder/`).pop() as string;
    return decodeURIComponent(path);
  }

  // === CRUD Operations ===
  async get(path: string): Promise<any> {
    const response = await this.api.get(this.buildUrl('/' + encodeURIComponent(path)));
    return await response.json();
  }

  async doesExist(path: string): Promise<boolean> {
    const response = await this.api.get(this.buildUrl('/' + encodeURIComponent(path)));
    return response.status() === 200;
  }

  async delete(path: string): Promise<any> {
    return await this.api.delete(this.buildUrl('/' + encodeURIComponent(path)));
  }

  async updateContent(path: string, newContent: string): Promise<any> {
    const data = { "content": newContent };
    return await this.api.put(this.buildUrl('/' + encodeURIComponent(path)), data);
  }

  async updateName(path: string, newName: string): Promise<string | undefined> {
    const data = { "name": newName };
    const response = await this.api.put(this.buildUrl('/' + encodeURIComponent(path) + '/rename'), data);
    const newPath = response.headers().location.split(`/v1/${this.resourcePath}/`).pop();
    if (newPath !== undefined) {
      return decodeURIComponent(newPath);
    }
    return undefined;
  }

  // === Tree Operations ===
  async getAllAtRoot(): Promise<any> {
    return await this.api.get(this.buildTreeUrl('/root?skip=0&take=10000'));
  }

  async getChildren(path: string): Promise<any[]> {
    const response = await this.api.get(this.buildTreeUrl(`/children?parentPath=${encodeURIComponent(path)}&skip=0&take=10000`));
    const items = await response.json();
    return items.items;
  }

  async getItems(paths: string[]): Promise<any> {
    let pathArray = 'path=' + encodeURIComponent(paths[0]);
    for (let i = 1; i < paths.length; ++i) {
      pathArray += '&path=' + encodeURIComponent(paths[i]);
    }
    const response = await this.api.get(this.buildTreeUrl('/item?' + pathArray));
    const json = await response.json();
    return json !== null ? json : null;
  }

  // === Search ===
  async doesNameExist(name: string): Promise<any> {
    return await this.getByName(name);
  }

  async getByName(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        return item.isFolder ? this.getFolder(item.path) : this.get(item.path);
      } else if (item.isFolder && item.hasChildren) {
        const result = await this.recurseChildren(name, item.path, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  async ensureNameNotExists(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        return item.isFolder
          ? await this.recurseDeleteChildren(item)
          : await this.delete(item.path);
      } else if (item.hasChildren) {
        await this.recurseChildren(name, item.path, true);
      }
    }
    return null;
  }

  // === Recursive Methods ===
  protected async recurseChildren(name: string, path: string, toDelete: boolean): Promise<any> {
    const items = await this.getChildren(path);

    for (const child of items) {
      if (child.name === name) {
        if (!toDelete) {
          return child.isFolder ? await this.getFolder(child.path) : await this.get(child.path);
        }
        return child.isFolder
          ? await this.recurseDeleteChildren(child)
          : await this.delete(child.path);
      } else if (child.hasChildren) {
        const result = await this.recurseChildren(name, child.path, toDelete);
        if (result) return result;
      }
    }
    return false;
  }

  protected async recurseDeleteChildren(folder: any): Promise<any> {
    if (!folder.hasChildren) {
      return await this.deleteFolder(folder.path);
    }
    const items = await this.getChildren(folder.path);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteChildren(child);
      } else if (child.isFolder) {
        await this.deleteFolder(child.path);
      } else {
        await this.delete(child.path);
      }
    }
    return await this.deleteFolder(folder.path);
  }

  // === Folder Operations ===
  async getFolder(path: string): Promise<any> {
    const response = await this.api.get(this.buildUrl('/folder/' + encodeURIComponent(path)));
    return await response.json();
  }

  async doesFolderExist(path: string): Promise<boolean> {
    const response = await this.api.get(this.buildUrl('/folder/' + encodeURIComponent(path)));
    return response.status() === 200;
  }

  async createFolder(name: string, parentPath?: string): Promise<string | undefined> {
    const parentValue = parentPath ? { 'path': parentPath } : null;
    const folderData = { "name": name, "parent": parentValue };
    const response = await this.api.post(this.buildUrl('/folder'), folderData);
    return this.extractFolderPathFromLocation(response);
  }

  async deleteFolder(path: string): Promise<any> {
    return await this.api.delete(this.buildUrl('/folder/' + encodeURIComponent(path)));
  }
}
