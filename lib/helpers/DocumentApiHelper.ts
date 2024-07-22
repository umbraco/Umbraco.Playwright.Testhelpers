import {AliasHelper} from "./AliasHelper";
import {ApiHelpers} from "./ApiHelpers";
import {DocumentBuilder} from "@umbraco/json-models-builders";

export class DocumentApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/document/' + id);
    return await response.json();
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/document/' + id);
    return response.status() === 200;
  }

  async create(document) {
    if (document == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/document', document);
    return response.headers().location.split("v1/document/").pop();
  }

  async delete(id: string) {
    if (id == null) {
      return;
    }
    const response = await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/document/' + id);
    return response.status();
  }

  async update(id: string, document) {
    if (document == null) {
      return;
    }
    const variantsData = document.variants.map(variant => ({
      culture: variant.culture,
      segment: variant.segment,
      name: variant.name
    }));
    
    const updateData = {
      values: document.values,
      variants: variantsData,
      template: document.template
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/document/' + id, updateData);
  }

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/document/root?skip=0&take=10000');
  }

  async getChildren(id: string) {
    const response = await this.api.get(`${this.api.baseUrl}/umbraco/management/api/v1/tree/document/children?parentId=${id}&skip=0&take=10000`);
    const items = await response.json();
    return items.items;
  }

  async doesNameExist(name: string) {
    return await this.getByName(name);
  }

  private async recurseDeleteChildren(id: string) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.hasChildren) {
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
      if (child.variants[0].name === name) {
        if (!toDelete) {
          return await this.get(child.id);
        }
        if (child.hasChildren) {
          return await this.recurseDeleteChildren(child.id);
        } else {
          return await this.delete(child.id);
        }
      } else if (child.hasChildren) {
        await this.recurseChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  async getByName(name: string) {
    const rootDocuments = await this.getAllAtRoot();
    const jsonDocuments = await rootDocuments.json();

    for (const document of jsonDocuments.items) {
      if (document.variants[0].name === name) {
        return this.get(document.id);
      } else if (document.hasChildren) {
        const result = await this.recurseChildren(name, document.id, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  async ensureNameNotExists(name: string) {
    const rootDocuments = await this.getAllAtRoot();
    const jsonDocuments = await rootDocuments.json();

    for (const document of jsonDocuments.items) {
      if (document.variants[0].name === name) {
        if (document.hasChildren) {
          await this.recurseDeleteChildren(document.id);
        }
        await this.delete(document.id);
      } else {
        if (document.hasChildren) {
          await this.recurseChildren(name, document.id, true);
        }
      }
    }
  }

  async publish(id: string, publishSchedulesData) {
    if (id == null) {
      return;
    }
    const response = await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/document/' + id + '/publish', publishSchedulesData);
    return response.status();
  }

  async createDefaultDocument(documentName: string, documentTypeId: string) {
    await this.ensureNameNotExists(documentName);
    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .build();
    return await this.create(document);
  }

  async createDocumentWithTextContent(documentName: string, documentTypeId: string, textContent: string, dataTypeName: string) {
    await this.ensureNameNotExists(documentName);
    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(dataTypeName))
        .withValue(textContent)
        .done()
      .build();
    return await this.create(document);
  }

  async createDefaultDocumentWithParent(documentName: string, documentTypeId: string, parentId: string) {
    await this.ensureNameNotExists(documentName);
    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .withParentId(parentId)
      .addVariant()
        .withName(documentName)
        .done()
      .build();
    return await this.create(document);
  }

  async createDocumentWithTemplate(documentName: string, documentTypeId: string, templateId: string) {
    await this.ensureNameNotExists(documentName);
    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .withTemplateId(templateId)
      .build();
    return await this.create(document);
  }

  async createDocumentWithContentPicker(documentName: string, documentTypeId: string, contentPickerId: string) {
    await this.ensureNameNotExists(documentName);
    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias('contentPicker')
        .withValue(contentPickerId)
        .done()
      .build();
    return await this.create(document);
  }

  async createDocumentWithMediaPicker(documentName: string, documentTypeId: string, mediaPickerId: string) {
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias('mediaPicker')
        .addMediaPickerValue()
          .withMediaKey(mediaPickerId)
          .done()
        .done()
      .build();

    return await this.create(document);
  }

  // Domains
  async getDomains(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/document/' + id + '/domains');
    return await response.json();
  }

  async updateDomains(id: string, domains) {
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/document/' + id + '/domains', domains);
  }
} 