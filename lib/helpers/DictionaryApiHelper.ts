import {TreeApiHelper} from "./TreeApiHelper";

export class DictionaryApiHelper extends TreeApiHelper {
  protected resourcePath = 'dictionary';
  protected treePath = 'tree/dictionary';

  // Dictionary-specific create with translations
  async createDictionary(name: string, translations?: { isoCode: string, translation: string }[], parentId?: string) {
    const dictionary = {
      "name": name,
      "translations": translations,
      "parent": parentId ? {"id": parentId} : null
    };
    const response = await this.api.post(this.buildUrl(), dictionary);
    return response.headers().location.split("/").pop();
  }

  async getItems(ids: string[]) {
    let idArray = 'id=' + ids[0];
    for (let i = 1; i < ids.length; ++i) {
      idArray += '&id=' + ids[i];
    }
    const response = await this.api.get(`${this.api.baseUrl}/umbraco/management/api/v1/${this.treePath}/item?${idArray}`);
    const json = await response.json();
    return json !== null ? json : null;
  }

  // Override - Dictionary uses isContainer check
  async getByName(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        return this.get(item.id);
      } else if (item.isContainer || item.hasChildren) {
        const result = await this.recurseDictionaryChildren(name, item.id, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  // Override - Dictionary uses isContainer check
  async ensureNameNotExists(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        if (item.isContainer || item.hasChildren) {
          await this.recurseDeleteDictionaryChildren(item.id);
        }
        await this.delete(item.id);
      } else {
        if (item.isContainer || item.hasChildren) {
          await this.recurseDictionaryChildren(name, item.id, true);
        }
      }
    }
  }

  private async recurseDeleteDictionaryChildren(id: string) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.isContainer || child.hasChildren) {
        await this.recurseDeleteDictionaryChildren(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.delete(id);
  }

  private async recurseDictionaryChildren(name: string, id: string, toDelete: boolean) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.name === name) {
        if (!toDelete) {
          return await this.get(child.id);
        }
        if (child.isContainer || child.hasChildren) {
          return await this.recurseDeleteDictionaryChildren(child.id);
        } else {
          return await this.delete(child.id);
        }
      } else if (child.isContainer || child.hasChildren) {
        await this.recurseDictionaryChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  async export(id: string, includeChildren: boolean) {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/' + id + '/export?includeChidren=' + includeChildren);
  }

  async import(temporaryFileId: string, parentId: string) {
    const importDictionary = {
      "temporaryFile": temporaryFileId ? {"id" : temporaryFileId} : null,
      "parent": parentId ? {"id" : parentId} : null
    }
    return await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/dictionary/import', importDictionary);
  }

  async createDefaultDictionary(name: string) {
    await this.ensureNameNotExists(name);
    const allLanguages = await this.api.language.getAll();
    const jsonLanguages = await allLanguages.json();
    const languageIsoCode = jsonLanguages.items[0].isoCode;
    const translations = [
      {
        "isoCode": languageIsoCode,
        "translation": name
      }
    ];

    return await this.createDictionary(name, translations);
  }
}