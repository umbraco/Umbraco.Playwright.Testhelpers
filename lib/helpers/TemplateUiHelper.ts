import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class TemplateUiHelper extends UiBaseLocators{
  private readonly templateNameTxt: Locator;
  private readonly changeMasterTemplateBtn: Locator;
  private readonly sectionsBtn: Locator;
  private readonly removeMasterTemplateBtn: Locator;
  private readonly sectionNameTxt: Locator;
  private readonly templateTree: Locator;

  constructor(page: Page) {
    super(page);
    this.templateNameTxt = page.getByLabel('Template', { exact: true });
    this.changeMasterTemplateBtn = page.locator('#master-template-button');
    this.sectionsBtn = page.locator('#sections-button', {hasText: 'Sections'});
    this.removeMasterTemplateBtn = page.locator('[name="icon-delete"] svg');
    this.sectionNameTxt = page.getByLabel('Section Name');
    this.templateTree = page.locator('umb-tree[alias="Umb.Tree.Template"]');
  }

  async clickActionsMenuForTemplate(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForTemplate('Templates');
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName('Templates');
  }

  async goToTemplate(templateName: string, childTemplateName: string = '') {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.clickRootFolderCaretButton();
    if (childTemplateName === '') {
      await this.page.getByLabel(templateName).click();
      await expect(this.templateNameTxt).toHaveValue(templateName);
    } else {
      await this.clickCaretButtonForName(templateName);
      await this.page.getByLabel(childTemplateName).click();
      await expect(this.templateNameTxt).toHaveValue(childTemplateName);
    } 
  }

  async clickSectionsButton() {
    await expect(this.sectionsBtn).toBeVisible();
    await this.sectionsBtn.click();
  }

  async clickChangeMasterTemplateButton() {
    await this.changeMasterTemplateBtn.click();
  }

  async enterTemplateName(templateName: string) {
    await expect(this.templateNameTxt).toBeVisible();
    await this.templateNameTxt.clear();
    await this.templateNameTxt.fill(templateName);
  }

  async enterTemplateContent(templateContent: string) {
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(templateContent);
  }

  async isMasterTemplateNameVisible(templateName: string, isVisible: boolean = true) {
    await expect(this.page.getByLabel('Master template: ' + templateName)).toBeVisible({visible: isVisible});
  }

  async clickRemoveMasterTemplateButton() {
    await this.removeMasterTemplateBtn.click();
  }

  async insertSection(sectionType: string, sectionName: string = '') {
    await this.clickSectionsButton();
    await expect(this.submitBtn).toBeVisible();
    await this.page.locator('[label="' + sectionType + '"]').click();
    if (sectionName !== '') {
      await expect(this.sectionNameTxt).toBeVisible();
      await this.sectionNameTxt.fill(sectionName);
    }
    await this.clickSubmitButton();
  }

  checkItemNameUnderTemplateTree(name: string){
    return this.templateTree.getByText(name);
  }
}