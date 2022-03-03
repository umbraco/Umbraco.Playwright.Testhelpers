import { DataType } from './dataType';

export class DropDownDataType extends DataType {
  constructor() {
    super();
    this.selectedEditor = 'Umbraco.DropDown.Flexible';
    this.addPrevalues([], false);
  }
  public addPrevalues(value: string[], multiSelect = false) {
    this.preValues = [
      { key: 'multiple', value: multiSelect },
      {
        key: 'items',
        value: value.map((val) => {
          return { value: val };
        }),
      },
    ];
  }
}
