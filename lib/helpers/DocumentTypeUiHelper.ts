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
  private readonly saveDocumentTypeBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.newDocumentTypeBtn = page.getByLabel('New Document Type…');
    this.sharedAcrossCulturesToggle = page.locator('label').filter({hasText: 'Shared across cultures'}).locator('#toggle');
    this.tabGroup = page.locator('[data-mark="workspace:view-links"]');
    this.documentTypeSettingsTabBtn = this.tabGroup.locator('[data-mark*="Settings"]');
    this.documentTypeTemplatesTabBtn = this.tabGroup.locator('[data-mark*="Templates"]');
    this.varyBySegmentsBtn = page.getByText('Vary by segment', {exact: true});
    this.varyByCultureBtn = page.getByText('Vary by culture', {exact: true});
    this.createDocumentTypeBtn = page.locator('umb-ref-item').getByText('Document Type', {exact: true});
    this.createDocumentTypeWithTemplateBtn = page.locator('umb-ref-item').getByText('Document Type with Template', {exact: true});
    this.createElementTypeBtn = page.locator('umb-ref-item').getByText('Element Type', {exact: true});
    this.createDocumentFolderBtn = page.locator('umb-ref-item').getByText('Folder', {exact: true});
    this.preventCleanupBtn = page.getByText('Prevent cleanup');
    this.setAsDefaultBtn = page.getByText('Set as default');
    this.documentTypesMenu = page.locator('#menu-item').getByRole('link', {name: 'Document Types'});
    this.saveDocumentTypeBtn = page.locator('[data-mark="workspace-action:Umb.WorkspaceAction.DocumentType.Save"]');
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

  async isSuccessStateVisibleForSaveButton (isVisible: boolean = true){
    const saveBtn = this.workspaceAction.filter({has: this.saveDocumentTypeBtn});
    await expect(saveBtn.locator(this.successState)).toBeVisible({visible: isVisible, timeout: 10000});
  }

  async clickNewDocumentTypeButton() {
    await expect(this.newDocumentTypeBtn).toBeVisible();
    await this.newDocumentTypeBtn.click();
  }

  async clickSharedAcrossCulturesToggle() {
    await expect(this.sharedAcrossCulturesToggle).toBeVisible();
    await this.sharedAcrossCulturesToggle.click();
  }

  async clickDocumentTypeSettingsTab() {
    await expect(this.documentTypeSettingsTabBtn).toBeVisible();
    await this.documentTypeSettingsTabBtn.click();
  }

  async clickDocumentTypeTemplatesTab() {
    await expect(this.documentTypeTemplatesTabBtn).toBeVisible();
    await this.documentTypeTemplatesTabBtn.click();
  }

  async clickVaryBySegmentsButton() {
    await expect(this.varyBySegmentsBtn).toBeVisible();
    await this.varyBySegmentsBtn.click();
  }

  async clickVaryByCultureButton() {
    await expect(this.varyByCultureBtn).toBeVisible();
    await this.varyByCultureBtn.click();
  }

  async clickPreventCleanupButton() {
    await expect(this.preventCleanupBtn).toBeVisible();
    await this.preventCleanupBtn.click();
  }

  async goToDocumentType(documentTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.clickLabelWithName(documentTypeName);
  }

  async enterDocumentTypeName(documentTypeName: string) {
    await expect(this.enterAName).toBeVisible();
    await this.enterAName.fill(documentTypeName);
    await expect(this.enterAName).toHaveValue(documentTypeName);
  }

  async clickCreateDocumentTypeButton() {
    await expect(this.createDocumentTypeBtn).toBeVisible();
    await this.createDocumentTypeBtn.click();
  }

  async clickCreateDocumentTypeWithTemplateButton() {
    await expect(this.createDocumentTypeWithTemplateBtn).toBeVisible();
    await this.createDocumentTypeWithTemplateBtn.click();
  }

  async clickCreateElementTypeButton() {
    await expect(this.createElementTypeBtn).toBeVisible();
    await this.createElementTypeBtn.click();
  }

  async clickCreateDocumentFolderButton() {
    await expect(this.createDocumentFolderBtn).toBeVisible();
    await this.createDocumentFolderBtn.click();
  }

  async isDocumentTreeItemVisible(name: string, isVisible = true) {
    await expect(this.page.locator('umb-tree-item').locator('[label="' + name + '"]')).toBeVisible({visible: isVisible});
  }

  async clickSetAsDefaultButton() {
    await expect(this.setAsDefaultBtn).toBeVisible();
    await this.setAsDefaultBtn.click();
  }

  async clickDocumentTypesMenu() {
    await expect(this.documentTypesMenu).toBeVisible();
    await this.documentTypesMenu.click();
  }
}