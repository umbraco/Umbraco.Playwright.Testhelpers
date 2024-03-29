import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class TemplateUiHelper extends UiBaseLocators{
  private readonly newEmptyTemplateBtn: Locator;
  private readonly insertTemplateName: Locator;
  private readonly changeMasterTemplateBtn: Locator;
  private readonly sectionsBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.newEmptyTemplateBtn = page.getByLabel('Create');
    this.insertTemplateName = page.getByLabel('template name');
    this.changeMasterTemplateBtn = page.getByLabel('Change master template');
    this.sectionsBtn = page.locator('#sections-button', {hasText: 'Sections'});
  }

  async clickActionsMenuForTemplate(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForTemplate("Templates");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Templates");
  }

  // Will only work for root templates
  async goToTemplate(templateName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(templateName).click({force: true});
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

  async enterTemplateName(templateContent: string) {
    await expect(this.insertTemplateName).toBeVisible();
    await this.insertTemplateName.clear();
    await this.insertTemplateName.fill(templateContent);
  }

  async enterTemplateContent(templateContent: string) {
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(templateContent);
  }

  async openTemplateAtRoot(templateName: string) {
    await this.clickCaretDictionaryButton();
    await this.page.getByLabel(templateName).click();
  }
  
  async isMasterTemplateNameVisible(templateName: string, isVisible: boolean = true) {
    return await expect(this.page.locator('[label="Change Master template"]', {hasText: 'Master template: ' + templateName})).toBeVisible({visible: isVisible});
  }

  async deleteTemplate() {
    await this.clickDeleteButton();
    await this.clickConfirmToDeleteButton();
  }
}