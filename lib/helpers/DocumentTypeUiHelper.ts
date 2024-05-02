﻿import {UiBaseLocators} from "./UiBaseLocators";
import {expect, Locator, Page} from "@playwright/test";

export class DocumentTypeUiHelper extends UiBaseLocators {
  private readonly newDocumentTypeBtn: Locator;
  private readonly documentNameTxt: Locator;
  private readonly varyByCultureSlider: Locator;
  private readonly documentTypeSettingsTabBtn: Locator;
  private readonly documentTypeTemplatesTabBtn: Locator;
  private readonly varyBySegmentsBtn: Locator;
  private readonly varyByCultureBtn: Locator;
  private readonly createDocumentTypeBtn: Locator;
  private readonly createDocumentTypeWithTemplateBtn: Locator;
  private readonly createElementTypeBtn: Locator;
  private readonly createDocumentFolderBtn: Locator;
  private readonly documentTypeGroupNameTxt: Locator;
  private readonly propertySettingsModal: Locator;
  private readonly allowedChildNodesModal: Locator;
  private readonly configureAsACollectionBtn: Locator;
  private readonly documentTypeGroups: Locator;

  constructor(page: Page) {
    super(page);
    this.newDocumentTypeBtn = page.getByLabel('New Document Type...');
    this.documentNameTxt = page.getByLabel('name', {exact: true});
    this.varyByCultureSlider = page.locator('label').filter({hasText: 'Vary by culture'}).locator('#slider');
    this.documentTypeSettingsTabBtn = page.locator('umb-body-layout').getByRole('tab', {name: 'Settings'});
    this.documentTypeTemplatesTabBtn = page.getByRole('tab', {name: 'Templates'})
    this.varyBySegmentsBtn = page.getByText('Vary by segments', {exact: true});
    this.varyByCultureBtn = page.getByText('Vary by culture', {exact: true});
    this.createDocumentTypeBtn = page.locator('umb-ref-item').getByText('Document Type', {exact: true});
    this.createDocumentTypeWithTemplateBtn = page.locator('umb-ref-item').getByText('Document Type with Template', {exact: true});
    this.createElementTypeBtn = page.locator('umb-ref-item').getByText('Element Type', {exact: true});
    this.createDocumentFolderBtn = page.locator('umb-ref-item').getByText('Folder', {exact: true});
    this.documentTypeGroupNameTxt = page.getByLabel('Group', {exact: true});
    this.propertySettingsModal = page.locator('umb-property-type-settings-modal');
    this.allowedChildNodesModal = page.locator('umb-tree-picker-modal');
    this.configureAsACollectionBtn = page.getByLabel('Configure as a collection');
    this.documentTypeGroups = page.locator('umb-content-type-design-editor-group');
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

  async clickVaryByCultureSlider() {
    await this.varyByCultureSlider.click();
  }

  async clickDocumentTypeSettingsTab() {
    await this.documentTypeSettingsTabBtn.waitFor({state: 'visible'});
    // Sometimes when we switch tabs in the Document Type, we end up not being redirected to the new tab.
    await this.page.waitForLoadState();
    await this.documentTypeSettingsTabBtn.click({force: true});
  }

  async clickDocumentTypeTemplatesTab() {
    await this.documentTypeTemplatesTabBtn.waitFor({state: 'visible'});
    await this.page.waitForLoadState();
    await this.documentTypeTemplatesTabBtn.click({force: true});
  }

  async reorderTwoGroupsInADocumentType() {
    const firstGroup = this.documentTypeGroups.nth(0);
    const secondGroup = this.documentTypeGroups.nth(1);
    const firstGroupValue = await firstGroup.getByLabel('Group', {exact: true}).inputValue();
    const secondGroupValue = await secondGroup.getByLabel('Group', {exact: true}).inputValue();
    const dragToLocator = firstGroup.locator('[name="icon-navigation"]');
    const dragFromLocator = secondGroup.locator('[name="icon-navigation"]');
    await this.dragAndDrop(dragFromLocator, dragToLocator, 0, 0, 10);

    return {firstGroupValue, secondGroupValue};
  }

  async clickVaryBySegmentsButton() {
    await this.varyBySegmentsBtn.click();
  }

  async clickVaryByCultureButton() {
    await this.varyByCultureBtn.click();
  }

  async goToDocumentType(documentTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(documentTypeName).click();
  }

  async enterPropertyEditorDescription(description: string) {
    await this.propertySettingsModal.locator(this.enterDescriptionTxt).fill(description);
  }

  async enterDocumentTypeName(documentTypeName: string) {
    await this.documentNameTxt.waitFor({state: 'visible'});
    await this.documentNameTxt.fill(documentTypeName);
  }

  async clickCreateDocumentTypeButton() {
    await this.createDocumentTypeBtn.click();
  }

  async clickCreateDocumentTypeWithTemplateButton() {
    await this.createDocumentTypeWithTemplateBtn.click();
  }

  async clickCreateElementTypeButton() {
    await this.createElementTypeBtn.click();
  }

  async clickCreateDocumentFolderButton() {
    await this.createDocumentFolderBtn.click();
  }

  async deletePropertyEditorInDocumentTypeWithName(name: string) {
    // We need to hover over the Property Editor to make the delete button visible
    await this.page.locator('umb-content-type-design-editor-property', {hasText: name}).hover();
    await this.page.locator('umb-content-type-design-editor-property', {hasText: name}).getByLabel('Delete').click({force: true});
    await this.clickConfirmToDeleteButton();
  }

  async clickAllowedChildNodesButton() {
    await this.allowedChildNodesModal.locator(this.chooseBtn).click();
  }

  async clickConfigureAsACollectionButton() {
    await this.configureAsACollectionBtn.click();
  }

  async enterDocumentTypeGroupName(groupName: string, index = 0) {
    // We need this wait, otherwise the group name would sometimes not be written
    await this.page.waitForTimeout(500);
    await expect(this.documentTypeGroupNameTxt.nth(index)).toBeVisible();
    await this.documentTypeGroupNameTxt.nth(index).fill(groupName);
  }

  async isDocumentTreeItemVisible(name: string, isVisible = true) {
    await expect(this.page.locator('umb-tree-item').locator('[label="' + name + '"]')).toBeVisible({visible: isVisible});
  }
}