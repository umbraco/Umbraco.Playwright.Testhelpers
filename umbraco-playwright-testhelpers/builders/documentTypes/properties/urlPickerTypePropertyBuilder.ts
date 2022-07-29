import { DocumentTypePropertyBuilder } from './documentTypePropertyBuilder';

export class UrlPickerPropertyBuilder extends DocumentTypePropertyBuilder {
  constructor(parentBuilder) {
    super(parentBuilder);
    this.dataTypeId = 1050;
  }
}