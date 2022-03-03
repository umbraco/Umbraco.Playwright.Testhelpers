import { DataType } from './dataType';

export class TextBoxDataType extends DataType {
  constructor() {
    super();
    this.selectedEditor = 'Umbraco.TextBox';
    this.addPrevalues(8);
  }
  public addPrevalues(maxChars: number) {
    this.preValues = [{ key: 'maxChars', value: maxChars }];
  }
}
