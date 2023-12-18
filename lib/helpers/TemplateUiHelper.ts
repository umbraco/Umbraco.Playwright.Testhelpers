import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class TemplateUiHelper {
  private readonly page: Page;
  private readonly uiBaseLocators: UiBaseLocators;
  private readonly newEmptyTemplateBtn: Locator;
  private readonly insertTemplateName: Locator;
  private readonly templateTextArea: Locator;
  private readonly insertFolderName: Locator;
  private readonly changeMasterTemplateBtn: Locator;
  private readonly queryBuilderBtn: Locator;
  private readonly queryBuilderOrderedByBtn: Locator;
  private readonly queryBuilderCreateDate: Locator;
  private readonly sectionsBtn: Locator;
  private readonly insertValueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uiBaseLocators = new UiBaseLocators(this.page);
    this.newEmptyTemplateBtn = page.getByLabel('Create');
    this.insertTemplateName = page.getByLabel('template name');
    this.templateTextArea = page.locator('textarea.inputarea')
    this.insertFolderName = page.locator('[headline="Create Folder"] >> input');
    this.changeMasterTemplateBtn = page.getByLabel('Change master template');
    this.queryBuilderBtn = page.locator('#query-builder-button').getByLabel('Query builder')
    this.queryBuilderOrderedByBtn = page.locator('#property-alias-dropdown').getByLabel('Property alias');
    this.queryBuilderCreateDate = page.locator('#property-alias-dropdown').getByText('CreateDate')
    this.sectionsBtn = page.locator('#sections-button', {hasText: 'Sections'})
    this.insertValueBtn = page.getByLabel('Choose value to insert');
  }

  async clickActionsMenuForTemplate(name: string) {
    await this.uiBaseLocators.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForTemplate("Templates");
  }

  async clickRootFolderCaretButton() {
    await this.uiBaseLocators.clickCaretButtonForName("Templates");
  }

  async clickCaretButtonForName(name: string) {
    await this.uiBaseLocators.clickCaretButtonForName(name);
  }

  async insertDictionaryByName(name: string) {
    await this.insertValueBtn.click();
    await this.uiBaseLocators.clickDictionaryInsertItemButton();
    await this.page.waitForTimeout(1000);
    await this.page.locator('umb-tree-picker-modal').locator('#caret-button').click({force: true});
    await this.page.getByLabel(name).click();
    await this.uiBaseLocators.submitBtn.click();
  }

  async clickSubmitButton() {
    await this.uiBaseLocators.clickSubmitButton()
  }


  async clickSectionsButton() {
    await this.sectionsBtn.click();
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
    await this.uiBaseLocators.clickSaveButton();
  }

  async createNewFolder(folderName: string) {
    await this.uiBaseLocators.clickCreateFolderButton();
    await this.insertFolderName.fill(folderName);
    await this.uiBaseLocators.createFolderBtn.click({force: true});
  }

  async enterTemplateName(templateContent: string) {
    await this.insertTemplateName.fill(templateContent);
  }

  async enterTemplateContent(templateContent: string) {
    await this.templateTextArea.clear();
    await this.templateTextArea.fill(templateContent);
  }

  async openTemplateAtRoot(templateName: string) {
    await this.uiBaseLocators.clickCaretDictionaryButton();
    await this.page.getByLabel(templateName).click();
  }

  async deleteTemplate() {
    await this.uiBaseLocators.clickDeleteButton();
    await this.uiBaseLocators.clickConfirmToDeleteButton();
  }

  async deleteFolder() {
    await this.uiBaseLocators.clickDeleteFolderButton();
    await this.uiBaseLocators.clickConfirmToDeleteButton()
  }
}