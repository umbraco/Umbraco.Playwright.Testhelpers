import { DocumentTypePropertyBuilder } from './documentTypePropertyBuilder';

export class CustomDocumentTypePropertyBuilder extends DocumentTypePropertyBuilder {
  constructor(parentBuilder, dataTypeId) {
    super(parentBuilder);
    this.dataTypeId = dataTypeId;
  }
}
