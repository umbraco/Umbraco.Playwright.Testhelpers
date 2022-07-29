import { DocumentTypePropertyBuilder } from './documentTypePropertyBuilder';

export class DropDownDocumentTypePropertyBuilder extends DocumentTypePropertyBuilder {
  constructor(parentBuilder) {
    super(parentBuilder);
    this.dataTypeId = -39;
  }
}
