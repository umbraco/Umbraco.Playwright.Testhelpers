import {Page, Locator} from "@playwright/test"

export class PartialViewUiHelper {
  private readonly page: Page;
  private readonly newEmptyPartialViewBtn: Locator;
  private readonly newPartialViewFromSnippetBtn: Locator;
  private readonly createFolderBtn: Locator;
  private readonly saveBtn: Locator;
  private readonly partialViewContentTxt: Locator;
  private readonly partialViewNameTxt: Locator;
  private readonly breadcrumbButton: Locator;
  private readonly folderNameTxt: Locator;
  private readonly caretBtn: Locator;
  private readonly deleteBtn: Locator;
  private readonly confirmToDeleteBtn: Locator;
  private readonly deleteFolderBtn: Locator;
  private readonly confirmCreateFolderBtn: Locator;
  private readonly queryBuilderButton: Locator;
  private readonly whereDropdown: Locator;
  private readonly createDateOption: Locator;
  private readonly submitBtn: Locator;
  private readonly insertBtn: Locator;
  private readonly dictionaryItemBtn: Locator;
  private readonly caretDictionaryBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newEmptyPartialViewBtn = page.getByLabel('New empty partial view');
    this.newPartialViewFromSnippetBtn = page.getByLabel('New partial view from snippet...');
    this.createFolderBtn = page.getByLabel('Create folder');
    this.saveBtn = page.getByLabel('Save');
    this.partialViewNameTxt = page.getByLabel('template name');
    this.folderNameTxt = page.getByRole('textbox', {name: 'Enter folder name...'});
    this.caretBtn = page.locator('div').filter({hasText: 'Partial Views'}).locator('#caret-button')
    this.deleteBtn = page.getByRole('button', {name: 'Delete'});
    this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
    this.deleteFolderBtn = page.getByLabel('Delete');
    this.confirmCreateFolderBtn = page.locator('#confirm').getByLabel('Create folder');
    this.breadcrumbButton = page.getByLabel('Breadcrumb');
    this.partialViewContentTxt = page.locator('textarea.inputarea');
    this.queryBuilderButton = page.locator('#query-builder-button').getByLabel('Query builder');
    this.whereDropdown = page.locator('#property-alias-dropdown').getByLabel('Property alias');
    this.createDateOption = page.locator('#property-alias-dropdown').getByText('CreateDate');
    this.submitBtn = page.getByLabel('Submit');
    this.insertBtn = page.getByLabel('Choose value to insert');
    this.dictionaryItemBtn = page.getByLabel('Insert Dictionary item');
    this.caretDictionaryBtn = page.locator('umb-tree-picker-modal').locator('#caret-button');
  }

  async openActionsMenuForName(name: string) {
    await this.page.locator('[label="' + name + '"] >> [label="Open actions menu"]').click({force: true});
  }

  async openActionsMenuAtRoot() {
    await this.openActionsMenuForName("Partial Views");
  }

  async clickRootFolderCaretButton() {
    await this.caretBtn.click();
  }

  async clickCaretButtonForName(name: string) {
    await this.page.locator('umb-tree-item >> [label="' + name + '"]').locator('#caret-button').click();
  }

  async clickNewEmptyPartialViewButton() {
    await this.newEmptyPartialViewBtn.click();
  }

  async clickNewPartialViewFromSnippetButton() {
    await this.newPartialViewFromSnippetBtn.click();
  }

  async clickSaveButton() {
    await this.saveBtn.click();
  }

  async clickBreadcrumbButton() {
    await this.breadcrumbButton.click();
  }

  async createNewFolder(folderName: string) {
    await this.createFolderBtn.click();
    await this.folderNameTxt.fill(folderName);
    await this.confirmCreateFolderBtn.click();
  }

  async enterPartialViewName(partialViewName: string) {
    await this.partialViewNameTxt.clear();
    await this.partialViewNameTxt.fill(partialViewName);
  }

  async enterPartialViewContent(partialViewContent: string) {
    await this.partialViewContentTxt.clear();
    await this.partialViewContentTxt.fill(partialViewContent);
  }

  async openPartialViewFileAtRoot(partialViewFileName: string) {
    await this.caretBtn.click();
    await this.page.getByLabel(partialViewFileName).click();
  }

  async deletePartialViewFile() {
    await this.deleteBtn.click();
    await this.confirmToDeleteBtn.click();
  }

  async removeFolder() {
    await this.deleteFolderBtn.click();
    await this.confirmToDeleteBtn.click();
  }

  async addQueryBuilderIntoPartialView() {
    await this.queryBuilderButton.click({force: true});
    // TODO: Remove this timeout when frontend validation is implemented
    await this.page.waitForTimeout(1000);
    await this.whereDropdown.click({force: true});
    await this.createDateOption.click();
    await this.submitBtn.click();
  }

  async insertDictionaryItem(dictionaryName: string) {
    await this.insertBtn.click();
    await this.dictionaryItemBtn.click();
    await this.caretDictionaryBtn.click();
    await this.page.getByLabel(dictionaryName).click();
    await this.submitBtn.click();
  }
}