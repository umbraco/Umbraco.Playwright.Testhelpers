import { DataType } from '../../models/dataTypes/dataType';

export class DataTypeBuilder {
  constructor(public dataType: DataType) {}
  public withSaveAction() {
    this.dataType.action = 'save';
    return this;
  }
  public withSaveNewAction() {
    this.dataType.action = 'saveNew';
    return this;
  }
  public withId(id) {
    this.dataType.id = id;
    return this;
  }
  public withName(name) {
    this.dataType.name = name;
    return this;
  }

  public build(): DataType {
    return this.dataType;
  }
}
