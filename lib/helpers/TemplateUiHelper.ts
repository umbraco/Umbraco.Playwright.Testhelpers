import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class TemplateUiHelper extends UiBaseLocators {
  private readonly changeMasterTemplateBtn: Locator;
  private readonly sectionsBtn: Locator;
  private readonly removeMasterTemplateBtn: Locator;
  private readonly sectionNameTxt: Locator;
  private readonly templateTree: Locator;

  constructor(page: Page) {
    super(page);
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
    await this.openCaretButtonForName('Templates');
  }

  async waitForTemplateToBeCreated() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForTemplateToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForTemplateToBeRenamed() {
    await this.waitForNetworkToBeIdle();
  }

  async goToTemplate(templateName: string, childTemplateName: string = '') {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadTemplateTree();
    if (childTemplateName === '') {
      await this.page.getByLabel(templateName, {exact: true}).click();
      await this.hasValue(this.enterAName, templateName);
    } else {
      await this.openCaretButtonForName(templateName);
      await this.page.getByLabel(childTemplateName , {exact: true}).click();
      await this.hasValue(this.enterAName, childTemplateName);
    }
    await this.page.waitForTimeout(1000);
  }

  async clickSectionsButton() {
    await this.click(this.sectionsBtn);
  }

  async clickChangeMasterTemplateButton() {
    await this.click(this.changeMasterTemplateBtn);
  }

  async enterTemplateName(templateName: string) {
    await this.enterText(this.enterAName, templateName);
  }

  async enterTemplateContent(templateContent: string) {
    // We need this wait, to be sure that the template content is loaded.
    await this.page.waitForTimeout(200);
    await this.enterMonacoEditorValue(templateContent);
  }

  async isMasterTemplateNameVisible(templateName: string, isVisible: boolean = true) {
    await this.isVisible(this.page.getByLabel('Master template: ' + templateName), isVisible);
  }

  async clickRemoveMasterTemplateButton() {
    await this.click(this.removeMasterTemplateBtn);
  }

  async insertSection(sectionType: string, sectionName: string = '') {
    await this.clickSectionsButton();
    await this.isVisible(this.submitBtn);
    await this.page.locator('[label="' + sectionType + '"]').click();
    if (sectionName !== '') {
      await this.enterText(this.sectionNameTxt, sectionName);
    }
    await this.clickSubmitButton();
  }

  async isTemplateTreeItemVisible(templateName: string, isVisible: boolean = true) {
    return this.isVisible(this.templateTree.getByText(templateName, {exact: true}), isVisible);
  }

  async reloadTemplateTree() {
    await this.reloadTree('Templates');
  }

  async isTemplateRootTreeItemVisible(templateName: string, isVisible: boolean = true, toReload: boolean = true) {
    if (toReload) {
      await this.reloadTemplateTree();
    }
    return this.isVisible(this.templateTree.getByText(templateName, {exact: true}), isVisible);
  }
}