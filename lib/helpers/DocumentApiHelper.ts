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

  async getChildrenAmount(id: string) {
    const response = await this.api.get(`${this.api.baseUrl}/umbraco/management/api/v1/tree/document/children?parentId=${id}&skip=0&take=10000`);
    const items = await response.json();
    return items.total;
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
      for (const variant of child.variants) {
        if (variant.name === name) {
          if (!toDelete) {
            return await this.get(child.id);
          }
          if (child.hasChildren) {
            return await this.recurseDeleteChildren(child.id);
          } else {
            return await this.delete(child.id);
          }
        }
      }
      if (child.hasChildren) {
        await this.recurseChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  async getByName(name: string) {
    const rootDocuments = await this.getAllAtRoot();
    const jsonDocuments = await rootDocuments.json();

    for (const document of jsonDocuments.items) {
      for (const variant of document.variants) {
        if (variant.name === name) {
          return this.get(document.id);
        }
      }
      if (document.hasChildren) {
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
      for (const variant of document.variants) {
        if (variant.name === name) {
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

  async createDocumentWithOneMediaPicker(documentName: string, documentTypeId: string, mediaPickerId: string) {
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

  async createDocumentWithTwoMediaPicker(documentName: string, documentTypeId: string, firstMediaPickerId: string, secondMediaPickerId: string, alias: string = 'multipleMediaPicker') {
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias(alias)
        .addMediaPickerValue()
          .withMediaKey(firstMediaPickerId)
          .done()
        .addMediaPickerValue()
          .withMediaKey(secondMediaPickerId)
          .done()
        .done()
      .build();

    return await this.create(document);
  }

  async createDocumentWithMemberPicker(documentName: string, documentTypeId: string, memberId: string) {
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias('memberPicker')
        .withValue(memberId)
        .done()
      .build();
      
    return await this.create(document);
  }

  async createDocumentWithTags(documentName: string, documentTypeId: string, tagsName: string[]) {
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias('tags')
        .withValue(tagsName)
        .done()
      .build();
    
    return await this.create(document);
  }

  async createDocumentWithExternalLinkURLPicker(documentName: string, documentTypeId: string, link: string, linkTitle: string) {
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias('multiUrlPicker')
        .addURLPickerValue()
          .withIcon('icon-link')
          .withName(linkTitle)
          .withType('external')
          .withUrl(link)
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
  
  // Image Media Picker
  async createDocumentWithImageMediaPicker(documentName: string, documentTypeId: string, propertyAlias: string, mediaKey: string, focalPoint: {left: number, top: number} = {left: 0, top: 0}) {
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias(propertyAlias)
        .addMediaPickerValue()
          .withMediaKey(mediaKey)
          .withFocalPoint(focalPoint)
          .done()
        .done()
      .build();

    return await this.create(document);
  }
  
  async doesImageMediaPickerContainImage(id: string, propertyAlias: string, mediaKey: string) {
    const contentData = await this.getByName(id);
    return contentData.values.some(value =>
      value.alias === propertyAlias && value.value.some(item => item.mediaKey === mediaKey)
    );
  }

  async doesImageMediaPickerContainImageWithFocalPoint(id: string, propertyAlias: string, mediaKey: string, focalPoint: {left: number, top: number}) {
    const contentData = await this.getByName(id);

    if (focalPoint.left <= 0 || focalPoint.top <= 0) {
      return contentData.values.some(value => value.alias === propertyAlias && value.value.some(item => {
        return item.mediaKey === mediaKey && item.focalPoint === null;
      }));
    }

    // When selecting a focalpoint, it is not exact down to the decimal, so we need a small tolerance to account for that.
    const tolerance = 0.02;

    return contentData.values.some(value =>
        value.alias === propertyAlias && value.value.some(item => {
          // Check if the mediaKey is the same and the focalPoint is within the tolerance
          return item.mediaKey === mediaKey &&
            Math.abs(item.focalPoint.left - focalPoint.left) <= tolerance * focalPoint.left &&
            Math.abs(item.focalPoint.top - focalPoint.top) <= tolerance * focalPoint.top;
        })
    );
  }

  async createDocumentWithUploadFile(documentName: string, documentTypeId: string, dataTypeName: string, uploadFileName: string, mineType: string) {
    await this.ensureNameNotExists(documentName);
    const temporaryFile = await this.api.temporaryFile.createTemporaryFile(uploadFileName, 'File', mineType);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(dataTypeName))
        .withTemporaryFileId(temporaryFile.temporaryFileId)
        .done()
      .build();

    return await this.create(document);
  }

  async createDefaultDocumentWithEnglishCulture(documentName: string, documentTypeId: string) {
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .withCulture('en-US')
        .done()
      .build();

    return await this.create(document);
  }

  async createDocumentWithEnglishCultureAndTextContent(documentName: string, documentTypeId: string, textContent: string, dataTypeName: string, varyByCultureForText: boolean = false) {
    await this.ensureNameNotExists(documentName);
    const cultureValue = varyByCultureForText === true ? 'en-US' : null;

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .withCulture('en-US')
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(dataTypeName))
        .withValue(textContent)
        .withCulture(cultureValue)
        .done()
      .build();

    return await this.create(document);
  }

  async createPublishedDocumentWithValue(documentName: string, value: any, dataTypeId: string, templateId: string, propertyName: string = 'Test Property Name', documentTypeName: string = 'Test Document Type') {
    // Create document type
    let documentTypeId = await this.api.documentType.createDocumentTypeWithPropertyEditorAndAllowedTemplate(documentTypeName, dataTypeId, propertyName, templateId);
    documentTypeId = documentTypeId === undefined ? '' : documentTypeId;
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(propertyName))
        .withValue(value)
        .done()
      .build();

    // Create document
    let documentId = await this.create(document);
    documentId = documentId === undefined ? '' : documentId;
    // Publish document
    const publishData = {"publishSchedules":[{"culture":null}]};
    await this.publish(documentId, publishData);
    return documentId;
  }

  async createPublishedDocumentWithImageCropper(documentName: string, cropValue: any, dataTypeId: string, templateId: string, propertyName: string = 'Test Property Name', documentTypeName: string = 'Test Document Type', focalPoint: {left: number, top: number} = {left: 0.5, top: 0.5}) {
    // Create temporary file
    const temporaryFile = await this.api.temporaryFile.createDefaultTemporaryImageFile();
    // Create document type
    let documentTypeId = await this.api.documentType.createDocumentTypeWithPropertyEditorAndAllowedTemplate(documentTypeName, dataTypeId, propertyName, templateId);
    documentTypeId = documentTypeId === undefined ? '' : documentTypeId;
    await this.ensureNameNotExists(documentName);

    const document = new DocumentBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentName)
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(propertyName))
        .addImageCropperValue()
          .withCrop(cropValue)
          .withFocalPoint(focalPoint)
          .withTemporaryFileId(temporaryFile.temporaryFileId)
          .done()
        .done()
      .build();

    // Create document
    let documentId = await this.create(document);
    documentId = documentId === undefined ? '' : documentId;
    // Publish document
    const publishData = {"publishSchedules":[{"culture":null}]};
    await this.publish(documentId, publishData);
    return documentId;
  }
}