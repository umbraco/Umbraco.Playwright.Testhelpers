import {UiBaseLocators} from "./UiBaseLocators";
import {expect, Locator, Page} from "@playwright/test";

export class DocumentTypeUiHelper extends UiBaseLocators {
  private readonly newDocumentTypeBtn: Locator;
  private readonly varyByCultureSlider: Locator;
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

  constructor(page: Page) {
    super(page);
    this.newDocumentTypeBtn = page.getByLabel('New Document Type...');
    this.varyByCultureSlider = page.locator('label').filter({hasText: 'Vary by culture'}).locator('#slider');
    this.tabGroup = page.locator('[data-mark="workspace:view-links"]');
    this.documentTypeSettingsTabBtn = this.tabGroup.locator('[data-mark*="Settings"]');
    this.documentTypeTemplatesTabBtn = this.tabGroup.locator('[data-mark*="Templates"]');
    this.varyBySegmentsBtn = page.getByText('Vary by segments', {exact: true});
    this.varyByCultureBtn = page.getByText('Vary by culture', {exact: true});
    this.createDocumentTypeBtn = page.locator('umb-ref-item').getByText('Document Type', {exact: true});
    this.createDocumentTypeWithTemplateBtn = page.locator('umb-ref-item').getByText('Document Type with Template', {exact: true});
    this.createElementTypeBtn = page.locator('umb-ref-item').getByText('Element Type', {exact: true});
    this.createDocumentFolderBtn = page.locator('umb-ref-item').getByText('Folder', {exact: true});
    this.preventCleanupBtn = page.getByText('Prevent cleanup');
    this.setAsDefaultBtn = page.getByText('Set as default');
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
    await expect(this.newDocumentTypeBtn).toBeVisible();
    await this.newDocumentTypeBtn.click();
  }

  async clickVaryByCultureSlider() {
    await expect(this.varyByCultureSlider).toBeVisible();
    await this.varyByCultureSlider.click();
  }

  async clickDocumentTypeSettingsTab() {
    // The wait is necessary, because we have to wait until the document is loaded, otherwise we won't be navigated to the settings tab
    // await this.page.waitForTimeout(1000);
    await expect(this.documentTypeSettingsTabBtn).toBeVisible();
    await this.documentTypeSettingsTabBtn.click();
  }

  async clickDocumentTypeTemplatesTab() {
    // The wait is necessary, because we have to wait until the document is loaded, otherwise we won't be navigated to the templates tab
    // await this.page.waitForTimeout(1000);
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
    await this.enterAName.waitFor({state: 'visible'});
    await this.enterAName.fill(documentTypeName);
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
}