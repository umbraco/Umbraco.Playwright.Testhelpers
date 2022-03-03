import { DocumentTypePropertyBuilder } from './documentTypePropertyBuilder';

export class TextBoxDocumentTypePropertyBuilder extends DocumentTypePropertyBuilder {
  constructor(parentBuilder) {
    super(parentBuilder);
    this.dataTypeId = -88;
  }
}
