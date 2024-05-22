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
  private readonly infoTab: Locator;
  private readonly linkContent: Locator;
  private readonly historyItems: Locator;
  private readonly generalItem: Locator;
  private readonly publicationStatus: Locator;
  private readonly createdDate: Locator;
  private readonly editDocumentTypeBtn: Locator;
  private readonly addTemplateBtn: Locator;
  private readonly id: Locator;
  private readonly cultureAndHostnamesBtn: Locator;
  private readonly cultureLanguageDropdownBox: Locator;
  private readonly addNewDomainBtn: Locator;
  private readonly domainTxt: Locator;
  private readonly domainLanguageDropdownBox: Locator;
  private readonly deleteDomainBtn: Locator;
  private readonly reloadChildrenThreeDotsBtn: Locator;
  private readonly contentTree: Locator;
  private readonly richTextAreaTxt: Locator;
  private readonly textAreaTxt: Locator;
  private readonly plusIconBtn: Locator;
  private readonly enterTagTxt: Locator;

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
    this.reloadChildrenThreeDotsBtn = page.getByRole('button', {name: 'Reload children...'});
    this.contentTree = page.locator('umb-tree[alias="Umb.Tree.Document"]');
    this.richTextAreaTxt = page.frameLocator('iframe[title="Rich Text Area"]').locator('#tinymce');
    this.textAreaTxt = page.locator('umb-property-editor-ui-textarea textarea');
    this.plusIconBtn = page.locator('#icon-add svg');
    this.enterTagTxt = page.getByPlaceholder('Enter tag');
    // Info tab
    this.infoTab = page.getByRole('tab', {name: 'Info'});
    this.linkContent = page.locator('link-content');
    this.historyItems = page.locator('umb-history-item');
    this.generalItem = page.locator('general-item');
    this.publicationStatus = this.generalItem.filter({hasText: 'Publication Status'}).locator('umb-localize');
    this.createdDate = this.generalItem.filter({hasText: 'Created'}).locator('umb-localize-date');
    this.editDocumentTypeBtn = this.generalItem.filter({hasText: 'Document Type'}).locator('#button');
    this.addTemplateBtn = this.generalItem.filter({hasText: 'Template'}).locator('#button');
    this.id = this.generalItem.filter({hasText: 'Id'}).locator('span');
    // Culure and Hostname
    this.cultureAndHostnamesBtn = page.getByLabel('Culture and Hostnames');
    this.cultureLanguageDropdownBox = page.locator('[headline="Culture"]').getByLabel('combobox-input');
    this.addNewDomainBtn = page.getByLabel('Add new domain');
    this.domainTxt = page.getByLabel('Domain', { exact: true });
    this.domainLanguageDropdownBox = page.locator('[headline="Domains"]').getByLabel('combobox-input');
    this.deleteDomainBtn = page.locator('[headline="Domains"] [name="icon-trash"] svg');
  }

  async enterContentName(name: string) {
    await expect(this.contentNameTxt).toBeVisible();
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

  async clickReloadChildrenThreeDotsButton() {
    await this.reloadChildrenThreeDotsBtn.click();
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

  async clickCaretButtonForContentName(name: string) {
    await this.page.locator('umb-menu-item-tree-default').filter({hasText: name}).last().locator('#caret-button').last().click();
  }

  async waitForModalVisible() {
    await this.openedModal.waitFor({state: 'attached'});
  }

  async waitForModalHidden() {
    await this.openedModal.waitFor({state: 'hidden'});
  }

  async enterTextstring(text: string) {
    await this.textstringTxt.clear();
    await this.textstringTxt.fill(text);
  }

  async doesContentTreeHaveName(contentName: string) {
    await expect(this.contentTree).toContainText(contentName);
  }

  async enterRichTextArea(value: string) {
    await expect(this.richTextAreaTxt).toBeVisible();
    await this.richTextAreaTxt.fill(value);
  }

  async enterTextArea(value: string) {
    await expect(this.textAreaTxt).toBeVisible();
    await this.textAreaTxt.fill(value);
  }

  async addTags(tagName: string) {
    await this.plusIconBtn.click();
    await this.enterTagTxt.fill(tagName);
    await this.enterTagTxt.press('Enter');
  }

  async addContentPicker(contentName: string) {
    await this.clickChooseButton();
    await this.page.locator('uui-modal-sidebar').getByText(contentName).click();
    await this.chooseModalBtn.click();
  }

  // Info Tab
  async clickInfoTab() {
    await this.infoTab.click({force: true});
  }

  async doesLinkHaveText(text: string) {
    await expect(this.linkContent).toHaveText(text);
  }

  async doesHistoryHaveText(text: string) {
    await expect(this.historyItems).toHaveText(text);
  }

  async doesPublicationStatusHaveText(text: string) {
    await expect(this.publicationStatus).toHaveText(text);
  }

  async doesCreatedDateHaveText(text: string) {
    await expect(this.createdDate).toHaveText(text);
  }

  async doesIdHaveText(text: string) {
    await expect(this.id).toHaveText(text);
  }

  async clickEditDocumentTypeButton() {
    await this.editDocumentTypeBtn.click();
  }

  async clickAddTemplateButton() {
    await this.addTemplateBtn.click();
  }

  // Culture and Hostnames
  async clickCultureAndHostnamesButton() {
    await this.cultureAndHostnamesBtn.click();
  }

  async selectCultureLanguageOption(option: string) {
    await this.cultureLanguageDropdownBox.click();
    await this.page.getByText(option).click();
  }

  async selectDomainLanguageOption(option: string, index: number = 0) {
    await this.domainLanguageDropdownBox.nth(index).click();
    await this.page.locator('#domains uui-combobox').nth(index).getByText(option).click();
  }

  async clickAddNewDomainButton() {
    await this.addNewDomainBtn.click();
  }

  async enterDomain(value: string, index: number = 0) {
    await this.domainTxt.nth(index).clear();
    await this.domainTxt.nth(index).fill(value);
  }

  async clickDeleteDomainButton() {
    await this.deleteDomainBtn.first().click();
  }
}
