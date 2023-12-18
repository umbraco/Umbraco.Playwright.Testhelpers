import {Locator, Page} from "@playwright/test"

export class UiBaseLocators {
  public readonly page: Page;
  public readonly saveBtn: Locator;
  public readonly submitBtn: Locator;
  public readonly createFolderBtn: Locator;
  public readonly breadcrumbBtn: Locator;
  public readonly deleteBtn: Locator;
  public readonly confirmToDeleteBtn: Locator;
  public readonly deleteFolderBtn: Locator;
  public readonly confirmCreateFolderBtn: Locator;
  public readonly insertBtn: Locator;
  public readonly dictionaryInsertItemBtn: Locator;
  public readonly caretDictionaryBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveBtn = page.getByLabel('Save');
    this.submitBtn = page.getByLabel('Submit');
    this.deleteFolderBtn = page.getByLabel('Delete');
    this.deleteBtn = page.getByRole('button', {name: 'Delete'});
    this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
    this.confirmCreateFolderBtn = page.locator('#confirm').getByLabel('Create folder');
    this.breadcrumbBtn = page.getByLabel('Breadcrumb');
    this.createFolderBtn = page.getByLabel('Create folder');
    this.insertBtn = page.getByLabel('Choose value to insert');
    this.dictionaryInsertItemBtn = page.getByLabel('Insert Dictionary item');
    this.caretDictionaryBtn = page.locator('umb-tree-picker-modal').locator('#caret-button');
  }

  async clickActionsMenuForName(name: string) {
    await this.page.locator('[label="' + name + '"] >> [label="Open actions menu"]').click({force: true});
  }
  
  async clickCaretButtonForName(name: string) {
    await this.page.locator('div').filter({hasText: name}).locator('#caret-button').click();
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
}