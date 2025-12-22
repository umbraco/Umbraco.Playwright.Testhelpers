import {ConstantHelper} from "./ConstantHelper";
import {UiBaseLocators} from "./UiBaseLocators";
import {expect, Locator, Page} from "@playwright/test";

export class DocumentTypeUiHelper extends UiBaseLocators {
  private readonly newDocumentTypeBtn: Locator;
  private readonly sharedAcrossCulturesToggle: Locator;
  private readonly documentTypeSettingsTabBtn: Locator;
  private readonly documentTypeTemplatesTabBtn: Locator;
  private readonly varyBySegmentsBtn: Locator;
  private readonly varyByCultureBtn: Locator;
  private readonly createDocumentTypeBtn: Locator;
  private readonly createDocumentTypeWithTemplateBtn: Locator;
  private readonly createElementTypeBtn: Locator;
  private readonly createDocumentFolderBtn: Locator;
  private readonly preventCleanupBtn: Locator;
  private readonly setAsDefaultBtn: Locator;
  private readonly tabGroup: Locator;
  private readonly documentTypesMenu: Locator;
  private readonly createDocumentModal: Locator;

  constructor(page: Page) {
    super(page);
    this.createDocumentModal = page.locator('umb-entity-create-option-action-list-modal');
    this.newDocumentTypeBtn = page.getByLabel('New Document Type…');
    this.sharedAcrossCulturesToggle = page.locator('label').filter({hasText: 'Shared across cultures'}).locator('#toggle');
    this.tabGroup = page.getByTestId('workspace:view-links');
    this.documentTypeSettingsTabBtn = this.tabGroup.locator('[data-mark*="Settings"]');
    this.documentTypeTemplatesTabBtn = this.tabGroup.locator('[data-mark*="Templates"]');
    this.varyBySegmentsBtn = page.getByText('Vary by segment', {exact: true});
    this.varyByCultureBtn = page.getByText('Vary by culture', {exact: true});
    this.createDocumentTypeBtn = this.createDocumentModal.locator('umb-ref-item').getByText('Document Type', {exact: true});
    this.createDocumentTypeWithTemplateBtn = this.createDocumentModal.locator('umb-ref-item', {hasText: 'Document Type with template'});
    this.createElementTypeBtn = this.createDocumentModal.locator('umb-ref-item', {hasText: 'Element Type'});
    this.createDocumentFolderBtn = this.createDocumentModal.locator('umb-ref-item', {hasText: 'Folder'});
    this.preventCleanupBtn = page.getByText('Prevent clean up');
    this.setAsDefaultBtn = page.getByText('Set as default');
    this.documentTypesMenu = page.locator('#menu-item').getByRole('link', {name: 'Document Types'});
  }

  async clickActionsMenuForDocumentType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForDocumentType("Document Types");
  }

  async clickRootFolderCaretButton() {
    await this.openCaretButtonForName('Document Types');
  }

  async clickNewDocumentTypeButton() {
    await this.click(this.newDocumentTypeBtn);
  }

  async clickSharedAcrossCulturesToggle() {
    await this.click(this.sharedAcrossCulturesToggle);
  }

  async clickDocumentTypeSettingsTab() {
    await this.click(this.documentTypeSettingsTabBtn);
  }

  async clickDocumentTypeTemplatesTab() {
    await this.click(this.documentTypeTemplatesTabBtn);
  }

  async clickVaryBySegmentsButton() {
    await this.click(this.varyBySegmentsBtn);
  }

  async clickVaryByCultureButton() {
    await this.click(this.varyByCultureBtn);
  }

  async clickPreventCleanupButton() {
    await this.click(this.preventCleanupBtn);
  }

  async goToDocumentType(documentTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.clickLabelWithName(documentTypeName);
  }

  async waitForDocumentTypeToBeCreated() {
    await this.waitForLoadState();
    // Extra wait as document type creation seems to take a bit longer sometimes
    await this.waitForTimeout(ConstantHelper.wait.short);
  }

  async waitForDocumentTypeToBeDeleted() {
    await this.waitForLoadState();
  }

  async waitForDocumentTypeToBeRenamed() {
    await this.waitForLoadState();
  }
  
  async enterDocumentTypeName(documentTypeName: string) {
    await this.enterText(this.enterAName, documentTypeName, {verify: true});
  }

  async clickCreateDocumentTypeButton() {
    await this.click(this.createDocumentTypeBtn);
  }

  async clickCreateDocumentTypeWithTemplateButton() {
    await this.click(this.createDocumentTypeWithTemplateBtn);
  }

  async clickCreateElementTypeButton() {
    await this.click(this.createElementTypeBtn);
  }

  async clickCreateDocumentFolderButton() {
    await this.click(this.createDocumentFolderBtn);
  }

  async isDocumentTreeItemVisible(name: string, isVisible = true) {
    const documentTreeItem = this.page.locator('umb-tree-item').locator(`[label="${name}"]`);
    await this.isVisible(documentTreeItem, isVisible);
  }

  async clickSetAsDefaultButton() {
    await this.click(this.setAsDefaultBtn);
  }

  async clickDocumentTypesMenu() {
    await this.click(this.documentTypesMenu);
  }
}