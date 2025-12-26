import {BaseApiHelper} from "./BaseApiHelper";

export abstract class TreeApiHelper extends BaseApiHelper {
  protected abstract treePath: string;

  // === Tree Operations ===
  async getAllAtRoot(): Promise<any> {
    return await this.api.get(
      `${this.api.baseUrl}/umbraco/management/api/v1/${this.treePath}/root?skip=0&take=10000&foldersOnly=false`
    );
  }

  async getChildren(id: string): Promise<any[]> {
    const response = await this.api.get(
      `${this.api.baseUrl}/umbraco/management/api/v1/${this.treePath}/children?parentId=${id}&skip=0&take=10000&foldersOnly=false`
    );
    const items = await response.json();
    return items.items;
  }

  // === Recursive Methods ===
  protected async recurseChildren(name: string, id: string, toDelete: boolean): Promise<any> {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.name === name) {
        if (!toDelete) {
          if (child.isFolder) {
            return await this.getFolder(child.id);
          }
          return await this.get(child.id);
        }
        if (child.isFolder) {
          return await this.recurseDeleteChildren(child);
        }
        return await this.delete(child.id);
      } else if (child.hasChildren) {
        return await this.recurseChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  protected async recurseDeleteChildren(folder: any): Promise<any> {
    if (!folder.hasChildren) {
      return await this.deleteFolder(folder.id);
    }
    const items = await this.getChildren(folder.id);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteChildren(child);
      } else if (child.isFolder) {
        await this.deleteFolder(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.deleteFolder(folder.id);
  }

  // === Folder Operations ===
  async getFolder(id: string): Promise<any> {
    const response = await this.api.get(this.buildUrl('/folder/' + id));
    return await response.json();
  }

  async deleteFolder(id: string): Promise<any> {
    return await this.api.delete(this.buildUrl('/folder/' + id));
  }

  async createFolder(name: string, parentId?: string): Promise<string> {
    const folder = {
      name: name,
      parent: parentId ? {id: parentId} : null
    };
    const response = await this.api.post(this.buildUrl('/folder'), folder);
    return this.extractIdFromLocation(response);
  }

  async renameFolder(folderId: string, folderName: string): Promise<any> {
    const folder = {name: folderName};
    return await this.api.put(this.buildUrl('/folder/' + folderId), folder);
  }

  // === Override for tree-based search ===
  async ensureNameNotExists(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        if (item.isFolder) {
          return await this.recurseDeleteChildren(item);
        }
        return await this.delete(item.id);
      } else if (item.hasChildren) {
        await this.recurseChildren(name, item.id, true);
      }
    }
    return null;
  }

  async getByName(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        if (item.isFolder) {
          return this.getFolder(item.id);
        }
        return this.get(item.id);
      } else if (item.hasChildren) {
        const result = await this.recurseChildren(name, item.id, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  async doesNameExist(name: string): Promise<any> {
    return await this.getByName(name);
  }
}
