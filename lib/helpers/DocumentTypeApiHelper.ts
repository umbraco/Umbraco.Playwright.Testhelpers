import {ApiHelpers} from "./ApiHelpers";

export class DocumentTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const rootDocumentTypes = await this.getAllAtRoot();
    const jsonDocumentTypes = await rootDocumentTypes.json();

    for (const documentType of jsonDocumentTypes.items) {
      if (documentType.name === name) {
        if (documentType.isFolder) {
          console.log("Test2")

          return await this.recurseDeleteChildren(documentType);
        }
        console.log("Test1")
        console.log(documentType.id )
        return await this.delete(documentType.id);
      } else if (documentType.hasChildren) {
        console.log("Test3")

        await this.recurseChildren(name, documentType.id, true);

      }
    }
    console.log("Test4")

    return null;
  }

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/document-type/root?skip=0&take=10000&foldersOnly=false');
  }

  private async recurseChildren(name: string, id: string, toDelete: boolean) {
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

  private async recurseDeleteChildren(documentTypeFolder) {
    if (!documentTypeFolder.hasChildren) {
      return await this.deleteFolder(documentTypeFolder.id);
    }
    const items = await this.getChildren(documentTypeFolder.id);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteChildren(child);
      } else if (child.isFolder) {
        await this.deleteFolder(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.deleteFolder(documentTypeFolder.id);
  }

  async getChildren(id: string) {
    const response = await this.api.get(`${this.api.baseUrl}/umbraco/management/api/v1/tree/document-type/children?parentId=${id}&skip=0&take=10000&foldersOnly=false`);
    const items = await response.json();
    return items.items;
  }

  async deleteFolder(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/document-type/folder/' + id);
  }
  
  async create(documentType) {
    if (documentType == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/document-type', documentType)
    return response.headers().location.split("/").pop();
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/document-type/' + id);
    const json = await response.json();
    if (json !== null) {
      return json;
    }
    return null;
  }

  async getFolder(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/document-type/folder/' + id);
    return await response.json();
  }
  async delete(id: string) {
    if (id == null) {
      return;
    }
    const response = await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/document-type/' + id);
    return response.status();
  }

}