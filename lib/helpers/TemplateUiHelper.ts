import {Page, Locator} from "@playwright/test"

export class TemplateUiHelper {
  private readonly page: Page;
  private readonly newEmptyTemplateBtn: Locator;
  private readonly insertTemplateName: Locator;
  private readonly saveBtn: Locator;
  private readonly deleteFolderBtn: Locator;
  private readonly caretBtn: Locator;
  private readonly templateTextArea: Locator;
  private readonly deleteBtn: Locator;
  private readonly confirmToDeleteBtn: Locator;
  private readonly insertFolderName: Locator;
  private readonly createFolderBtn: Locator;
  private readonly changeMasterTemplateBtn: Locator;
  private readonly queryBuilderBtn: Locator;
  private readonly queryBuilderOrderedByBtn: Locator;
  private readonly queryBuilderCreateDate: Locator;
  private readonly submitBtn: Locator;
  private readonly clickSectionsBtn: Locator;
  private readonly clickInsertValueBtn: Locator;
  private readonly insertDictionaryItemBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newEmptyTemplateBtn = page.getByLabel('Create');
    this.insertTemplateName = page.getByLabel('template name');
    this.saveBtn = page.getByLabel('Save');
    this.submitBtn = page.getByLabel('Submit');
    this.caretBtn = page.locator('div').filter({hasText: 'Templates'}).locator('#caret-button')
    this.templateTextArea = page.locator('textarea.inputarea')
    this.deleteBtn = page.getByRole('button', {name: 'Delete'});
    this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
    this.createFolderBtn = page.getByLabel('Create folder');
    this.insertFolderName = page.locator('[headline="Create Folder"] >> input');
    this.deleteFolderBtn = page.getByLabel('Delete');
    this.changeMasterTemplateBtn = page.getByLabel('Change master template');
    this.queryBuilderBtn = page.locator('#query-builder-button').getByLabel('Query builder')
    this.queryBuilderOrderedByBtn = page.locator('#property-alias-dropdown').getByLabel('Property alias');
    this.queryBuilderCreateDate = page.locator('#property-alias-dropdown').getByText('CreateDate')
    this.clickSectionsBtn = page.locator('#sections-button', {hasText: 'Sections'})
    this.clickInsertValueBtn = page.getByLabel('Choose value to insert');
    this.insertDictionaryItemBtn = page.getByLabel('Insert Dictionary item');
  }

  async openActionsMenuForName(name: string) {
    await this.page.locator('[label="' + name + '"] >> [label="Open actions menu"]').click({force: true});
  }

  async openActionsMenuAtRoot() {
    await this.openActionsMenuForName("Templates");
  }

  async clickRootFolderCaretButton() {
    await this.caretBtn.click();
  }

  async clickByLabel(label: string) {
    await this.page.getByLabel(label).click();
  }

  async insertDictionaryByName(name: string) {
    await this.clickInsertValueBtn.click();
    await this.insertDictionaryItemBtn.click({force: true});
    await this.page.waitForTimeout(1000);
    await this.page.locator('umb-tree-picker-modal').locator('#caret-button').click({force: true});
    await this.page.getByLabel(name).click();
    await this.submitBtn.click();
  }

  async clickSubmitButton() {
    await this.submitBtn.click();
  }

  async clickCaretButtonForName(name: string) {
    await this.page.locator('umb-tree-item >> [label="' + name + '"]').locator('#caret-button').click();
  }

  async clickSectionsButton() {
    await this.clickSectionsBtn.click();
  }

  async clickNewTemplateButton() {
    await this.newEmptyTemplateBtn.click();
  }

  async clickChangeMasterTemplateButton() {
    await this.changeMasterTemplateBtn.click();
  }

  async orderQueryBuilderByCreateDate() {
    await this.queryBuilderBtn.click();
    await this.page.waitForTimeout(1000);
    await this.queryBuilderOrderedByBtn.click({force: true});
    await this.page.waitForTimeout(1000);
    await this.queryBuilderCreateDate.click({force: true});
  }

  async clickSaveButton() {
    await this.saveBtn.click();
  }

  async createNewFolder(folderName: string) {
    await this.createFolderBtn.click();
    await this.insertFolderName.fill(folderName);
    await this.createFolderBtn.click({force: true});
  }

  async enterTemplateName(templateContent: string) {
    await this.insertTemplateName.fill(templateContent);
  }

  async enterTemplateContent(templateContent: string) {
    await this.templateTextArea.clear();
    await this.templateTextArea.fill(templateContent);
  }

  async openTemplateFileAtRoot(templateFileName: string) {
    await this.caretBtn.click();
    await this.page.getByLabel(templateFileName).click();
  }

  async deleteTemplateFile() {
    await this.deleteBtn.click();
    await this.confirmToDeleteBtn.click();
  }

  async deleteFolder() {
    await this.deleteFolderBtn.click();
    await this.confirmToDeleteBtn.click();
  }
}