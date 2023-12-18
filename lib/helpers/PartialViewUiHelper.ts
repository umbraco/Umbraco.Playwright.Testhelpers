import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class PartialViewUiHelper {
  private readonly page: Page;
  private readonly uiBaseLocators: UiBaseLocators;
  private readonly newEmptyPartialViewBtn: Locator;
  private readonly newPartialViewFromSnippetBtn: Locator;
  private readonly partialViewContentTxt: Locator;
  private readonly partialViewNameTxt: Locator;
  private readonly folderNameTxt: Locator;
  private readonly queryBuilderButton: Locator;
  private readonly whereDropdown: Locator;
  private readonly createDateOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uiBaseLocators = new UiBaseLocators(this.page);
    this.newEmptyPartialViewBtn = page.getByLabel('New empty partial view');
    this.newPartialViewFromSnippetBtn = page.getByLabel('New partial view from snippet...');
    this.partialViewNameTxt = page.getByLabel('template name');
    this.partialViewContentTxt = page.locator('textarea.inputarea');
    this.queryBuilderButton = page.locator('#query-builder-button').getByLabel('Query builder');
    this.whereDropdown = page.locator('#property-alias-dropdown').getByLabel('Property alias');
    this.createDateOption = page.locator('#property-alias-dropdown').getByText('CreateDate');
    this.folderNameTxt = page.getByRole('textbox', {name: 'Enter folder name...'});
  }

  async clickActionsMenuForPartialView(name: string) {
    await this.uiBaseLocators.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForPartialView("Partial Views");
  }

  async clickRootFolderCaretButton() {
    await this.uiBaseLocators.clickCaretButtonForName("Partial Views");
  }

  async clickCaretButtonForName(name: string) {
    await this.uiBaseLocators.clickCaretButtonForName(name);
  }

  async clickNewEmptyPartialViewButton() {
    await this.newEmptyPartialViewBtn.click();
  }

  async clickNewPartialViewFromSnippetButton() {
    await this.newPartialViewFromSnippetBtn.click();
  }

  async clickSaveButton() {
    await this.uiBaseLocators.clickSaveButton();
  }

  async clickBreadcrumbButton() {
    await this.uiBaseLocators.clickBreadcrumbButton();
  }

  async createNewFolder(folderName: string) {
    await this.uiBaseLocators.clickCreateFolderButton()
    await this.folderNameTxt.fill(folderName);
    await this.uiBaseLocators.clickConfirmCreateFolderButton();
  }

  async enterPartialViewName(partialViewName: string) {
    await this.partialViewNameTxt.clear();
    await this.partialViewNameTxt.fill(partialViewName);
  }

  async enterPartialViewContent(partialViewContent: string) {
    await this.partialViewContentTxt.clear();
    await this.partialViewContentTxt.fill(partialViewContent);
  }

  async openPartialViewAtRoot(partialViewName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(partialViewName).click();
  }

  async deletePartialView() {
    await this.uiBaseLocators.clickDeleteButton();
    await this.uiBaseLocators.clickConfirmToDeleteButton();
  }

  async removeFolder() {
    await this.uiBaseLocators.clickDeleteFolderButton();
    await this.uiBaseLocators.clickConfirmToDeleteButton();
  }

  async addQueryBuilderIntoPartialViewWithCreateDateOption() {
    await this.queryBuilderButton.click({force: true});
    // TODO: Remove this timeout when frontend validation is implemented
    await this.page.waitForTimeout(1000);
    await this.whereDropdown.click({force: true});
    await this.createDateOption.click();
    await this.uiBaseLocators.clickSubmitButton();
  }

  async insertDictionaryItem(dictionaryName: string) {
    await this.uiBaseLocators.clickInsertButton();
    await this.uiBaseLocators.clickDictionaryInsertItemButton();
    await this.uiBaseLocators.clickCaretDictionaryButton();
    await this.page.getByLabel(dictionaryName).click();
    await this.uiBaseLocators.clickSubmitButton();
  }
}