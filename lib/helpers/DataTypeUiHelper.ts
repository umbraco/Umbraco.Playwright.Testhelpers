import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class DataTypeUiHelper extends UiBaseLocators {
  private readonly moveToBtn: Locator;
  private readonly duplicateToBtn: Locator;
  private readonly newDataTypeThreeDotsBtn: Locator;
  private readonly dataTypeNameTxt: Locator;
  private readonly selectBtn: Locator;
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
  private readonly contentAppNameTxt: Locator;
  private readonly orderByDropDownBox: Locator;
  private readonly showContentAppFirstSlider: Locator;
  private readonly editInInfiniteEditorSlider: Locator;
  private readonly contentAppIconBtn: Locator;
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
  
  constructor(page: Page) {
    super(page);
    this.moveToBtn = page.locator('umb-entity-action').getByLabel('Move to');
    this.duplicateToBtn = page.locator('umb-entity-action').getByLabel('Duplicate to');
    this.newDataTypeThreeDotsBtn = page.locator('umb-data-type-create-options-modal').getByLabel('New Data Type...');
    this.dataTypeNameTxt = page.locator('umb-data-type-workspace-editor #nameInput #input');
    this.selectBtn = page.locator('umb-property-editor-ui-picker-modal').getByLabel('Select');
    this.createDataTypeFolderBtn = page.getByLabel('Create Folder');
    this.updateDataTypeFolderBtn = page.getByLabel('Update Folder');
    this.ignoreUserStartNodesSlider = page.locator('umb-property-layout[label="Ignore user start nodes"] #slider, umb-property-layout[label="Ignore User Start Nodes"] #slider');
    this.duplicateBtn = page.locator('uui-modal-sidebar').getByLabel('Duplicate', {exact: true});

    // Approved Color
    this.includeLabelsSlider = page.locator('#slider');
    this.addColorBtn = page.getByLabel('Add');
    this.colorValueTxt = page.getByPlaceholder('Value').getByRole('textbox');

    // Date Picker
    this.offsetTimeSlider = page.locator('umb-property-layout[label="Offset time"] #slider');
    this.dateFormatTxt = page.locator('umb-property-layout[label="Date format"] #input');

    // List View
    this.pageSizeTxt = page.locator('umb-property-layout[label="Page Size"] #input');
    this.ascendingRadioBtn = page.locator('uui-radio[label="Ascending [a-z]"] #button');
    this.descendingRadioBtn = page.locator('uui-radio[label="Descending [z-a]"] #button');
    this.chooseColumnsDisplayedBtn = page.locator('umb-property-layout[label="Columns Displayed"]').getByLabel('Choose');
    this.columnsDisplayedItems = page.locator('umb-property-layout[label="Columns Displayed"] .layout-item');
    this.contentAppNameTxt = page.locator('umb-property-layout[label="Content app name"] #input');
    this.showContentAppFirstSlider = page.locator('umb-property-layout[label="Show Content App First"] #slider');
    this.editInInfiniteEditorSlider = page.locator('umb-property-layout[label="Edit in Infinite Editor"] #slider');
    this.contentAppIconBtn = page.locator('umb-property-layout[label="Content app icon"] uui-icon');
    this.orderByDropDownBox = page.locator('umb-property-layout[label="Order By"] select');
    this.chooseLayoutsBtn = page.locator('umb-property-layout[label="Layouts"]').getByLabel('Choose');
    this.layoutsItems = page.locator('umb-property-layout[label="Layouts"] .layout-item');

    // Image Cropper
    this.labelTxt = page.getByLabel('Label', {exact: true});
    this.aliasTxt = page.getByLabel('Alias', {exact: true});
    this.widthTxt = page.getByLabel('Width', {exact: true});
    this.heightTxt = page.getByLabel('Height', {exact: true});
    this.addCropBtn = page.getByLabel('Add', {exact: true});
    this.saveCropBtn = page.locator('umb-property-editor-ui-image-crops-configuration').getByLabel('Save', {exact: true});

    // Numeric
    this.minimumTxt = page.locator('umb-property-layout[label="Minimum"] #input');
    this.maximumTxt = page.locator('umb-property-layout[label="Maximum"] #input');
    this.stepSizeTxt = page.locator('umb-property-layout[label="Step size"] #input');
    this.allowDecimalsSlider = page.locator('umb-property-layout[label="Allow decimals"] #slider');

    // Radiobox
    this.optionTxt = page.locator('umb-property-layout[label="Add option"] #input, umb-property-layout[label="Add options"] #input');
    this.addOptionBtn = page.locator('umb-property-layout[label="Add option"], umb-property-layout[label="Add options"]').getByLabel('Add', {exact: true});

    // Textarea - Textstring
    this.maximumAllowedCharsTxt = page.locator('umb-property-layout[label="Maximum allowed characters"] #input');  
    this.numberOfRowsTxt = page.locator('umb-property-layout[label="Number of rows"] #input'); 
    this.minHeightTxt = page.locator('umb-property-layout[label="Min height (pixels)"] #input'); 
    this.maxHeightTxt = page.locator('umb-property-layout[label="Max height (pixels)"] #input');    

    // Upload
    this.acceptedFileExtensionsTxt = page.locator('umb-property-layout[label="Accepted file extensions"] #input');
    this.addAcceptedFileExtensionsBtn = page.locator('umb-property-layout[label="Accepted file extensions"]').getByLabel('Add', {exact: true});

    // Multi URL Picker
    this.minimumNumberOfItemsTxt = page.locator('umb-property-layout[label="Minimum number of items"] #input'); 
    this.maximumNumberOfItemsTxt = page.locator('umb-property-layout[label="Maximum number of items"] #input');
    this.overlaySizeDropDownBox = page.locator('umb-property-layout[label="Overlay Size"] select');
    this.hideAnchorQueryStringInputSlider = page.locator('umb-property-layout[label="Hide anchor/query string input"] #slider');

    // Media Picker
    this.pickMultipleItemsSlider = page.locator('umb-property-layout[label="Pick multiple items"] #slider');
    this.enableFocalPointSlider = page.locator('umb-property-layout[label="Enable Focal Point"] #slider');
    this.amountLowValueTxt = page.locator('umb-property-layout[label="Amount"]').getByLabel('Low value');
    this.amountHighValueTxt = page.locator('umb-property-layout[label="Amount"]').getByLabel('High value');
    this.chooseAcceptedTypesBtn = page.locator('#btn-add').getByLabel('Choose');
    this.chooseWithPlusBtn = page.locator('#add-button').filter({hasText: 'Choose'});
    
    // Rich Editor
    this.toolbarCheckboxes = page.locator('umb-property-layout[label="Toolbar"] uui-checkbox');
    this.addStylesheetBtn = page.locator('umb-property-layout[label="Stylesheets"] #add-button');
    this.dimensionsWidthTxt = page.locator('umb-property-layout[label="Dimensions"]').getByLabel('Width');
    this.dimensionsHeightTxt = page.locator('umb-property-layout[label="Dimensions"]').getByLabel('Height');
    this.maxImageSizeTxt = page.locator('umb-property-layout[label="Maximum size for inserted images"] #input');
    this.hideLabelSlider = page.locator('umb-property-layout[label="Hide Label"] #slider');
    this.inlineRadioBtn = page.locator('umb-property-layout[label="Mode"] uui-radio[value="Inline"]');

    // Tags
    this.defineTagGroupTxt = page.locator('umb-property-layout[label="Define a tag group"] #input');
    this.storageTypeDropDownBox = page.locator('#native');

    // Content Picker
    this.showOpenButtonSlider = page.locator('umb-property-layout[label="Show open button"] #slider');

    // Dropdown
    this.enableMultipleChoiceSlider = page.locator('umb-property-layout[label="Enable multiple choice"] #slider');
    this.addOptionsBtn = page.locator('umb-property-layout[label="Add options"]').getByLabel('Add', {exact: true});

    // True/false
    this.initialStateSlider = page.locator('umb-property-layout[label="Initial State"] #slider');
    this.showToggleLabelsSlider = page.locator('umb-property-layout[label="Show toggle labels"] #slider');
    this.labelOnTxt = page.locator('umb-property-layout[label="Label On"] #input');
    this.labelOffTxt = page.locator('umb-property-layout[label="Label Off"] #input');
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
    await this.page.getByLabel(dataTypeName, {exact: true}).click({force: true});
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

  async selectPropertyEditorUIByName(name: string) {
    await this.page.locator('umb-property-editor-ui-picker-modal').getByText(name).click();
    await this.selectBtn.click();
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
    await this.page.locator('uui-modal-sidebar').getByText(folderName, {exact: true}).click();
    await this.chooseModalBtn.click();
  }

  async duplicateDataTypeToFolder(folderName: string) {
    await this.clickDuplicateToButton();
    await expect(this.modalCaretBtn).toBeVisible();
    await this.modalCaretBtn.click();
    await this.page.locator('uui-modal-sidebar').getByText(folderName, {exact: true}).click();
    await this.duplicateBtn.click();
  }

  async addStartNode(startNodeName: string) {
    await this.clickTextButtonWithName(startNodeName);
    await this.chooseModalBtn.click();
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
    await this.clickTextButtonWithName(propertyAlias);
  }

  async removeColumnDisplayed(propertyAlias: string) {
    await this.columnsDisplayedItems.filter({has: this.page.getByText(propertyAlias, {exact: true})}).getByText('Remove').click();
  }

  async addLayouts(layoutAlias: string) {
    await this.chooseLayoutsBtn.click();
    await this.clickTextButtonWithName(layoutAlias);
  }

  async removeLayouts(layoutAlias: string) {
    await this.layoutsItems.filter({has: this.page.getByText(layoutAlias, {exact: true})}).getByText('Remove').click();
  }

  async chooseOrderByValue(value: string) {
    await this.orderByDropDownBox.selectOption({ label: value });
  }

  async enterContentAppName(name: string) {
    await this.contentAppNameTxt.clear();
    await this.contentAppNameTxt.fill(name);
  }

  async clickShowContentAppFirstSlider() {
    await this.showContentAppFirstSlider.click();
  }

  async clickEditInInfiniteEditorSlider() {
    await this.editInInfiniteEditorSlider.click();
  }

  async clickBulkActionPermissionsSliderByValue(value: string) {
    await this.page.locator("uui-toggle[label='" + value + "'] #slider").click();
  }

  async clickContentAppIconButton() {
    await this.contentAppIconBtn.click();
  }

  async chooseContentAppIconByValue(value: string) {
    await this.page.getByLabel(value).getByRole('img').click();
    await this.submitBtn.click();
  }

  // Image Cropper
  async enterCropValues(label:string, alias: string, width: string, height: string) {
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
    await this.page.locator("uui-button[label='Delete " + name + "'] svg").click();
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
    await this.page.locator("uui-button[label='Delete " + value + "'] svg").click();
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
    await this.overlaySizeDropDownBox.selectOption({ value: value });
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
    await this.page.locator('uui-ref-node-document-type[name="' + mediaTypeName + '"]').getByLabel('Remove ' + mediaTypeName).click();
    await this.confirmToRemoveBtn.click();
  }

  async clickChooseWithPlusButton() {
    await this.chooseWithPlusBtn.click();
  }

  async removeMediaStartNode(mediaName: string) {
    await this.page.locator('uui-card-media[name="' + mediaName + '"]').locator('[label="Remove media ' + mediaName + '"]').click();
    await this.confirmToRemoveBtn.click();
  }

  // Richtext Editor
  async pickTheToolbarOptionByValue(values) {
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

  async addImageUploadFolder(mediaFolderName: string) {
    await this.clickChooseWithPlusButton();
    await this.clickTextButtonWithName(mediaFolderName);
    await this.chooseModalBtn.click();
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
}
