import { DataType } from './dataType';
import { DataTypePrevalue } from './dataTypePrevalue';

export class GridDataType extends DataType {
  constructor() {
    super();
    this.selectedEditor = 'Umbraco.Grid';
  }

  public addPrevalues(values: DataTypePrevalue[]) {
    this.preValues = values;
  }
}
