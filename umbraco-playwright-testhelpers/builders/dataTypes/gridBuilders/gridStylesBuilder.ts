import { GridDataTypeBuilder } from '../gridDataTypeBuilder';
import { GridSettingsbuilder } from './gridSettingsBuilder';

export class GridStylesBuilder extends GridSettingsbuilder {
  modifier;

  constructor(parentbuilder: GridDataTypeBuilder) {
    super(parentbuilder);
  }

  withModifier(modifier: string) {
    this.modifier = modifier;
    return this;
  }

  build() {
    return {
      description: this.description,
      key: this.key,
      label: this.label,
      view: this.view,
      modifier: this.modifier,
    };
  }
}
