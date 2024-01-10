import {Page, Locator} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class DataTypeUiHelper extends UiBaseLocators {
  private readonly createMenu: Locator;
  private readonly deleteFolderMenu: Locator;
  private readonly remaneFolderMenu: Locator;
  private readonly deleteMenu: Locator;
  private readonly moveToMenu: Locator;
  private readonly copyToMenu: Locator;
  private readonly newDataTypeBtn: Locator;
  private readonly newFolderBtn: Locator;
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


  constructor(page: Page) {
    super(page);
    this.createMenu = page.locator('umb-entity-action').getByLabel('Create...');
    this.deleteFolderMenu = page.locator('umb-entity-action').getByLabel('Delete Folder...');
    this.remaneFolderMenu = page.locator('umb-entity-action').getByLabel('Rename Folder...')
    this.deleteMenu = page.locator('umb-entity-action').getByLabel('Delete...');
    this.moveToMenu = page.locator('umb-entity-action').getByLabel('Move to...');
    this.copyToMenu = page.locator('umb-entity-action').getByLabel('Copy to...');
    this.newDataTypeBtn = page.locator('umb-data-type-create-options-modal').getByLabel('New Data Type...');
    this.newFolderBtn = page.locator('umb-data-type-create-options-modal').getByLabel('New Folder...');
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
    await this.page.getByLabel(dataTypeName).click({force: true});
  }

  async clickCreateMenu() {
    await this.createMenu.click();
  }

  async clickDeleteMenu() {
    await this.deleteMenu.click();
  }

  async clickMoveToMenu() {
    await this.moveToMenu.click();
  }

  async clickCopyToMenu() {
    await this.copyToMenu.click();
  }

  async clickRenameFolderMenu() {
    await this.remaneFolderMenu.click();
  }

  async clickNewDataTypeButton() {
    await this.newDataTypeBtn.click();
  }

  async clickNewDataFolderButton() {
    await this.newFolderBtn.click();
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
    await this.deleteFolderMenu.click();
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
}
