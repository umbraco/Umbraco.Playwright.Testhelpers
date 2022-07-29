import { GridDataTypeBuilder } from '../gridDataTypeBuilder';
import { RteToolbarOptionsBuilder } from './rteToolbarOptionsBuilder';

export class GridRteBuilder {
  parentBuilder;
  maxImageSize;
  mode;
  stylesheets;
  toolbarOptionsBuilder;
  dimensions;

  constructor(parentBuilder: GridDataTypeBuilder) {
    this.parentBuilder = parentBuilder;
    this.stylesheets = [];
  }

  withClassicMode() {
    this.mode = 'classic';
    return this;
  }

  withDistractionFreeMode() {
    this.mode = 'distraction-free';
    return this;
  }

  withMaxImageSize(imageSize: number) {
    this.maxImageSize = imageSize;
    return this;
  }

  withDimensions(width: number, height: number) {
    this.dimensions = {
      width: width,
      height: height,
    };
    return this;
  }

  withStylesheet(virtualPath: string) {
    this.stylesheets.push(virtualPath);
    return this;
  }

  addToolBarOptions(optionsBuilder?: RteToolbarOptionsBuilder) {
    const builder =
      optionsBuilder === null || optionsBuilder === undefined ? new RteToolbarOptionsBuilder(this) : optionsBuilder;

    this.toolbarOptionsBuilder = builder;
    return builder;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    const RTE = {
      maxImageSize: this.maxImageSize || 500,
      mode: this.mode || 'classic',
      stylesheets: this.stylesheets,
      toolbar: this.toolbarOptionsBuilder.build(),
    };

    if (this.dimensions) {
      Object.assign(RTE, { dimensions: this.dimensions });
    }

    return RTE;
  }
}
