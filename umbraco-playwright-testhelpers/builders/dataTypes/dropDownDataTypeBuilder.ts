import { DataTypeBuilder } from './dataTypeBuilder';
import { DropDownDataType } from '../../models/dataTypes/dropDownDataType';

export class DropDownDataTypeBuilder extends DataTypeBuilder {
  constructor(private dropDownDataType: DropDownDataType = new DropDownDataType()) {
    super(dropDownDataType);
  }
  withPrevalues(value: string[], multiSelect = false) {
    this.dropDownDataType.addPrevalues(value, multiSelect);
    return this;
  }
}
