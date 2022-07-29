import { DocumentTypePropertyBuilder } from './documentTypePropertyBuilder';

export class RichTextDocumentTypePropertyEditor extends DocumentTypePropertyBuilder {
  constructor(parentBuilder) {
    super(parentBuilder);
    this.dataTypeId = -87;
  }
}
