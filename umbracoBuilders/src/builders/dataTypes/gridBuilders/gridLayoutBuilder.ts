import { GridDataTypeBuilder } from './../gridDataTypeBuilder';
import { SectionBuilder } from './sectionBuilder';

export class GridLayoutBuilder {
  parentBuilder: GridDataTypeBuilder;
  name;
  sectionBuilders;

  constructor(parrentBuilder: GridDataTypeBuilder) {
    this.parentBuilder = parrentBuilder;
    this.sectionBuilders = [];
  }

  withName(name) {
    this.name = name;
    return this;
  }

  addSection(sectionBuilder?: SectionBuilder) {
    const builder = sectionBuilder === null || sectionBuilder === undefined ? new SectionBuilder(this) : sectionBuilder;
    this.sectionBuilders.push(builder);
    return builder;
  }

  withSimpleSection(gridSize: number) {
    this.addSection().withGridSize(gridSize).done();
    return this;
  }

  done(): GridDataTypeBuilder {
    return this.parentBuilder;
  }

  build() {
    return {
      name: this.name,
      sections: this.sectionBuilders.map((builder) => {
        return builder.build();
      }),
    };
  }
}
