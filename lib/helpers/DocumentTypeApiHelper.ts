import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";
import {DocumentTypeBuilder} from "@umbraco/json-models-builders";
import {AliasHelper} from "./AliasHelper";

export class DocumentTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoTrees/ContentTypeTree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);

    let documentTypeId = null;
    if (searchBody !== null) {
      for (const sb of searchBody) {
        if (sb.name == name) {
          documentTypeId = sb.id;
        }
      }

      if (documentTypeId !== null) {
        await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/ContentType/DeleteById?id=' + documentTypeId);
      }
    }
  }

  async save(docType) {
    if (docType == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/backoffice/UmbracoApi/ContentType/PostSave', docType)
    return await JsonHelper.getBody(response);
  }
  
  async createDefaultElementType(elementName, elementAlias){
    const elementType = new DocumentTypeBuilder()
      .withName(elementName)
      .withAlias(elementAlias)
      .AsElementType()
      .addGroup()
        .withName("TestString")
        .withAlias('testString')
        .addTextBoxProperty()
          .withLabel("Title")
          .withAlias("title")
        .done()
      .done()
      .build();
    await this.api.documentTypes.save(elementType);

    return elementType;
  }

  async createDefaultDocumentType(documentName: string){
    const documentAlias = AliasHelper.toAlias(documentName);
    
    const documentType = new DocumentTypeBuilder()
        .withName(documentName)
        .withAlias(documentAlias)
        .build();
    await this.api.documentTypes.save(documentType);

    return documentType;
  }
  
  async createDefaultDocumentWithBlockGridEditor(element, dataType) {
    const documentName = 'DocumentTest';
    const blockGridName = 'BlockGridTest';
    const elementName = 'ElementTest';
    const documentAlias = AliasHelper.toAlias(documentName);
    const blockGridAlias = AliasHelper.toAlias(blockGridName);
    const elementAlias = AliasHelper.toAlias(elementName);

    if (element == null) {
      element = await this.api.documentTypes.createDefaultElementType(elementName, elementAlias);
    }
    if (dataType == null) {
      dataType = await this.api.dataTypes.createDefaultBlockGrid(blockGridName, element);
    }

    const docType = new DocumentTypeBuilder()
      .withName(documentName)
      .withAlias(documentAlias)
      .withAllowAsRoot(true)
      .addGroup()
        .withName('BlockGridGroup')
        .withAlias('blockGridGroup')
        .addCustomProperty(dataType['id'])
          .withLabel(blockGridName)
          .withAlias(blockGridAlias)
        .done()
      .done()
      .build();
    await this.api.documentTypes.save(docType);

    return element;
  }
}