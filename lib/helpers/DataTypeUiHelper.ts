import {Page, Locator} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class DataTypeUiHelper extends UiBaseLocators {
  private readonly deleteFolderThreeDotsBtn: Locator;
  private readonly renameFolderThreeDotsBtn: Locator;
  private readonly deleteThreeDotsBtn: Locator;
  private readonly moveToThreeDotsBtn: Locator;
  private readonly copyToThreeDotsBtn: Locator;
  private readonly newDataTypeThreeDotsBtn: Locator;
  private readonly dataTypeNameTxt: Locator;
  private readonly selectPropertyEditorBtn: Locator;
  private readonly selectBtn: Locator;
  private readonly createDataTypeFolderBtn: Locator;
  private readonly updateDataTypeFolderBtn: Locator;
  private readonly changeBtn: Locator;
  private readonly includeLabelsSlider: Locator;
  private readonly addColorBtn: Locator;
  private readonly colorValueTxt: Locator;
  private readonly colorLabelTxt: Locator;
  private readonly offsetTimeSlider: Locator;
  private readonly dateFormatTxt: Locator;
  private readonly pageSizeTxt: Locator;
  private readonly ascendingRadioBtn: Locator;
  private readonly descendingRadioBtn: Locator;
  private readonly addColumnsDisplayedBtn: Locator;
  private readonly contentAppNameTxt: Locator;
  private readonly columnsDisplayedDropDownBox: Locator;
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

  constructor(page: Page) {
    super(page);
    this.deleteFolderThreeDotsBtn = page.locator('umb-entity-action').getByLabel('Delete Folder...');
    this.renameFolderThreeDotsBtn = page.locator('umb-entity-action').getByLabel('Rename Folder...')
    this.deleteThreeDotsBtn = page.locator('umb-entity-action').getByLabel('Delete...');
    this.moveToThreeDotsBtn = page.locator('umb-entity-action').getByLabel('Move to...');
    this.copyToThreeDotsBtn = page.locator('umb-entity-action').getByLabel('Copy to...');
    this.newDataTypeThreeDotsBtn = page.locator('umb-data-type-create-options-modal').getByLabel('New Data Type...');
    this.dataTypeNameTxt = page.locator('umb-data-type-workspace-editor #nameInput #input');
    this.selectPropertyEditorBtn = page.getByLabel('Select Property Editor');
    this.selectBtn = page.locator('umb-property-editor-ui-picker-modal').getByLabel('Select');
    this.createDataTypeFolderBtn = page.getByLabel('Create Folder');
    this.updateDataTypeFolderBtn = page.getByLabel('Update Folder');
    this.changeBtn = page.getByLabel('Change');

    // Approved Color
    this.includeLabelsSlider = page.locator('#slider');
    this.addColorBtn = page.getByLabel('Add');
    this.colorValueTxt = page.getByPlaceholder('Value').getByRole('textbox');
    this.colorLabelTxt = page.getByPlaceholder('Label...').getByRole('textbox');

    // Date Picker
    this.offsetTimeSlider = page.locator("umb-property-layout[label='Offset time'] #slider");
    this.dateFormatTxt = page.locator("umb-property-layout[label='Date format'] #input");

    // List View
    this.pageSizeTxt = page.locator("umb-property-layout[label='Page Size'] #input");
    this.ascendingRadioBtn = page.locator("uui-radio[label='Ascending [a-z]'] #button");
    this.descendingRadioBtn = page.locator("uui-radio[label='Descending [z-a]'] #button");
    this.addColumnsDisplayedBtn = page.locator("umb-property-layout[label='Columns Displayed']").getByLabel('Add');
    this.contentAppNameTxt = page.locator("umb-property-layout[label='Content app name'] #input");
    this.showContentAppFirstSlider = page.locator("umb-property-layout[label='Show Content App First'] #slider");
    this.editInInfiniteEditorSlider = page.locator("umb-property-layout[label='Edit in Infinite Editor'] #slider");
    this.contentAppIconBtn = page.locator("umb-property-layout[label='Content app icon'] uui-icon");
    this.columnsDisplayedDropDownBox = page.locator("umb-property-layout[label='Columns Displayed'] select");
    this.orderByDropDownBox = page.locator("umb-property-layout[label='Order By'] select");

    // Image Cropper
    this.aliasTxt = page.getByLabel('Alias', {exact: true});
    this.widthTxt = page.getByLabel('Width', {exact: true});
    this.heightTxt = page.getByLabel('Height', {exact: true});
    this.addCropBtn = page.getByLabel('Add', {exact: true});
    this.saveCropBtn = page.locator('umb-property-editor-ui-image-crops-configuration').getByLabel('Save', {exact: true});

    // Numeric
    this.minimumTxt = page.locator("umb-property-layout[label='Minimum'] #input");
    this.maximumTxt = page.locator("umb-property-layout[label='Maximum'] #input");
    this.stepSizeTxt = page.locator("umb-property-layout[label='Step size'] #input");

    // Radiobox
    this.optionTxt = page.locator("umb-property-layout[label='Add option'] #input");
    this.addOptionBtn = page.locator("umb-property-layout[label='Add option']").getByLabel('Add', {exact: true});

    // Textarea - Textstring
    this.maximumAllowedCharsTxt = page.locator("umb-property-layout[label='Maximum allowed characters'] #input");  
    this.numberOfRowsTxt = page.locator("umb-property-layout[label='Number of rows'] #input"); 
    this.minHeightTxt = page.locator("umb-property-layout[label='Min height (pixels)'] #input"); 
    this.maxHeightTxt = page.locator("umb-property-layout[label='Max height (pixels)'] #input");    

    // Upload
    this.acceptedFileExtensionsTxt = page.locator("umb-property-layout[label='Accepted file extensions'] #input");
    this.addAcceptedFileExtensionsBtn = page.locator("umb-property-layout[label='Accepted file extensions']").getByLabel('Add', {exact: true});
  }

  async clickActionsMenuForDataType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForDataType("Data Types");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Data Types");
  }

  async goToDataType(dataTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(dataTypeName, {exact: true}).click({force: true});
  }

  async clickDeleteThreeDotsButton() {
    await this.deleteThreeDotsBtn.click();
  }

  async clickMoveToThreeDotsButton() {
    await this.moveToThreeDotsBtn.click();
  }

  async clickCopyToThreeDotsButton() {
    await this.copyToThreeDotsBtn.click();
  }

  async clickRenameFolderThreeDotsButton() {
    await this.renameFolderThreeDotsBtn.click();
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

  async enterFolderName(name: string) {
    await this.folderNameTxt.clear();
    await this.folderNameTxt.fill(name);
  }

  async clickCreateFolderButton() {
    await this.createDataTypeFolderBtn.click();
  }

  async clickUpdateFolderButton() {
    await this.updateDataTypeFolderBtn.click();
  }

  async clickSelectPropertyEditorButton() {
    await this.selectPropertyEditorBtn.click();
  }

  async selectPropertyEditorUIByName(name: string) {
    await this.page.locator('umb-property-editor-ui-picker-modal').getByText(name).click();
    await this.selectBtn.click();
  }

  async deleteDataType(name: string) {
    await this.clickActionsMenuForDataType(name);
    await this.deleteBtn.click();
    await this.confirmToDeleteBtn.click();
  }

  async clickChangeButton() {
    await this.changeBtn.click();
  }

  async deleteDataTypeFolder(folderName: string) {
    await this.clickActionsMenuForDataType(folderName);
    await this.deleteFolderThreeDotsBtn.click();
    await this.confirmToDeleteBtn.click();
  }

  // Approved Color
  async clickIncludeLabelsSlider() {
    await this.includeLabelsSlider.click();
  }

  async removeColorByValue(value: string) {
    await this.page.locator('uui-button').filter({has: this.page.getByLabel('Delete ' + value)}).locator('svg').click();
    await this.confirmToDeleteBtn.click();
  }

  async addColor(value: string, label: string) {
    await this.addColorBtn.click();
    await this.colorValueTxt.clear();
    await this.colorValueTxt.fill(value);
    await this.colorLabelTxt.clear();
    await this.colorLabelTxt.fill(label);
  }

  // Label
  async changeValueType(valueType: string) {
    await this.page.getByLabel('Select a value type').selectOption({ label: valueType });
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

  async addColumnDisplayed(columnName: string) {
    await this.columnsDisplayedDropDownBox.selectOption({ label: columnName });
    await this.addColumnsDisplayedBtn.click();
  }

  async removeColumnDisplayed(columnName: string) {
    await this.page.locator('uui-table-row').filter({has: this.page.getByText(columnName)}).getByText('Remove').click();
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
  async enterCropValues(alias: string, width: string, height: string) {
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
}
