import { DataTypePrevalue } from './dataTypePrevalue';

export abstract class DataType {
  public action = 'saveNew';
  public id = 0;
  public name = '';
  public parentId = -1;
  public selectedEditor = '';
  protected preValues: DataTypePrevalue[];

  public getPrevalues() {
    return this.preValues;
  }
  public abstract addPrevalues(value: any[] | any);
}
