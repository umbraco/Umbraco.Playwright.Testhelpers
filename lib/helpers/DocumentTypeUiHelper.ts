import {UiBaseLocators} from "./UiBaseLocators";
import {Locator, Page} from "@playwright/test";

export class DocumentTypeUiHelper extends UiBaseLocators {
  private readonly newDocumentTypeBtn: Locator;
  private readonly documentNameTxt: Locator;
  private readonly varyByCultureSlider: Locator;
  private readonly documentTypeSettingsTabBtn: Locator;
  private readonly documentTypeTemplatesTabBtn: Locator;
  private readonly varyBySegmentsBtn: Locator;
  private readonly varyByCultureBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.newDocumentTypeBtn = page.getByLabel('New Document Type...');
    this.documentNameTxt = page.getByLabel('name', {exact: true});
    this.varyByCultureSlider = page.locator('label').filter({hasText: 'Vary by culture'}).locator('#slider');
    this.documentTypeSettingsTabBtn = page.locator('umb-body-layout').getByRole('tab', {name: 'Settings'});
    this.documentTypeTemplatesTabBtn = page.getByRole('tab', {name: 'Templates'})
    this.varyBySegmentsBtn = page.getByText('Vary by segments', {exact: true});
    this.varyByCultureBtn = page.getByText('Vary by culture', {exact: true});
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
    await this.page.waitForTimeout(200);
    await this.documentTypeSettingsTabBtn.click({force: true});
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

  async goToDocumentType(documentTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(documentTypeName).click();
  }

  async enterDocumentTypeName(documentTypeName: string) {
    await this.page.waitForTimeout(200);
    await this.documentNameTxt.fill(documentTypeName);
  }
}