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

  constructor(page: Page) {
    super(page);
    this.newDocumentTypeBtn = page.getByLabel('New Document Type...');
    this.varyByCultureSlider = page.locator('label').filter({hasText: 'Vary by culture'}).locator('#slider');
    this.documentTypeSettingsTabBtn = page.locator('umb-body-layout').getByRole('tab', {name: 'Settings'});
    this.documentTypeTemplatesTabBtn = page.getByRole('tab', {name: 'Templates'})
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
    await this.newDocumentTypeBtn.click();
  }

  async clickVaryByCultureSlider() {
    await this.varyByCultureSlider.click();
  }

  async clickDocumentTypeSettingsTab() {
    // The wait is necessary, because we have to wait until the document is loaded, otherwise we won't be navigated to the settings tab
    await this.page.waitForTimeout(1000);
    await expect(this.documentTypeSettingsTabBtn).toBeVisible();
    await this.documentTypeSettingsTabBtn.click();
  }

  async clickDocumentTypeTemplatesTab() {
    // The wait is necessary, because we have to wait until the document is loaded, otherwise we won't be navigated to the templates tab
    await this.page.waitForTimeout(1000);
    await expect(this.documentTypeTemplatesTabBtn).toBeVisible();
    await this.documentTypeTemplatesTabBtn.click();
  }

  async clickVaryBySegmentsButton() {
    await this.varyBySegmentsBtn.click();
  }

  async clickVaryByCultureButton() {
    await this.varyByCultureBtn.click();
  }

  async clickPreventCleanupButton() {
    await this.preventCleanupBtn.click();
  }

  async goToDocumentType(documentTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(documentTypeName).click();
  }

  async enterDocumentTypeName(documentTypeName: string) {
    await this.enterAName.waitFor({state: 'visible'});
    await this.enterAName.fill(documentTypeName);
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

  async isDocumentTreeItemVisible(name: string, isVisible = true) {
    await expect(this.page.locator('umb-tree-item').locator('[label="' + name + '"]')).toBeVisible({visible: isVisible});
  }

  async clickSetAsDefaultButton() {
    await this.setAsDefaultBtn.click();
  }
}