import { GridDataTypeBuilder } from '../gridDataTypeBuilder';

export class GridSettingsbuilder {
  parentBuilder;
  description;
  key;
  label;
  view;

  constructor(parentbuilder: GridDataTypeBuilder) {
    this.parentBuilder = parentbuilder;
  }

  withDescription(description: string) {
    this.description = description;
    return this;
  }

  withKey(key: string) {
    this.key = key;
    return this;
  }

  withLabel(label: string) {
    this.label = label;
    return this;
  }

  withView(view: string) {
    this.view = view;
    return this;
  }

  done(): GridDataTypeBuilder {
    return this.parentBuilder;
  }

  build() {
    return {
      description: this.description,
      key: this.key,
      label: this.label,
      view: this.view,
    };
  }
}
