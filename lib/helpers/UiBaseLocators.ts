import {expect, Locator, Page} from "@playwright/test"
import {ConstantHelper} from "./ConstantHelper";

export class UiBaseLocators {
  public readonly page: Page;
  public readonly saveBtn: Locator;
  public readonly submitBtn: Locator;
  public readonly createFolderBtn: Locator;
  public readonly breadcrumbBtn: Locator;
  public readonly deleteBtn: Locator;
  public readonly confirmToDeleteBtn: Locator;
  public readonly deleteFolderBtn: Locator;
  public readonly deleteExactLabelBtn: Locator;
  public readonly confirmCreateFolderBtn: Locator;
  public readonly insertBtn: Locator;
  public readonly dictionaryInsertItemBtn: Locator;
  public readonly caretDictionaryBtn: Locator;
  public readonly insertValueBtn: Locator;
  public readonly modalCaretBtn: Locator;
  public readonly queryBuilderBtn: Locator;
  public readonly queryBuilderOrderedBy: Locator;
  public readonly queryBuilderCreateDate: Locator;
  public readonly folderNameTxt: Locator;
  public readonly textAreaInputArea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveBtn = page.getByLabel('Save');
    this.submitBtn = page.getByLabel('Submit');
    this.deleteExactLabelBtn = page.getByLabel('Delete', {exact: true});
    this.deleteFolderBtn = page.getByLabel('Delete');
    this.deleteBtn = page.getByRole('button', {name: 'Delete'});
    this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
    this.confirmCreateFolderBtn = page.locator('#confirm').getByLabel('Create folder');
    this.breadcrumbBtn = page.getByLabel('Breadcrumb');
    this.createFolderBtn = page.getByLabel('Create folder');
    this.insertBtn = page.getByLabel('Choose value to insert');
    this.dictionaryInsertItemBtn = page.getByLabel('Insert Dictionary item');
    this.caretDictionaryBtn = page.locator('umb-tree-picker-modal').locator('#caret-button');
    this.insertValueBtn = page.getByLabel('Choose value to insert');
    this.modalCaretBtn = page.locator('umb-tree-picker-modal').locator('#caret-button');
    this.queryBuilderBtn = page.locator('#query-builder-button').getByLabel('Query builder')
    this.queryBuilderOrderedBy = page.locator('#property-alias-dropdown').getByLabel('Property alias');
    this.queryBuilderCreateDate = page.locator('#property-alias-dropdown').getByText('CreateDate').locator("..");
    this.folderNameTxt = page.getByRole('textbox', {name: 'Enter folder name...'});
    this.textAreaInputArea = page.locator('textarea.inputarea');
  }

  async clickActionsMenuForName(name: string) {
    await this.page.locator('[label="' + name + '"] >> [label="Open actions menu"]').click({force: true});
  }

  async clickCaretButtonForName(name: string) {
    await this.page.locator('div').filter({hasText: name}).locator('#caret-button').click();
  }
  
  async clickCaretButton(){
    await this.page.locator('#caret-button').click();
  }

  async clickSaveButton() {
    await this.saveBtn.click();
  }

  async clickSubmitButton() {
    await this.submitBtn.click();
  }

  async clickCreateFolderButton() {
    await this.createFolderBtn.click();
  }

  async clickBreadcrumbButton() {
    await this.breadcrumbBtn.click();
  }

  async clickInsertButton() {
    await this.insertBtn.click();
  }

  async clickDictionaryInsertItemButton() {
    await this.dictionaryInsertItemBtn.click({force: true});
  }

  async clickCaretDictionaryButton() {
    await this.caretDictionaryBtn.click();
  }

  async clickDeleteButton() {
    await this.deleteBtn.click();
  }

  async clickConfirmToDeleteButton() {
    await this.confirmToDeleteBtn.click();
  }

  async clickDeleteFolderButton() {
    await this.deleteFolderBtn.click();
  }

  async clickConfirmCreateFolderButton() {
    await this.confirmCreateFolderBtn.click();
  }

  async insertDictionaryByName(dictionaryName: string) {
    await this.insertValueBtn.click();
    await this.clickDictionaryInsertItemButton();
    await this.page.waitForTimeout(1000);
    await this.modalCaretBtn.click({force: true});
    await this.page.getByLabel(dictionaryName).click();
    await this.submitBtn.click();
  }

  async addQueryBuilderWithCreateDateOption() {
    await this.queryBuilderBtn.click({force: true});
    await this.page.waitForTimeout(1000);
    await this.queryBuilderOrderedBy.click({force: true});
    await this.page.waitForTimeout(1000);
    await this.queryBuilderCreateDate.click({force: true});
    await this.submitBtn.click({force: true});
  }

  async deleteFolder() {
    await this.clickDeleteFolderButton();
    await this.clickConfirmToDeleteButton();
  }

  async clickDeleteExactLabel() {
    await this.deleteExactLabelBtn.click();
  }

  async isTreeItemVisible(name: string) {
    await expect(this.page.locator('umb-tree-item').locator('[label="' + name + '"] ')).toBeVisible();
  }

  async goToSection(sectionName: string) {
    for (let section in ConstantHelper.sections) {
      await expect(this.page.getByRole('tab', {name: section})).toBeVisible({timeout: 30000});
    }
    await this.page.getByRole('tab', {name: sectionName}).click();
  }

  async goToSettingsTreeItem(settingsTreeItemName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.page.getByLabel(settingsTreeItemName).click();
  }

  async clickDataElement(elementName: string, options: any = null) {
    await this.page.click(`[data-element="${elementName}"]`, options);
  }

  async getDataElement(elementName: string) {
    return this.page.locator(`[data-element="${elementName}"]`);
  }
  
  async isButtonWithNameVisible(name: string) {
    await expect(this.page.getByRole('button', {name: name})).toBeVisible();
  }
  
  async clickLabelWithName(name: string) {
    await this.page.getByLabel(name).click();
  }

  async isSuccessNotificationVisible() {
    return await expect(this.page.locator('uui-toast-notification >> [color="positive"]')).toBeVisible();
  }

  async isErrorNotificationVisible() {
    return await expect(this.page.locator('uui-toast-notification >> [color="danger"]')).toBeVisible();
  }
}