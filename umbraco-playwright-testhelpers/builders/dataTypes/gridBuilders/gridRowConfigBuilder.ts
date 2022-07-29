import { GridDataTypeBuilder } from '../gridDataTypeBuilder';
import { GridAreaBuilder } from './gridAreaBuilder';

export class GridRowConfigBuilder {
  parentBuilder;
  label;
  name;
  areas;
  allowed;

  constructor(parentBuilder: GridDataTypeBuilder) {
    this.parentBuilder = parentBuilder;
    this.areas = [];
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withLabel(label) {
    this.label = label;
    return this;
  }

  withAllowed(allowed: boolean) {
    this.allowed = allowed;
    return this;
  }

  addArea(areaBuilder?: GridAreaBuilder) {
    const builder = areaBuilder === null || areaBuilder === undefined ? new GridAreaBuilder(this) : areaBuilder;

    this.areas.push(builder);
    return builder;
  }

  withSimpleArea(gridSize: number) {
    this.addArea().withGridSize(gridSize).done();
    return this;
  }

  done(): GridDataTypeBuilder {
    return this.parentBuilder;
  }

  build() {
    if (this.allowed) {
      return {
        allowed: this.allowed,
        name: this.name,
        label: this.label || this.name,
        areas: this.areas.map((builder) => {
          return builder.build();
        }),
      };
    }
    return {
      name: this.name,
      label: this.label || this.name,
      areas: this.areas.map((builder) => {
        return builder.build();
      }),
    };
  }
}
