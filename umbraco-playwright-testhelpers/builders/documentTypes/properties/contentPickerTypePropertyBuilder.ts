import { DocumentTypePropertyBuilder } from './documentTypePropertyBuilder';

export class ContentPickerPropertyBuilder extends DocumentTypePropertyBuilder {
  constructor(parentBuilder) {
    super(parentBuilder);
    this.dataTypeId = 1046;
  }
}
