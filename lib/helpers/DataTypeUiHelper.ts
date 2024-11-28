import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class DataTypeUiHelper extends UiBaseLocators {
  private readonly moveToBtn: Locator;
  private readonly duplicateToBtn: Locator;
  private readonly newDataTypeThreeDotsBtn: Locator;
  private readonly dataTypeNameTxt: Locator;
  private readonly createDataTypeFolderBtn: Locator;
  private readonly updateDataTypeFolderBtn: Locator;
  private readonly includeLabelsSlider: Locator;
  private readonly addColorBtn: Locator;
  private readonly colorValueTxt: Locator;
  private readonly offsetTimeSlider: Locator;
  private readonly dateFormatTxt: Locator;
  private readonly pageSizeTxt: Locator;
  private readonly ascendingRadioBtn: Locator;
  private readonly descendingRadioBtn: Locator;
  private readonly chooseColumnsDisplayedBtn: Locator;
  private readonly workspaceViewName: Locator;
  private readonly orderByDropDownBox: Locator;
  private readonly showWorkspaceViewFirstSlider: Locator;
  private readonly editInInfiniteEditorSlider: Locator;
  private readonly aliasTxt: Locator;
  private readonly widthTxt: Locator;
  private readonly heightTxt: Locator;
  private readonly addCropBtn: Locator;
  private readonly saveCropBtn: Locator;
  private readonly minimumTxt: Locator;
  private readonly maximumTxt: Locator;
  private readonly stepSizeTxt: Locator;
  private readonly optionTxt: Locator;
  private readonly addOptionBtn: Locator;
  private readonly maximumAllowedCharsTxt: Locator;
  private readonly numberOfRowsTxt: Locator;
  private readonly minHeightTxt: Locator;
  private readonly maxHeightTxt: Locator;
  private readonly acceptedFileExtensionsTxt: Locator;
  private readonly addAcceptedFileExtensionsBtn: Locator;
  private readonly minimumNumberOfItemsTxt: Locator;
  private readonly maximumNumberOfItemsTxt: Locator;
  private readonly ignoreUserStartNodesSlider: Locator;
  private readonly overlaySizeDropDownBox: Locator;
  private readonly hideAnchorQueryStringInputSlider: Locator;
  private readonly pickMultipleItemsSlider: Locator;
  private readonly enableFocalPointSlider: Locator;
  private readonly amountLowValueTxt: Locator;
  private readonly amountHighValueTxt: Locator;
  private readonly toolbarCheckboxes: Locator;
  private readonly addStylesheetBtn: Locator;
  private readonly dimensionsWidthTxt: Locator;
  private readonly dimensionsHeightTxt: Locator;
  private readonly maxImageSizeTxt: Locator;
  private readonly hideLabelSlider: Locator;
  private readonly defineTagGroupTxt: Locator;
  private readonly showOpenButtonSlider: Locator;
  private readonly enableMultipleChoiceSlider: Locator;
  private readonly addOptionsBtn: Locator;
  private readonly initialStateSlider: Locator;
  private readonly showToggleLabelsSlider: Locator;
  private readonly labelOnTxt: Locator;
  private readonly labelOffTxt: Locator;
  private readonly labelTxt: Locator;
  private readonly chooseAcceptedTypesBtn: Locator;
  private readonly chooseWithPlusBtn: Locator;
  private readonly storageTypeDropDownBox: Locator;
  private readonly allowDecimalsSlider: Locator;
  private readonly chooseLayoutsBtn: Locator;
  private readonly columnsDisplayedItems: Locator;
  private readonly layoutsItems: Locator;
  private readonly inlineRadioBtn: Locator;
  private readonly duplicateBtn: Locator;
  private readonly addWithPlusBtn: Locator;
  private readonly selectAPropertyEditorBtn: Locator;
  private readonly typeToFilterTxt: Locator;
  private readonly chooseStartNodeBtn: Locator;
  private readonly addBlockBtn: Locator;
  private readonly minAmountTxt: Locator;
  private readonly maxAmountTxt: Locator;
  private readonly singleBlockModeBtn: Locator;
  private readonly liveEditingModeBtn: Locator;
  private readonly inlineEditingModeBtn: Locator;
  private readonly propertyEditorWidthTxt: Locator;
  private readonly labelTextTxt: Locator;
  private readonly overlaySizeOption: Locator;
  private readonly chooseContentModelBtn: Locator;
  private readonly chooseSettingsModelBtn: Locator;
  private readonly contentModelNode: Locator;
  private readonly settingsModelNode: Locator;
  private readonly removeExactContentModelNodeBtn: Locator;
  private readonly removeExactSettingsModelNodeBtn: Locator;
  private readonly openBtn: Locator;
  private readonly backgroundColorBtn: Locator;
  private readonly backgroundColorTxt: Locator;
  private readonly chooseCustomStylesheetBtn: Locator;
  private readonly iconColorBtn: Locator;
  private readonly iconColorTxt: Locator;
  private readonly stylesheetRemoveBtn: Locator;
  private readonly hideContentEditorBlockGridBtn: Locator;
  private readonly hideContentEditorBlockListBtn: Locator;
  private readonly customStylesheetLabel: Locator;
  private readonly documentTypeWorkspace: Locator;
  private readonly editorWidthTxt: Locator;
  private readonly createButtonLabelTxt: Locator;
  private readonly gridColumnsTxt: Locator;
  private readonly showResizeOptionsBtn: Locator;
  private readonly columnSpanOptions: Locator;
  private readonly areasTabBtn: Locator;
  private readonly availableRowSpansLowValueTxt: Locator;
  private readonly availableRowSpansHighValueTxt: Locator;
  private readonly areaGridColumnsTxt: Locator;
  private readonly addAreaBtn: Locator;
  private readonly blockAreaConfig: Locator;
  private readonly aliasAliasTxt: Locator;
  private readonly blockGridAreaWorkspaceSubmitBtn: Locator;
  private readonly createLabelTxt: Locator;
  private readonly minAllowedTxt: Locator;
  private readonly maxAllowedTxt: Locator;
  private readonly addSpecifiedAllowanceBtn: Locator;
  private readonly advancedTabBtn: Locator;
  private readonly allowBlockAtRootBtn: Locator;
  private readonly allowInAreasBtn: Locator;
  private readonly chooseThumbnailAlias: Locator;
  private readonly expandChildItemsForMediaBtn: Locator;
  private readonly tiptapToolbarConfiguration: Locator;
  private readonly addGroupToolbarBtn: Locator;
  private readonly addRowToolbarBtn: Locator;
  private readonly tiptapExtensionsConfiguration: Locator;
  private readonly propertyEditor: Locator;
  private readonly selectIconBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.moveToBtn = page.locator('umb-entity-action').getByLabel('Move to');
    this.duplicateToBtn = page.locator('umb-entity-action').getByLabel(/^Duplicate to(\.\.\.)?$/);
    this.newDataTypeThreeDotsBtn = page.locator('umb-data-type-create-options-modal').getByLabel('New Data Type...');
    this.dataTypeNameTxt = page.locator('umb-data-type-workspace-editor #nameInput #input');
    this.createDataTypeFolderBtn = page.getByLabel('Create folder');
    this.updateDataTypeFolderBtn = page.getByLabel('Update folder');
    this.ignoreUserStartNodesSlider = page.locator('umb-property[label="Ignore user start nodes"] #slider, umb-property[label="Ignore User Start Nodes"] #slider');
    this.duplicateBtn = this.sidebarModal.getByLabel('Duplicate', {exact: true});
    this.selectAPropertyEditorBtn = page.getByLabel('Select a property editor');
    this.typeToFilterTxt = page.locator('#filter #input');

    // Approved Color
    this.includeLabelsSlider = page.locator('#slider');
    this.addColorBtn = page.getByLabel('Add');
    this.colorValueTxt = page.getByPlaceholder('Value').getByRole('textbox');

    // Date Picker
    this.offsetTimeSlider = page.locator('umb-property[label="Offset time"] #slider');
    this.dateFormatTxt = page.locator('umb-property[label="Date format"] #input');

    // List View
    this.pageSizeTxt = page.locator('umb-property[label="Page Size"] #input');
    this.ascendingRadioBtn = page.locator('uui-radio[label="Ascending [a-z]"] #button');
    this.descendingRadioBtn = page.locator('uui-radio[label="Descending [z-a]"] #button');
    this.chooseColumnsDisplayedBtn = page.locator('umb-property[label="Columns Displayed"]').getByLabel('Choose');
    this.columnsDisplayedItems = page.locator('umb-property[label="Columns Displayed"] .layout-item');
    this.workspaceViewName = page.locator('umb-property[label="Workspace View name"] #input');
    this.showWorkspaceViewFirstSlider = page.locator('umb-property[label="Show Content Workspace View First"] #slider');
    this.editInInfiniteEditorSlider = page.locator('umb-property[label="Edit in Infinite Editor"] #slider');
    this.orderByDropDownBox = page.locator('umb-property[label="Order By"] select');
    this.chooseLayoutsBtn = page.locator('umb-property[label="Layouts"]').getByLabel('Choose');
    this.layoutsItems = page.locator('umb-property[label="Layouts"] .layout-item');

    // Image Cropper
    this.labelTxt = page.getByLabel('Label', {exact: true});
    this.aliasTxt = page.getByLabel('Alias', {exact: true});
    this.widthTxt = page.getByLabel('Width', {exact: true});
    this.heightTxt = page.getByLabel('Height', {exact: true});
    this.addCropBtn = page.getByLabel('Add', {exact: true});
    this.saveCropBtn = page.locator('[alias="crops"]').getByLabel('Save');

    // Numeric
    this.minimumTxt = page.locator('umb-property[label="Minimum"] #input');
    this.maximumTxt = page.locator('umb-property[label="Maximum"] #input');
    this.stepSizeTxt = page.locator('umb-property[label="Step size"] #input');
    this.allowDecimalsSlider = page.locator('umb-property[label="Allow decimals"] #slider');

    // Radiobox
    this.optionTxt = page.locator('umb-property[label="Add option"] #input, umb-property[label="Add options"] #input');
    this.addOptionBtn = page.locator('umb-property[label="Add option"], umb-property[label="Add options"]').getByLabel('Add', {exact: true});

    // Textarea - Textstring
    this.maximumAllowedCharsTxt = page.locator('umb-property[label="Maximum allowed characters"] #input');
    this.numberOfRowsTxt = page.locator('umb-property[label="Number of rows"] #input');
    this.minHeightTxt = page.locator('umb-property[label="Min height (pixels)"] #input');
    this.maxHeightTxt = page.locator('umb-property[label="Max height (pixels)"] #input');

    // Upload
    this.acceptedFileExtensionsTxt = page.locator('umb-property[label="Accepted file extensions"] #input');
    this.addAcceptedFileExtensionsBtn = page.locator('umb-property[label="Accepted file extensions"]').getByLabel('Add', {exact: true});

    // Multi URL Picker
    this.minimumNumberOfItemsTxt = page.locator('umb-property[label="Minimum number of items"] #input');
    this.maximumNumberOfItemsTxt = page.locator('umb-property[label="Maximum number of items"] #input');
    this.overlaySizeDropDownBox = page.locator('umb-property[label="Overlay Size"] select');
    this.hideAnchorQueryStringInputSlider = page.locator('umb-property[label="Hide anchor/query string input"] #slider');

    // Media Picker
    this.pickMultipleItemsSlider = page.locator('umb-property[label="Pick multiple items"] #slider');
    this.enableFocalPointSlider = page.locator('umb-property[label="Enable Focal Point"] #slider');
    this.amountLowValueTxt = page.locator('umb-property[label="Amount"]').getByLabel('Low value');
    this.amountHighValueTxt = page.locator('umb-property[label="Amount"]').getByLabel('High value');
    this.chooseAcceptedTypesBtn = page.locator('umb-property[label="Accepted types"]').getByLabel('Choose');
    this.chooseWithPlusBtn = page.locator('#btn-add').filter({hasText: 'Choose'});
    this.chooseStartNodeBtn = page.locator('umb-property[label="Start node"] #btn-add');

    // Rich Editor
    this.toolbarCheckboxes = page.locator('umb-property[label="Toolbar"] uui-checkbox');
    this.addStylesheetBtn = page.locator('umb-property[label="Stylesheets"]').getByLabel('Add stylesheet');
    this.dimensionsWidthTxt = page.locator('umb-property[label="Dimensions"]').getByLabel('Width');
    this.dimensionsHeightTxt = page.locator('umb-property[label="Dimensions"]').getByLabel('Height');
    this.maxImageSizeTxt = page.locator('umb-property[label="Maximum size for inserted images"] #input');
    this.hideLabelSlider = page.locator('umb-property[label="Hide Label"] #slider');
    this.inlineRadioBtn = page.locator('umb-property[label="Mode"] uui-radio[value="Inline"]');
    this.addWithPlusBtn = page.locator('umb-property[label="Available Blocks"] #add-button');

    // Tags
    this.defineTagGroupTxt = page.locator('umb-property[label="Define a tag group"] #input');
    this.storageTypeDropDownBox = page.locator('#native');

    // Content Picker
    this.showOpenButtonSlider = page.locator('umb-property[label="Show open button"] #slider');

    // Dropdown
    this.enableMultipleChoiceSlider = page.locator('umb-property[label="Enable multiple choice"] #slider');
    this.addOptionsBtn = page.locator('umb-property[label="Add options"]').getByLabel('Add', {exact: true});

    // True/false
    this.initialStateSlider = page.locator('umb-property[label="Initial State"] #slider');
    this.showToggleLabelsSlider = page.locator('umb-property[label="Show toggle labels"] #slider');
    this.labelOnTxt = page.locator('umb-property[label="Label On"] #input');
    this.labelOffTxt = page.locator('umb-property[label="Label Off"] #input');

    // Block List Editor and Block Grid Editor
    this.addBlockBtn = page.locator('umb-input-block-type #blocks').getByLabel('open');
    this.minAmountTxt = page.getByLabel('Low value');
    this.maxAmountTxt = page.getByLabel('High value');
    this.singleBlockModeBtn = this.page.locator('umb-property-layout').filter({hasText: 'Single block mode'}).locator('#slider');
    this.liveEditingModeBtn = this.page.locator('umb-property-layout').filter({hasText: 'Live editing'}).locator('#slider');
    this.inlineEditingModeBtn = this.page.locator('umb-property-layout').filter({hasText: 'Inline editing'}).locator('#slider');
    this.propertyEditorWidthTxt = this.page.locator('umb-property-layout').filter({hasText: 'Property editor width'}).locator('#input');
    this.labelTextTxt = this.page.locator('[label="Label"]').locator('#input');
    this.overlaySizeOption = this.page.locator('[label="Overlay editor size"]').locator('#native');
    this.chooseContentModelBtn = this.page.locator('[alias="contentElementTypeKey"]').getByLabel('Choose');
    this.chooseSettingsModelBtn = this.page.locator('[alias="settingsElementTypeKey"]').getByLabel('Choose');
    this.contentModelNode = this.page.locator('[alias="contentElementTypeKey"]').locator('uui-ref-node-document-type');
    this.settingsModelNode = this.page.locator('[alias="settingsElementTypeKey"]').locator('uui-ref-node-document-type')
    this.removeExactContentModelNodeBtn = this.page.locator('[alias="contentElementTypeKey"]').getByLabel('Remove', {exact: true});
    this.removeExactSettingsModelNodeBtn = this.page.locator('[alias="settingsElementTypeKey"]').getByLabel('Remove', {exact: true});
    this.openBtn = this.page.getByLabel('Open', {exact: true});
    this.backgroundColorBtn = this.page.locator('umb-property-layout').filter({hasText: 'Background color'}).getByLabel('Eye dropper');
    this.backgroundColorTxt = this.page.locator('[label="Background color"]').locator('[label="Eye dropper"]').locator('#input');
    this.iconColorBtn = this.page.locator('umb-property-layout').filter({hasText: 'Icon color'}).getByLabel('Eye dropper');
    this.iconColorTxt = this.page.locator('[label="Icon color"]').locator('[label="Eye dropper"]').locator('#input');
    this.stylesheetRemoveBtn = this.page.locator('uui-ref-node').getByLabel('Remove', {exact: true});
    this.hideContentEditorBlockListBtn = this.page.locator('[alias="forceHideContentEditorInOverlay"]').locator('#slider');
    this.hideContentEditorBlockGridBtn = this.page.locator('[alias="hideContentEditor"]').locator('#slider');
    this.customStylesheetLabel = this.page.locator('[label="Custom stylesheet"]');
    this.chooseThumbnailAlias = this.page.locator('[alias="thumbnail"]').getByLabel('Choose');
    this.documentTypeWorkspace = this.page.locator('umb-document-type-workspace-editor');
    this.editorWidthTxt = this.page.locator('umb-property-layout').filter({hasText: 'Editor width'}).locator('#input');
    this.createButtonLabelTxt = this.page.locator('umb-property-layout').filter({hasText: 'Create button label'}).locator('#input');
    this.gridColumnsTxt = this.page.locator('umb-property-layout').filter({hasText: 'Grid columns'}).locator('#input');
    this.showResizeOptionsBtn = this.page.getByLabel('Show resize options');
    this.columnSpanOptions = this.page.locator('[alias="columnSpanOptions"]');
    this.areasTabBtn = this.page.getByRole('tab', {name: 'Areas'});
    this.availableRowSpansLowValueTxt = this.page.locator('[label="Available row spans"]').getByLabel('Low value');
    this.availableRowSpansHighValueTxt = this.page.locator('[label="Available row spans"]').getByLabel('High value');
    this.areaGridColumnsTxt = this.page.locator('[alias="areaGridColumns"]').locator('#input');
    this.addAreaBtn = this.page.getByLabel('Add area');
    this.blockAreaConfig = this.page.locator('umb-block-area-config-entry');
    this.aliasAliasTxt = this.page.locator('[alias="alias"]').locator('#input');
    this.blockGridAreaWorkspaceSubmitBtn = this.page.locator('umb-block-grid-area-type-workspace-editor').getByLabel('Submit');
    this.createLabelTxt = this.page.locator('[alias="createLabel"]').locator('#input');
    this.minAllowedTxt = this.page.locator('#container').getByLabel('Low value');
    this.maxAllowedTxt = this.page.locator('#container').getByLabel('High value');
    this.addSpecifiedAllowanceBtn = this.page.locator('[alias="specifiedAllowance"]').getByLabel('Add');
    this.advancedTabBtn = this.page.getByRole('tab', {name: 'Advanced'});
    this.allowBlockAtRootBtn = this.page.locator('[alias="allowAtRoot"]');
    this.allowInAreasBtn = this.page.locator('[alias="allowInAreas"]');
    this.expandChildItemsForMediaBtn = this.page.getByLabel('Expand child items for media', {exact: true});
    this.chooseCustomStylesheetBtn = this.page.locator('[label="Custom stylesheet"]').getByLabel('Choose');

    // Tiptap
    this.tiptapToolbarConfiguration = this.page.locator('umb-property-editor-ui-tiptap-toolbar-configuration');
    this.addGroupToolbarBtn = this.tiptapToolbarConfiguration.locator('uui-button').filter({hasText: 'Add group'});
    this.addRowToolbarBtn = this.tiptapToolbarConfiguration.locator('uui-button').filter({hasText: 'Add row'});
    this.tiptapExtensionsConfiguration = this.page.locator('umb-property-editor-ui-tiptap-extensions-configuration');
    this.propertyEditor = this.page.locator('umb-ref-property-editor-ui');
    this.selectIconBtn = page.getByLabel('Select icon');
  }

  async clickActionsMenuForDataType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForDataType('Data Types');
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName('Data Types');
  }

  async goToDataType(dataTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(dataTypeName, {exact: true}).click();
  }

  async clickMoveToButton() {
    await expect(this.moveToBtn).toBeVisible();
    await this.moveToBtn.click();
  }

  async clickDuplicateToButton() {
    await expect(this.duplicateToBtn).toBeVisible();
    await this.duplicateToBtn.click();
  }

  async clickNewDataTypeThreeDotsButton() {
    await this.newDataTypeThreeDotsBtn.click();
  }

  async clickNewDataTypeFolderButton() {
    await this.newFolderThreeDotsBtn.click();
  }

  async enterDataTypeName(name: string) {
    await this.dataTypeNameTxt.click();
    await this.dataTypeNameTxt.clear();
    await this.dataTypeNameTxt.fill(name);
  }

  async clickCreateFolderButton() {
    await this.createDataTypeFolderBtn.click();
  }

  async clickUpdateFolderButton() {
    await this.updateDataTypeFolderBtn.click();
  }

  async deleteDataType(name: string) {
    await this.clickActionsMenuForDataType(name);
    await this.clickDeleteAndConfirmButton();
  }

  async deleteDataTypeFolder(folderName: string) {
    await this.clickActionsMenuForDataType(folderName);
    await this.deleteFolder();
  }

  async moveDataTypeToFolder(folderName: string) {
    await this.clickMoveToButton();
    await expect(this.modalCaretBtn).toBeVisible();
    await this.modalCaretBtn.click();
    await this.sidebarModal.getByText(folderName, {exact: true}).click();
    await this.chooseModalBtn.click();
  }

  async duplicateDataTypeToFolder(folderName: string) {
    await this.clickDuplicateToButton();
    await expect(this.modalCaretBtn).toBeVisible();
    await this.modalCaretBtn.click();
    await this.sidebarModal.getByText(folderName, {exact: true}).click();
    await this.duplicateBtn.click();
  }

  async addMediaStartNode(mediaName: string) {
    await this.mediaCardItems.filter({hasText: mediaName}).click();
    await this.clickSubmitButton();
  }

  async addContentStartNode(contentName: string) {
    await this.clickTextButtonWithName(contentName);
    await this.chooseModalBtn.click();
  }

  async clickSelectAPropertyEditorButton() {
    await this.selectAPropertyEditorBtn.click();
  }

  async selectAPropertyEditor(propertyName: string, filterKeyword?: string) {
    await this.typeToFilterTxt.fill(filterKeyword ? filterKeyword : propertyName);
    await this.clickTextButtonWithName(propertyName);
  }

  // Approved Color
  async clickIncludeLabelsSlider() {
    await this.includeLabelsSlider.click();
  }

  async removeColorByValue(value: string) {
    await this.page.locator('[value="' + value + '"] uui-button svg').click();
    await this.confirmToDeleteBtn.click();
  }

  async addColor(value: string) {
    await this.addColorBtn.click();
    await this.colorValueTxt.clear();
    await this.colorValueTxt.fill(value);
  }

  // Label
  async changeValueType(valueType: string) {
    await this.page.getByLabel('Select a value type').selectOption({label: valueType});
  }

  // Date Picker
  async clickOffsetTimeSlider() {
    await this.offsetTimeSlider.click();
  }

  async enterDateFormatValue(value: string) {
    await this.dateFormatTxt.clear();
    await this.dateFormatTxt.fill(value);
  }

  // List View
  async enterPageSizeValue(value: string) {
    await this.pageSizeTxt.clear();
    await this.pageSizeTxt.fill(value);
  }

  async chooseOrderDirection(isAscending: boolean) {
    if (isAscending) {
      await this.ascendingRadioBtn.click();
    } else {
      await this.descendingRadioBtn.click();
    }
  }

  async addColumnDisplayed(contentType: string, contentName: string, propertyAlias: string) {
    await this.chooseColumnsDisplayedBtn.click();
    await this.clickTextButtonWithName(contentType);
    await this.clickTextButtonWithName(contentName);
    await this.clickChooseContainerButton();
    await this.clickTextButtonWithName(propertyAlias);
  }

  async removeColumnDisplayed(propertyAlias: string) {
    await this.columnsDisplayedItems.filter({has: this.page.getByText(propertyAlias, {exact: true})}).getByText('Remove').click();
  }

  async addLayouts(layoutName: string) {
    await this.chooseLayoutsBtn.click();
    await this.page.locator('[name="' + layoutName + '"]').click();
  }

  async removeLayouts(layoutAlias: string) {
    await this.layoutsItems.filter({has: this.page.getByText(layoutAlias, {exact: true})}).getByText('Remove').click();
  }

  async chooseOrderByValue(value: string) {
    await this.orderByDropDownBox.selectOption({label: value});
  }

  async enterWorkspaceViewName(name: string) {
    await this.workspaceViewName.clear();
    await this.workspaceViewName.fill(name);
  }

  async clickShowContentWorkspaceViewFirstSlider() {
    await this.showWorkspaceViewFirstSlider.click();
  }

  async clickEditInInfiniteEditorSlider() {
    await this.editInInfiniteEditorSlider.click();
  }

  async clickBulkActionPermissionsSliderByValue(value: string) {
    await this.page.locator("uui-toggle[label='" + value + "'] #slider").click();
  }

  async clickSelectIconButton() {
    await this.selectIconBtn.click({force: true});
  }

  async chooseWorkspaceViewIconByValue(value: string) {
    await this.page.locator('[label="' + value + '"] svg').click();
    await this.submitBtn.click();
  }

  // Image Cropper
  async enterCropValues(label: string, alias: string, width: string, height: string) {
    await this.labelTxt.clear();
    await this.labelTxt.fill(label);
    await this.aliasTxt.clear();
    await this.aliasTxt.fill(alias);
    await this.widthTxt.clear();
    await this.widthTxt.fill(width);
    await this.heightTxt.clear();
    await this.heightTxt.fill(height);
  }

  async clickAddCropButton() {
    await this.addCropBtn.click();
  }

  async clickSaveCropButton() {
    await this.saveCropBtn.click();
  }

  async editCropByAlias(alias: string) {
    await this.page.locator('.crop').filter({has: this.page.getByText(alias)}).getByText('Edit').click();
  }

  async removeCropByAlias(alias: string) {
    await this.page.locator('.crop').filter({has: this.page.getByText(alias)}).getByText('Remove').click();
  }

  // Numeric
  async enterMinimumValue(value: string) {
    await this.minimumTxt.clear();
    await this.minimumTxt.fill(value);
  }

  async enterMaximumValue(value: string) {
    await this.maximumTxt.clear();
    await this.maximumTxt.fill(value);
  }

  async enterStepSizeValue(value: string) {
    await this.stepSizeTxt.clear();
    await this.stepSizeTxt.fill(value);
  }

  async clickAllowDecimalsSlider() {
    await this.allowDecimalsSlider.click();
  }

  // Radiobox
  async removeOptionByName(name: string) {
    await this.page.locator("uui-button[label='Remove " + name + "'] svg").click();
    await this.confirmToDeleteBtn.click();
  }

  async enterOptionName(name: string) {
    await this.optionTxt.last().clear();
    await this.optionTxt.last().fill(name);
  }

  async clickAddOptionButton() {
    await this.addOptionBtn.click();
  }

  // Textarea - Textstring
  async enterMaximumAllowedCharactersValue(value: string) {
    await this.maximumAllowedCharsTxt.clear();
    await this.maximumAllowedCharsTxt.fill(value);
  }

  async enterNumberOfRowsValue(value: string) {
    await this.numberOfRowsTxt.clear();
    await this.numberOfRowsTxt.fill(value);
  }

  async enterMaxHeightValue(value: string) {
    await this.maxHeightTxt.clear();
    await this.maxHeightTxt.fill(value);
  }

  async enterMinHeightValue(value: string) {
    await this.minHeightTxt.clear();
    await this.minHeightTxt.fill(value);
  }

  // Upload
  async enterAcceptedFileExtensions(value: string) {
    await this.acceptedFileExtensionsTxt.last().clear();
    await this.acceptedFileExtensionsTxt.last().fill(value);
  }

  async removeAcceptedFileExtensionsByValue(value: string) {
    await this.page.locator("uui-button[label='Remove " + value + "'] svg").click();
    await this.confirmToDeleteBtn.click();
  }

  async clickAddAcceptedFileExtensionsButton() {
    await this.addAcceptedFileExtensionsBtn.click();
  }

  // Multi URL Picker
  async enterMinimumNumberOfItemsValue(value: string) {
    await this.minimumNumberOfItemsTxt.clear();
    await this.minimumNumberOfItemsTxt.fill(value);
  }

  async enterMaximumNumberOfItemsValue(value: string) {
    await this.maximumNumberOfItemsTxt.clear();
    await this.maximumNumberOfItemsTxt.fill(value);
  }

  async clickIgnoreUserStartNodesSlider() {
    await this.ignoreUserStartNodesSlider.click();
  }

  async chooseOverlaySizeByValue(value: string) {
    await this.overlaySizeDropDownBox.selectOption({value: value});
  }

  async clickHideAnchorQueryStringInputSlider() {
    await this.hideAnchorQueryStringInputSlider.click();
  }

  // Media Picker
  async clickPickMultipleItemsSlider() {
    await this.pickMultipleItemsSlider.click();
  }

  async clickEnableFocalPointSlider() {
    await this.enableFocalPointSlider.click();
  }

  async enterAmountValue(lowValue: string, highValue: string) {
    await this.amountLowValueTxt.clear();
    await this.amountLowValueTxt.fill(lowValue);
    await this.amountHighValueTxt.clear();
    await this.amountHighValueTxt.fill(highValue);
  }

  async addAcceptedType(mediaTypeName: string) {
    await this.chooseAcceptedTypesBtn.click();
    await this.clickTextButtonWithName(mediaTypeName);
    await this.chooseModalBtn.click();
  }

  async removeAcceptedType(mediaTypeName: string) {
    await this.page.locator('uui-ref-node-document-type[name="' + mediaTypeName + '"]').getByLabel('Remove').click();
    await this.confirmToRemoveBtn.click();
  }

  async removeMediaStartNode(mediaName: string) {
    await this.page.locator('uui-card-media[name="' + mediaName + '"]').locator('[label="Remove"]').click();
    await this.confirmToRemoveBtn.click();
  }

  async clickChooseStartNodeButton() {
    await this.chooseStartNodeBtn.click();
  }

  // Richtext Editor
  async clickToolbarOptionByValue(values) {
    for (var index in values) {
      await this.toolbarCheckboxes.filter({has: this.page.getByLabel(values[index])}).locator('#ticker svg').click();
    }
  }

  async addStylesheet(stylesheetName: string) {
    await this.addStylesheetBtn.click();
    await this.page.getByLabel(stylesheetName).click();
    await this.chooseModalBtn.click();
  }

  async enterDimensionsValue(width: string, height: string) {
    await this.dimensionsWidthTxt.clear();
    await this.dimensionsWidthTxt.fill(width);
    await this.dimensionsHeightTxt.clear();
    await this.dimensionsHeightTxt.fill(height);
  }

  async enterMaximumSizeForImages(value: string) {
    await this.maxImageSizeTxt.clear();
    await this.maxImageSizeTxt.fill(value);
  }

  async clickHideLabelSlider() {
    await this.hideLabelSlider.click();
  }

  async clickInlineRadioButton() {
    await this.inlineRadioBtn.click();
  }

  async clickChooseWithPlusButton() {
    await this.chooseWithPlusBtn.click();
  }

  async addImageUploadFolder(mediaFolderName: string) {
    await this.clickChooseWithPlusButton();
    // Need to click at a specific position to avoid opening the media folder
    await this.mediaCardItems.filter({hasText: mediaFolderName}).click({position: {x: 0.5, y: 0.5}})
    await this.clickSubmitButton();
  }

  async clickAddWithPlusButton() {
    await this.addWithPlusBtn.click();
  }

  async addAvailableBlocks(blockName: string) {
    await this.clickAddWithPlusButton();
    await this.clickTextButtonWithName(blockName);
    await this.chooseModalBtn.click();
    await this.clickSubmitButton();
  }

  // Tags
  async enterDefineTagGroupValue(value: string) {
    await this.defineTagGroupTxt.clear();
    await this.defineTagGroupTxt.fill(value);
  }

  async selectStorageTypeOption(option: string) {
    await this.storageTypeDropDownBox.selectOption({label: option});
  }

  // Content Picker
  async clickShowOpenButtonSlider() {
    await this.showOpenButtonSlider.click();
  }

  async removeContentStartNode(contentName: string) {
    await this.page.locator('[name="' + contentName + '"] uui-button').getByLabel('Remove').click();
    await this.confirmToRemoveBtn.click();
  }

  // Dropdown
  async clickEnableMultipleChoiceSlider() {
    await this.enableMultipleChoiceSlider.click();
  }

  async clickAddOptionsButton() {
    await this.addOptionsBtn.click();
  }

  // True/false
  async clickInitialStateSlider() {
    await this.initialStateSlider.click();
  }

  async clickShowToggleLabelsSlider() {
    await this.showToggleLabelsSlider.click();
  }

  async enterLabelOnValue(value: string) {
    await this.labelOnTxt.clear();
    await this.labelOnTxt.fill(value);
  }

  async enterLabelOffValue(value: string) {
    await this.labelOffTxt.clear();
    await this.labelOffTxt.fill(value);
  }

  // Block List Editor
  async clickAddBlockButton(index: number = 0) {
    await this.addBlockBtn.nth(index).click({force: true});
  }

  async clickRemoveBlockWithName(name: string) {
    await this.page.locator('umb-block-type-card', {hasText: name}).getByLabel('Remove block').click({force: true});
  }

  async enterMinAmount(value: string) {
    await this.minAmountTxt.clear();
    await this.minAmountTxt.fill(value);
  }

  async enterMaxAmount(value: string) {
    await this.maxAmountTxt.clear();
    await this.maxAmountTxt.fill(value);
  }

  async doesAmountContainErrorMessageWithText(errorMessage: string) {
    return await expect(this.page.getByText(errorMessage)).toBeVisible();
  }

  async clickSingleBlockMode() {
    // We need to wait, otherwise this would be flaky
    await this.singleBlockModeBtn.waitFor();
    await this.singleBlockModeBtn.click();
  }

  async clickLiveEditingMode() {
    await this.liveEditingModeBtn.click();
  }

  async clickInlineEditingMode() {
    await this.inlineEditingModeBtn.click();
  }

  async enterPropertyEditorWidth(width: string) {
    await this.propertyEditorWidthTxt.clear();
    await this.propertyEditorWidthTxt.fill(width);
  }

  async goToBlockWithName(name: string) {
    await this.page.getByRole('link', {name: name}).click();
  }

  async enterBlockLabelText(label: string) {
    await this.labelTextTxt.clear();
    await this.labelTextTxt.fill(label);
  }

  async removeBlockLabelText() {
    await this.labelTextTxt.clear();
  }

  async clickAllowInRootForBlock() {
    await this.allowBlockAtRootBtn.click();
  }

  async clickAllowInAreasForBlock() {
    await this.allowInAreasBtn.click();
  }

  async updateBlockOverlaySize(size: string) {
    await this.overlaySizeOption.selectOption(size);
  }

  async addBlockContentModel(elementName: string) {
    await this.chooseContentModelBtn.click();
    await this.clickButtonWithName(elementName);
    await this.clickChooseButton();
  }

  async addBlockSettingsModel(elementName: string) {
    await this.chooseSettingsModelBtn.click();
    await this.clickButtonWithName(elementName);
    await this.clickChooseModalButton();
  }

  async removeBlockContentModel() {
    await this.contentModelNode.hover();
    await this.removeExactContentModelNodeBtn.click();
  }

  async removeBlockSettingsModel() {
    await this.settingsModelNode.hover();
    await this.removeExactSettingsModelNodeBtn.click();
  }

  async openBlockContentModel() {
    await this.contentModelNode.hover();
    await this.openBtn.click();
  }

  async openBlockSettingsModel() {
    await this.settingsModelNode.hover();
    await this.openBtn.click();
  }

  async isElementWorkspaceOpenInBlock(elementTypeName: string) {
    return await expect(this.documentTypeWorkspace.filter({hasText: elementTypeName})).toBeVisible();
  }

  async selectBlockBackgroundColor(color: string) {
    await this.backgroundColorBtn.click();
    await this.backgroundColorTxt.clear();
    await this.backgroundColorTxt.fill(color);
  }

  async selectBlockIconColor(color: string) {
    await this.iconColorBtn.click();
    await this.iconColorTxt.clear();
    await this.iconColorTxt.fill(color);
  }

  async clickExpandChildItemsForMediaButton() {
    await this.expandChildItemsForMediaBtn.click();
  }

  async clickRemoveCustomStylesheetWithName(name: string) {
    await this.customStylesheetLabel.locator('[name="' + name + '"]').click();
    await this.stylesheetRemoveBtn.click();
    await this.clickConfirmRemoveButton();
  }

  async clickBlockGridHideContentEditorButton() {
    await this.hideContentEditorBlockGridBtn.click();
  }

  async chooseBlockCustomStylesheetWithName(name: string) {
    await this.chooseCustomStylesheetBtn.click();
    await this.clickCaretButtonForName('wwwroot');
    await this.clickCaretButtonForName('css');
    await this.page.getByLabel(name, {exact: true}).click();
    await this.clickChooseModalButton();
  }

  async chooseBlockThumbnailWithPath(name: string, mediaPath: string) {
    await this.chooseThumbnailAlias.click();
    await this.clickCaretButtonForName('wwwroot');
    await this.clickExpandChildItemsForMediaButton();
    await this.page.locator('uui-menu-item[label="' + mediaPath + '"] #caret-button').click();
    await this.page.getByLabel(name, {exact: true}).click();
    await this.clickChooseModalButton();
  }

  async clickBlockListHideContentEditorButton() {
    await this.hideContentEditorBlockListBtn.click();
  }

  async enterEditorWidth(value: string) {
    await this.editorWidthTxt.clear();
    await this.editorWidthTxt.fill(value);
  }

  async enterCreateButtonLabel(value: string) {
    await this.createButtonLabelTxt.clear();
    await this.createButtonLabelTxt.fill(value);
  }

  async enterGridColumns(value: number) {
    await this.gridColumnsTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.gridColumnsTxt.fill(value.toString());
  }

  async clickShowResizeOptions() {
    await this.showResizeOptionsBtn.click();
  }

  async clickAvailableColumnSpans(columnSpans: number[]) {
    for (let index in columnSpans) {
      await this.columnSpanOptions.getByLabel(columnSpans[index].toString(), {exact: true}).click();
    }
  }

  async goToBlockAreasTab() {
    await this.areasTabBtn.click();
  }

  async enterMinRowSpan(value: number) {
    await this.availableRowSpansLowValueTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.availableRowSpansLowValueTxt.fill(value.toString());
  }

  async enterMaxRowSpan(value: number) {
    await this.availableRowSpansHighValueTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.availableRowSpansHighValueTxt.fill(value.toString());
  }

  async enterGridColumnsForArea(value: number) {
    await this.areaGridColumnsTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.areaGridColumnsTxt.fill(value.toString());
  }

  async addAreaButton() {
    await this.addAreaBtn.click();
  }

  async goToAreaByAlias(alias: string) {
    await this.blockAreaConfig.filter({hasText: alias}).getByLabel('edit').click({force: true});
  }

  async clickRemoveAreaByAlias(alias: string) {
    await this.blockAreaConfig.filter({hasText: alias}).getByLabel('delete').click({force: true});
    await this.clickConfirmToDeleteButton();
  }

  async enterAreaAlias(alias: string) {
    await this.aliasAliasTxt.clear();
    await this.aliasAliasTxt.fill(alias);
  }

  async clickAreaSubmitButton() {
    await this.blockGridAreaWorkspaceSubmitBtn.click();
    await this.page.waitForTimeout(500);
  }

  async enterCreateButtonLabelInArea(value: string) {
    await this.createLabelTxt.nth(1).clear();
    if (value === undefined) {
      return;
    }
    await this.createLabelTxt.nth(1).fill(value);
  }

  async enterMinAllowedInArea(value: number) {
    await this.minAllowedTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.minAllowedTxt.fill(value.toString());
  }

  async enterMaxAllowedInArea(value: number) {
    await this.maxAllowedTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.maxAllowedTxt.fill(value.toString());
  }

  async clickAddSpecifiedAllowanceButton() {
    await this.addSpecifiedAllowanceBtn.click();
  }

  async goToBlockAdvancedTab() {
    await this.advancedTabBtn.click();
  }

  async getLinkWithName(name: string) {
    return this.page.getByRole('link', {name: name});
  }

  async getAddButtonInGroupWithName(name: string) {
    return this.page.locator('.group').filter({hasText: name}).locator('#add-button');
  }

  // Tiptap
  async deleteToolbarGroup(groupIndex: number, rowIndex: number = 0) {
    const groupButton = this.tiptapToolbarConfiguration.locator('.row').nth(rowIndex).locator('.group').nth(groupIndex);
    await groupButton.hover();
    await groupButton.locator('[label="Remove group"]').click();
  }

  async deleteToolbarRow(rowIndex: number) {
    const rowButton = this.tiptapToolbarConfiguration.locator('.row').nth(rowIndex);
    await rowButton.hover();
    await rowButton.locator('[label="Remove group"]').click();
  }

  async clickAddRowToolbarButton() {
    await this.addRowToolbarBtn.click();
  }

  async clickAddGroupToolbarButton() {
    await this.addGroupToolbarBtn.click();
  }

  async clickExtensionItemWithName(name: string) {
    await this.tiptapExtensionsConfiguration.locator('uui-checkbox[label="' + name + '"]').click();
  }

  async doesPropertyEditorHaveAlias(alias: string) {
    await expect(this.propertyEditor).toHaveAttribute('alias', alias);
  }

  async doesPropertyEditorHaveName(name: string) {
    await expect(this.propertyEditor).toHaveAttribute('name', name);
  }

  async doesPropertyEditorHaveSchemaAlias(schemaAlias: string) {
    await expect(this.propertyEditor).toHaveAttribute('property-editor-schema-alias', schemaAlias);
  }
}