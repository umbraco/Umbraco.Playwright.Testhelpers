import { ApprovedColourPickerDataType } from '../../../models';
import { DataTypeBuilder } from '../../dataTypes/dataTypeBuilder';

export class ApprovedColorPickerDataTypeBuilder extends DataTypeBuilder {
  constructor(private approvedColourPickerDataTypeBuilder: ApprovedColourPickerDataType = new ApprovedColourPickerDataType()) {
    super(approvedColourPickerDataTypeBuilder)
  }
  
  withPrevalues(value: string[], multiSelect = false) {
    this.approvedColourPickerDataTypeBuilder.addPrevalues(value, multiSelect);
    return this;
  }  
}