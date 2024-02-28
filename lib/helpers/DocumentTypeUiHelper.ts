import {UiBaseLocators} from "./UiBaseLocators";
import {expect, Locator, Page} from "@playwright/test";

export class DocumentTypeUiHelper extends UiBaseLocators {
  private readonly newDocumentTypeBtn: Locator;
  private readonly documentNameTxt: Locator;
  private readonly addGroupBtn: Locator;
  private readonly iAmDoneReorderingBtn: Locator;
  private readonly reorderBtn: Locator;
  private readonly compositionsBtn: Locator;
  private readonly addTabBtn: Locator;
  private readonly unnamedTxt: Locator;
  private readonly editorSettingsBtn: Locator;
  private readonly enterDescriptionTxt: Locator;
  private readonly descriptionBtn: Locator;
  private readonly mandatorySlider: Locator;
  private readonly validation: Locator;
  private readonly regexTxt: Locator;
  private readonly regexMessageTxt: Locator;
  private readonly varyByCultureSlider: Locator;
  private readonly labelOnTopBtn: Locator;
  private readonly documentTypeSettingsTabBtn: Locator;
  private readonly documentTypeStructureTabBtn: Locator;
  private readonly documentTypeTemplatesTabBtn: Locator;
  private readonly varyBySegmentsBtn: Locator;
  private readonly varyByCultureBtn: Locator;
  private readonly allowAsRootBtn: Locator;
  private readonly enterFolderNameTxt: Locator;
  private readonly addPropertyBtn: Locator;
  private readonly selectPropertyEditorBtn: Locator;
  private readonly typeToFilterIconsTxt: Locator;
  
  constructor(page: Page) {
    super(page);
    this.newDocumentTypeBtn = page.getByLabel('New Document Type...');
    this.documentNameTxt = page.getByLabel('name', {exact: true});
    this.addGroupBtn = page.getByLabel('Add group', {exact: true});
    this.iAmDoneReorderingBtn = page.getByLabel('I am done reordering');
    this.reorderBtn = page.getByLabel('Reorder');
    this.compositionsBtn = page.getByLabel('Compositions');
    this.addTabBtn = page.getByLabel('Add tab');
    this.unnamedTxt = page.getByRole('textbox', {name: 'Unnamed'});
    this.editorSettingsBtn = page.getByLabel('Editor settings');
    this.enterDescriptionTxt = page.getByRole('textbox', {name: 'Enter description...'});
    this.descriptionBtn = page.getByLabel('Description');
    this.mandatorySlider = page.locator('#mandatory #slider');
    this.validation = page.locator('#native');
    this.regexTxt = page.locator('input[name="pattern"]');
    this.regexMessageTxt = page.locator('textarea[name="pattern-message"]');
    this.varyByCultureSlider = page.locator('label').filter({hasText: 'Vary by culture'}).locator('#slider');
    this.labelOnTopBtn = page.getByRole('button', {name: 'Label on top'});
    this.documentTypeSettingsTabBtn = page.locator('umb-body-layout').getByRole('tab', {name: 'Settings'});
    this.documentTypeStructureTabBtn = page.getByRole('tab', {name: 'Structure'});
    this.documentTypeTemplatesTabBtn = page.getByRole('tab', {name: 'Templates'})
    this.varyBySegmentsBtn = page.getByText('Vary by segments', {exact: true});
    this.varyByCultureBtn = page.getByText('Vary by culture', {exact: true});
    this.allowAsRootBtn = page.locator('label').filter({hasText: 'Allow as root'});
    this.enterFolderNameTxt = page.getByRole('textbox', {name: 'Enter folder name...'});
    this.addPropertyBtn = page.getByLabel('Add property', {exact: true});
    this.selectPropertyEditorBtn = page.getByLabel('Select Property Editor');
    this.typeToFilterIconsTxt = page.getByLabel('Type to filter icons');
  }

