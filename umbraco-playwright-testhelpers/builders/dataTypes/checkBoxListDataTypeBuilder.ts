import { DataTypeBuilder } from './dataTypeBuilder';
import { CheckBoxListDataType } from '@umbraco/playwright-models';

export class CheckBoxListDataTypeBuilder extends DataTypeBuilder {
  constructor(private checkBoxListDataType: CheckBoxListDataType = new CheckBoxListDataType()) {
    super(checkBoxListDataType);
  }
  withPrevalues(value: string[], multiSelect = false) {
    this.checkBoxListDataType.addPrevalues(value, multiSelect);
    return this;
  }
}