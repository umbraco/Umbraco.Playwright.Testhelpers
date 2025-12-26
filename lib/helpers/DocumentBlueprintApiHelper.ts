import {TreeApiHelper} from "./TreeApiHelper";
import {AliasHelper, DocumentBlueprintsBuilder} from "@umbraco/json-models-builders";

export class DocumentBlueprintApiHelper extends TreeApiHelper {
  protected resourcePath = 'document-blueprint';
  protected treePath = 'tree/document-blueprint';

  // Override - return json directly instead of null check
  async get(id: string) {
    const response = await this.api.get(this.buildUrl('/' + id));
    return await response.json();
  }

  // Override - different location split pattern
  async create(documentBlueprint) {
    if (documentBlueprint == null) {
      return;
    }
    const response = await this.api.post(this.buildUrl(), documentBlueprint);
    return response.headers().location.split("v1/document-blueprint/").pop();
  }

  // Override - DocumentBlueprint has no folders
  async getByName(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        return this.get(item.id);
      } else if (item.hasChildren) {
        const result = await this.recurseBlueprintChildren(name, item.id, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  // Override - DocumentBlueprint has no folders
  async ensureNameNotExists(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        if (item.hasChildren) {
          await this.recurseDeleteBlueprintChildren(item.id);
        }
        return await this.delete(item.id);
      } else if (item.hasChildren) {
        await this.recurseBlueprintChildren(name, item.id, true);
      }
    }
    return null;
  }

  private async recurseDeleteBlueprintChildren(id: string) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteBlueprintChildren(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.delete(id);
  }

  private async recurseBlueprintChildren(name: string, id: string, toDelete: boolean) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.name === name) {
        if (!toDelete) {
          return await this.get(child.id);
        }
        if (child.hasChildren) {
          return await this.recurseDeleteBlueprintChildren(child.id);
        } else {
          return await this.delete(child.id);
        }
      } else if (child.hasChildren) {
        await this.recurseBlueprintChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  async createDefaultDocumentBlueprint(documentBlueprintName: string, documentTypeId: string) {
    await this.ensureNameNotExists(documentBlueprintName);
    const documentBlueprint = new DocumentBlueprintsBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentBlueprintName)
        .done()
      .build();
    return await this.create(documentBlueprint);
  }

  async createFromDocument(documentBlueprintName: string, documentId: string, parentId?: string) {
    const documentBlueprintData = {
      "name": documentBlueprintName,
      "parent": parentId ? parentId : null,
      "document": {
        "id": documentId
      }
    };
    const response = await this.api.post(this.buildUrl('/from-document'), documentBlueprintData);
    return response.headers().location.split("v1/document-blueprint/").pop();
  }

  async createDocumentBlueprintWithTextBoxValue(documentBlueprintName: string, documentTypeId: string, dataTypeName: string, text: string) {
    await this.ensureNameNotExists(documentBlueprintName);

    const documentBlueprint = new DocumentBlueprintsBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentBlueprintName)
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(dataTypeName))
        .withValue(text)
        .withEditorAlias('Umbraco.TextBox')
        .done()
      .build();

    return await this.create(documentBlueprint);
  }

  async createDefaultDocumentBlueprintWithABlockListEditorAndBlockWithValue(documentBlueprintName: string, documentTypeName: string, blockListDataTypeName: string, elementTypeId: string, elementTypePropertyAlias: string, elementTypePropertyEditorAlias: string, elementTypePropertyValue: string, groupName: string) {
    const crypto = require('crypto');
    const blockContentKey = crypto.randomUUID();
    const blockListDataTypeId = await this.api.dataType.createBlockListDataTypeWithABlock(blockListDataTypeName, elementTypeId) || '';
    const documentTypeId = await this.api.documentType.createDocumentTypeWithPropertyEditor(documentTypeName, blockListDataTypeName, blockListDataTypeId, groupName) || '';
    await this.ensureNameNotExists(documentBlueprintName);

    const documentBlueprint = new DocumentBlueprintsBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentBlueprintName)
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(blockListDataTypeName))
        .withEditorAlias('Umbraco.BlockList')
        .addBlockListValue()
          .addContentData()
            .withContentTypeKey(elementTypeId)
            .withKey(blockContentKey)
            .addContentDataValue()
              .withAlias(elementTypePropertyAlias)
              .withEditorAlias(elementTypePropertyEditorAlias)
              .withValue(elementTypePropertyValue)
              .done()
            .done()
          .addExpose()
            .withContentKey(blockContentKey)
            .done()
          .addLayout()
            .withContentKey(blockContentKey)
            .done()
          .done()
        .done()
      .build();
    
    return await this.create(documentBlueprint);
  }

  async createDefaultDocumentBlueprintWithABlockGridEditorAndBlockWithValue(documentBlueprintName: string, documentTypeName: string, blockGridDataTypeName: string, elementTypeId: string, elementTypePropertyAlias: string, elementTypePropertyEditorAlias: string, elementTypePropertyValue: string, groupName: string = 'TestGroup') {
    const crypto = require('crypto');
    const blockContentKey = crypto.randomUUID();
    const blockGridDataTypeId = await this.api.dataType.createBlockGridWithABlockAndAllowAtRoot(blockGridDataTypeName, elementTypeId, true) || '';
    const documentTypeId = await this.api.documentType.createDocumentTypeWithPropertyEditor(documentTypeName, blockGridDataTypeName, blockGridDataTypeId, groupName) || '';
    await this.ensureNameNotExists(documentBlueprintName);

    const documentBlueprint = new DocumentBlueprintsBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentBlueprintName)
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(blockGridDataTypeName))
        .withEditorAlias('Umbraco.BlockGrid')
        .addBlockGridValue()
          .addContentData()
            .withContentTypeKey(elementTypeId)
            .withKey(blockContentKey)
            .addContentDataValue()
              .withAlias(elementTypePropertyAlias)
              .withEditorAlias(elementTypePropertyEditorAlias)
              .withValue(elementTypePropertyValue)
              .done()
            .done()
          .addExpose()
            .withContentKey(blockContentKey)
            .done()
          .addLayout()
            .withContentKey(blockContentKey)
            .done()
          .done()
        .done()
      .build();

    return await this.create(documentBlueprint);
  }

  async createDocumenBlueprintWithEnglishCultureAndDanishCultureAndTextBoxValue(documentBlueprintEnglishName: string, documentBlueprintDanishName: string, documentTypeId: string, dataTypeName: string, textContent: string, varyByCultureForText: boolean = false) {
    await this.ensureNameNotExists(documentBlueprintEnglishName);
    const cultureValue = varyByCultureForText ? 'en-US' : null;

    const documentBlueprint = new DocumentBlueprintsBuilder()
      .withDocumentTypeId(documentTypeId)
      .addVariant()
        .withName(documentBlueprintEnglishName)
        .withCulture('en-US')
        .done()
      .addVariant()
        .withName(documentBlueprintDanishName)
        .withCulture('da')
        .done()
      .addValue()
        .withAlias(AliasHelper.toAlias(dataTypeName))
        .withValue(textContent)
        .withCulture(cultureValue)
        .withEditorAlias('Umbraco.TextBox')
        .done()
      .build();

    return await this.create(documentBlueprint);
  }
} 