import { DataType } from './dataType';

export class LabelDataType extends DataType {
  constructor() {
    super();
    this.selectedEditor = 'Umbraco.Label';
    this.addPrevalues('');
  }
  public addPrevalues(value: string) {
    this.preValues = [{ key: 'umbracoDataValueType', value: [value] }];
  }
}
