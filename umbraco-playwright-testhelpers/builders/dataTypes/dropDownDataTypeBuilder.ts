import { DataTypeBuilder } from './dataTypeBuilder';
import { DropDownDataType } from '@umbraco/playwright-models';

export class DropDownDataTypeBuilder extends DataTypeBuilder {
  constructor(private dropDownDataType: DropDownDataType = new DropDownDataType()) {
    super(dropDownDataType);
  }
  withPrevalues(value: string[], multiSelect = false) {
    this.dropDownDataType.addPrevalues(value, multiSelect);
    return this;
  }
}