  async clickActionsMenuForDocumentType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForDocumentType("Document Types");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Document Types");
  }

  async clickNewDocumentTypeButton() {
    await this.newDocumentTypeBtn.click();
  }

  clickEditorSettingsButton() {
    return this.editorSettingsBtn.click();
  }

  async clickVaryByCultureSlider() {
    await this.varyByCultureSlider.click();
  }
  
  async enterDescription(description: string) {
    await this.enterDescriptionTxt.fill(description);
  }

  async doesDescriptionHaveValue(value: string) {
    return await expect(this.descriptionBtn).toHaveValue(value);
  }

  async clickDocumentTypeSettingsTab() {
    await this.page.waitForTimeout(200);
    await this.documentTypeSettingsTabBtn.click({force: true});
  }

  async clickDocumentTypeStructureTab() {
    await this.page.waitForTimeout(200);
    await this.documentTypeStructureTabBtn.click({force: true});
  }

  async clickDocumentTypeTemplatesTab() {
    await this.page.waitForTimeout(200);
    await this.documentTypeTemplatesTabBtn.click({force: true});
  }

  async clickVaryBySegmentsButton() {
    await this.varyBySegmentsBtn.click();
  }

  async clickVaryByCultureButton() {
    await this.varyByCultureBtn.click();
  }

  async clickAllowAsRootButton() {
    await this.allowAsRootBtn.click();
  }

  async enterFolderName(folderName: string) {
    await this.enterFolderNameTxt.fill(folderName);
  }

  async doesGroupHaveValue(value: string) {
    return await expect(this.page.getByLabel('Group', {exact: true})).toHaveValue(value);
  }

  async clickIAmDoneReorderingButton() {
    await this.iAmDoneReorderingBtn.click();
  }

  async clickReorderButton() {
    await this.reorderBtn.click();
  }

  async clickLabelOnTopButton() {
    await this.labelOnTopBtn.click();
  }

  async clickMandatorySlider() {
    await this.mandatorySlider.click();
  }

  async selectValidationOption(option: string) {
    await this.validation.selectOption(option);
  }

  async enterRegEx(regEx: string) {
    await this.regexTxt.fill(regEx);
  }

  async enterRegExMessage(regExMessage: string) {
    await this.regexMessageTxt.fill(regExMessage);
  }

  async clickCompositionsButton() {
    await this.compositionsBtn.click();
  }

  async clickAddTabButton() {
    await this.addTabBtn.click();
  }

  async enterTabName(tabName: string) {
    await this.unnamedTxt.fill(tabName);
  }

  async goToDocumentType(documentTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(documentTypeName).click();
  }

  async enterDocumentTypeName(documentTypeName: string) {
    await this.page.waitForTimeout(200);
    await this.documentNameTxt.fill(documentTypeName);
  }

  async clickSelectPropertyEditorButton() {
    await this.selectPropertyEditorBtn.click();
  }

  async searchForPropertyEditor(propertyEditorName: string) {
    await this.typeToFilterIconsTxt.fill(propertyEditorName);
  }

  async addPropertyEditor(propertyEditorName: string, index: number = 0) {
    await this.addPropertyBtn.nth(index).click({force: true});
    await this.clickSelectPropertyEditorButton();
    await this.searchForPropertyEditor(propertyEditorName);
    await this.page.getByText(propertyEditorName, {exact: true}).click();
    await this.page.waitForTimeout(200);
    await this.enterAName(propertyEditorName);
    await this.clickAddButton();
  }

  async updatePropertyEditor(propertyEditorName: string) {
    await this.clickEditorSettingsButton();
    await this.clickChangeButton();
    await this.clickSelectPropertyEditorButton();
    await this.searchForPropertyEditor(propertyEditorName);
    await this.page.getByText(propertyEditorName, {exact: true}).click();
    await this.page.waitForTimeout(200);
    await this.enterAName(propertyEditorName);
    await this.clickUpdateButton();
  }

  async clickAddGroupButton() {
    await this.addGroupBtn.click();
  }

  async enterGroupName(groupName: string, index: number = 0) {
    await this.page.waitForTimeout(200);
    await this.page.getByLabel('Group', {exact: true}).nth(index).fill(groupName);
  }
}