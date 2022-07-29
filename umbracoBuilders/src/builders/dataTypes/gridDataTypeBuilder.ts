import { DataTypeBuilder } from './dataTypeBuilder';
import { GridDataType } from '../../models';
import {
  GridLayoutBuilder,
  GridRowConfigBuilder,
  GridRteBuilder,
  GridSettingsbuilder,
  GridStylesBuilder,
} from './gridBuilders';

export class GridDataTypeBuilder extends DataTypeBuilder {
  preValues: any = [];
  layoutBuilders;
  templateBuilders;
  settingsBuilders;
  styleBuilders;
  rteBuilder;
  columns = 12;
  ignoreUserStartNodes;
  imageUploadFolder;

  constructor(protected gridDataType: GridDataType = new GridDataType()) {
    super(gridDataType);
    this.templateBuilders = [];
    this.layoutBuilders = [];
    this.settingsBuilders = [];
    this.styleBuilders = [];
  }

  withColumns(columns: number) {
    this.columns = columns;
    return this;
  }

  withIgnoreUserStartNodes(ignore: boolean) {
    this.ignoreUserStartNodes = ignore;
    return this;
  }

  withImageUploadFolder(folderPath: string) {
    this.imageUploadFolder = folderPath;
    return this;
  }

  addRowConfiguration(gridRowConfigBuilder?: GridRowConfigBuilder) {
    const builder =
      gridRowConfigBuilder === null || gridRowConfigBuilder === undefined
        ? new GridRowConfigBuilder(this)
        : gridRowConfigBuilder;

    this.layoutBuilders.push(builder);
    return builder;
  }

  addLayout(templateBuilder?: GridLayoutBuilder) {
    const builder =
      templateBuilder === null || templateBuilder === undefined ? new GridLayoutBuilder(this) : templateBuilder;

    this.templateBuilders.push(builder);
    return builder;
  }

  addRte(rteBuilder?: GridRteBuilder) {
    const builder = rteBuilder === null || rteBuilder === undefined ? new GridRteBuilder(this) : rteBuilder;

    this.rteBuilder = builder;
    return builder;
  }

  addSetting(settingsBuilder?: GridSettingsbuilder) {
    const builder =
      settingsBuilder === null || settingsBuilder === undefined ? new GridSettingsbuilder(this) : settingsBuilder;

    this.settingsBuilders.push(builder);
    return builder;
  }

  addStyle(styleBuilder?: GridStylesBuilder) {
    const builder = styleBuilder === null || styleBuilder === undefined ? new GridStylesBuilder(this) : styleBuilder;

    this.styleBuilders.push(builder);
    return builder;
  }

  withDefaultGrid() {
    this.addSetting()
      .withDescription('Set a css class')
      .withKey('class')
      .withLabel('Class')
      .withView('textstring')
      .done();

    this.addRowConfiguration()
      .withLabel('Headline')
      .withName('Headline')
      .addArea()
      .withGridSize(12)
      .withEditor('headline')
      .done();

    this.addRowConfiguration().withName('Article').withLabel('Article').withSimpleArea(4).withSimpleArea(8).done();

    this.addStyle()
      .withDescription('Set a row background')
      .withKey('background-image')
      .withLabel('Set a background image')
      .withModifier('url({0})')
      .withView('imagepicker')
      .done();

    this.addLayout().withName('1 column layout').withSimpleSection(12).done();

    this.addLayout().withName('2 column layout').withSimpleSection(4).withSimpleSection(8).done();

    this.addRte()
      .withMaxImageSize(500)
      .withClassicMode()
      .addToolBarOptions()
      .withSourceCodeEditor()
      .withStyleSelect()
      .withBold()
      .withItalic()
      .withJustifyLeft()
      .withJustifyCenter()
      .withJustifyRight()
      .withBulletList()
      .withNumberedList()
      .withDecreaseIndent()
      .withIncreaseIndent()
      .withInsertLink()
      .withImage()
      .withMacro()
      .withEmbed()
      .done()
      .done();

    return this;
  }

  build() {
    const items = {
      key: 'items',
      value: {
        columns: this.columns || 12,
        config: this.settingsBuilders.map((builder) => {
          return builder.build();
        }),
        layouts: this.layoutBuilders.map((builder) => {
          return builder.build();
        }),
        styles: this.styleBuilders.map((builder) => {
          return builder.build();
        }),
        templates: this.templateBuilders.map((builder) => {
          return builder.build();
        }),
      },
    };
    this.preValues.push(items);

    // Add RTE
    const rtePrevalue = {
      key: 'rte',
      value: this.rteBuilder.build(),
    };
    this.preValues.push(rtePrevalue);

    this.preValues.push({
      key: 'ignoreUserStartNodes',
      value: this.ignoreUserStartNodes || false,
    });

    // Add Image upload folder
    this.preValues.push({
      key: 'mediaParentId',
      value: this.imageUploadFolder || null,
    });

    this.dataType.addPrevalues(this.preValues);
    return super.build();
  }
}
