import { DataType } from './dataType';

export class ApprovedColourPickerDataType extends DataType {
  constructor() {
    super();
    this.selectedEditor = 'Umbraco.ColorPicker';
    this.addPrevalues([], false);
    
  }
  public addPrevalues(value: string[], multiSelect = false) {
    this.preValues = [
      { key: 'useLabel', value: multiSelect },
      {
        key: 'items',
        value: value.map((val) => {
          return { value: val };
        }),
      },
    ];
  }
}