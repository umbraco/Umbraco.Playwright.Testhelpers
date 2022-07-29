import { DataTypeBuilder } from './dataTypeBuilder';
import { FormPickerDataType } from '../../models/dataTypes/formPickerDataType';

export class FormPickerDataTypeBuilder extends DataTypeBuilder {
  constructor(private formPickerDataType: FormPickerDataType = new FormPickerDataType()) {
    super(formPickerDataType);
  }

  withAllowedForms(formIds: string[]) {
    this.formPickerDataType.addPrevalues(formIds);
    return this;
  }
  withAllowedForm(formId: string) {
    return this.withAllowedForms([formId]);
  }
}
