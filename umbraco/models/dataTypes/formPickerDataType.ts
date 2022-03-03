import { DataType } from './dataType';

export class FormPickerDataType extends DataType {
  constructor() {
    super();
    this.selectedEditor = 'UmbracoForms.FormPicker';
    this.addPrevalues([]);
  }
  public addPrevalues(value: any[]) {
    this.preValues = [{ key: 'allowedForms', value }];
  }
}
