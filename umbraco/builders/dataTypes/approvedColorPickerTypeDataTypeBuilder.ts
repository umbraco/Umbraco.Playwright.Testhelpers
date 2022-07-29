import { ApprovedColourPickerDataType } from '../../models/dataTypes/approvedColourPickerDataType';
import { DataTypeBuilder } from './dataTypeBuilder';

export class ApprovedColorPickerDataTypeBuilder extends DataTypeBuilder {
  constructor(
    private approvedColourPickerDataTypeBuilder: ApprovedColourPickerDataType = new ApprovedColourPickerDataType(),
  ) {
    super(approvedColourPickerDataTypeBuilder);
  }
  withPrevalues(value: string[], multiSelect = false) {
    this.approvedColourPickerDataTypeBuilder.addPrevalues(value, multiSelect);
    return this;
  }
}
