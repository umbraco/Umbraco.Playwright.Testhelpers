import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class PartialViewUiHelper {
  private readonly page: Page;
  private readonly uiBaseLocators: UiBaseLocators;
  private readonly newEmptyPartialViewBtn: Locator;
  private readonly newPartialViewFromSnippetBtn: Locator;
  private readonly partialViewNameTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uiBaseLocators = new UiBaseLocators(this.page);
    this.newEmptyPartialViewBtn = page.getByLabel('New empty partial view');
    this.newPartialViewFromSnippetBtn = page.getByLabel('New partial view from snippet...');
    this.partialViewNameTxt = page.getByLabel('template name');
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

  async createFolder(folderName: string) {
    await this.uiBaseLocators.clickCreateFolderButton()
    await this.uiBaseLocators.folderNameTxt.fill(folderName);
    await this.uiBaseLocators.clickConfirmCreateFolderButton();
  }

  async enterPartialViewName(partialViewName: string) {
    await this.partialViewNameTxt.clear();
    await this.partialViewNameTxt.fill(partialViewName);
  }

  async enterPartialViewContent(partialViewContent: string) {
    await this.uiBaseLocators.textAreaInputArea.clear();
    await this.uiBaseLocators.textAreaInputArea.fill(partialViewContent);
  }

  async openPartialViewAtRoot(partialViewName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(partialViewName).click();
  }

  async deletePartialView() {
    await this.uiBaseLocators.clickDeleteButton();
    await this.uiBaseLocators.clickConfirmToDeleteButton();
  }

  async deleteFolder() {
    await this.uiBaseLocators.deleteFolder();
  }

  async addQueryBuilderIntoPartialViewWithCreateDateOption() {
    await this.uiBaseLocators.addQueryBuilderWithCreateDateOption();
  }

  async insertDictionaryByName(dictionaryName: string) {
    await this.uiBaseLocators.insertDictionaryByName(dictionaryName);
  }
}