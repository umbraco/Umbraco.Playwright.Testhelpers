import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class TemplateUiHelper {
  private readonly page: Page;
  private readonly uiBaseLocators: UiBaseLocators;
  private readonly newEmptyTemplateBtn: Locator;
  private readonly insertTemplateName: Locator;
  private readonly insertFolderName: Locator;
  private readonly changeMasterTemplateBtn: Locator;
  private readonly sectionsBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uiBaseLocators = new UiBaseLocators(this.page);
    this.newEmptyTemplateBtn = page.getByLabel('Create');
    this.insertTemplateName = page.getByLabel('template name');
    this.insertFolderName = page.locator('[headline="Create Folder"] >> input');
    this.changeMasterTemplateBtn = page.getByLabel('Change master template');
    this.sectionsBtn = page.locator('#sections-button', {hasText: 'Sections'});
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

  // Will only work for root templates
  async goToTemplate(templateName: string) {
    await this.uiBaseLocators.goToSection(ConstantHelper.sections.settings);
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(templateName).click({force: true});
  }

  async insertDictionaryByName(dictionaryName: string) {
    await this.uiBaseLocators.insertDictionaryByName(dictionaryName);
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

  async addQueryBuilderWithCreateDateOption() {
    await this.uiBaseLocators.addQueryBuilderWithCreateDateOption();
  }

  async clickSaveButton() {
    await this.uiBaseLocators.clickSaveButton();
  }

  async createFolder(folderName: string) {
    await this.uiBaseLocators.clickCreateFolderButton();
    await this.insertFolderName.fill(folderName);
    await this.uiBaseLocators.createFolderBtn.click({force: true});
  }

  async enterTemplateName(templateContent: string) {
    await this.insertTemplateName.fill(templateContent);
  }

  async enterTemplateContent(templateContent: string) {
    await this.uiBaseLocators.textAreaInputArea.clear();
    await this.uiBaseLocators.textAreaInputArea.fill(templateContent);
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
    await this.uiBaseLocators.deleteFolder();
  }
}