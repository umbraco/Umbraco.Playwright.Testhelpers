import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class ContentUiHelper extends UiBaseLocators {
  private readonly contentNameTxt: Locator;
  private readonly saveAndPublishBtn: Locator;
  private readonly actionsBtn: Locator;
  private readonly publishBtn: Locator;
  private readonly unpublishBtn: Locator;
  private readonly actionMenuForContentBtn: Locator;
  private readonly openedModal: Locator;
  private readonly textstringTxt: Locator;
  private readonly linkContent: Locator;
  private readonly historyItems: Locator;
  private readonly generalItem: Locator;
  private readonly publicationStatus: Locator;
  private readonly createdDate: Locator;
  private readonly editDocumentTypeBtn: Locator;
  private readonly addTemplateBtn: Locator;
  private readonly id: Locator;

  constructor(page: Page) {
    super(page);
    this.contentNameTxt = page.locator('#name-input input');
    this.saveAndPublishBtn = page.getByLabel('Save And Publish');
    this.actionsBtn = page.getByLabel('Actions', { exact: true });
    this.publishBtn = page.getByLabel('Publish', { exact: true });
    this.unpublishBtn = page.getByLabel('Unpublish', { exact: true });
    this.actionMenuForContentBtn = page.locator('#header [label="Open actions menu"]');
    this.openedModal = page.locator('uui-modal-container[backdrop]');
    this.textstringTxt = page.locator('umb-property-layout[label="Textstring"] #input');
    // Info tab
    this.linkContent = page.locator('link-content');
    this.historyItems = page.locator('umb-history-item');
    this.generalItem = page.locator('general-item');
    this.publicationStatus = this.generalItem.filter({hasText: 'Publication Status'}).locator('umb-localize');
    this.createdDate = this.generalItem.filter({hasText: 'Created'}).locator('umb-localize-date');
    this.editDocumentTypeBtn = this.generalItem.filter({hasText: 'Document Type'}).locator('#button');
    this.addTemplateBtn = this.generalItem.filter({hasText: 'Template'}).locator('#button');
    this.id = this.generalItem.filter({hasText: 'Id'}).locator('span');
  }

  async enterContentName(name: string) {
    expect(this.contentNameTxt).toBeVisible({timeout: 5000});
    await this.contentNameTxt.clear();
    await this.contentNameTxt.fill(name);
  }

  async clickSaveAndPublishButton() {
    await this.saveAndPublishBtn.click();
  }

  async clickActionsButton() {
    await this.actionsBtn.click();
  }

  async clickPublishButton() {
    await this.publishBtn.click();
  }

  async clickUnpublishButton() {
    await this.unpublishBtn.click();
  }

  async clickActionsMenuAtRoot() {
    await this.actionMenuForContentBtn.click();
  }

  async openContent(contentName: string) {
    await this.page.locator('umb-menu-item-tree-default').getByText(contentName, {exact: true}).click();
  }

  async clickActionsMenuForContent(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async waitForModalVisible() {
    await this.openedModal.waitFor({state: 'attached', timeout: 5000});
  }

  async waitForModalHidden() {
    await this.openedModal.waitFor({state: 'hidden', timeout: 5000});
  }

  async enterTextstring(text: string) {
    await this.textstringTxt.clear();
    await this.textstringTxt.fill(text);
  }

  // Info Tab
  async doesLinkHaveText(text: string) {
    expect(this.linkContent).toHaveText(text, {timeout: 5000});
  }

  async doesHistoryHaveText(text: string) {
    expect(this.historyItems).toHaveText(text, {timeout: 5000});
  }

  async doesPublicationStatusHaveText(text: string) {
    expect(this.publicationStatus).toHaveText(text, {timeout: 5000});
  }

  async doesCreatedDateHaveText(text: string) {
    expect(this.createdDate).toHaveText(text, {timeout: 5000});
  }

  async doesIdHaveText(text: string) {
    expect(this.id).toHaveText(text, {timeout: 5000});
  }

  async clickEditDocumentTypeButton() {
    await this.editDocumentTypeBtn.click();
  }

  async clickAddTemplateButton() {
    await this.addTemplateBtn.click();
  }
}
