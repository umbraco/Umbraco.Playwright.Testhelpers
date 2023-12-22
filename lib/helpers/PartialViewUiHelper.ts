import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class PartialViewUiHelper extends UiBaseLocators{
  private readonly newEmptyPartialViewBtn: Locator;
  private readonly newPartialViewFromSnippetBtn: Locator;
  private readonly partialViewNameTxt: Locator;

  constructor(page: Page) {
    super(page);
    this.newEmptyPartialViewBtn = page.getByLabel('New empty partial view');
    this.newPartialViewFromSnippetBtn = page.getByLabel('New partial view from snippet...');
    this.partialViewNameTxt = page.getByLabel('template name');
  }

  async clickActionsMenuForPartialView(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForPartialView("Partial Views");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Partial Views");
  }

  async clickNewEmptyPartialViewButton() {
    await this.newEmptyPartialViewBtn.click();
  }

  async clickNewPartialViewFromSnippetButton() {
    await this.newPartialViewFromSnippetBtn.click();
  }

  async createFolder(folderName: string) {
    await this.clickCreateFolderButton()
    await this.folderNameTxt.fill(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async enterPartialViewName(partialViewName: string) {
    await this.partialViewNameTxt.clear();
    await this.partialViewNameTxt.fill(partialViewName);
  }

  async enterPartialViewContent(partialViewContent: string) {
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(partialViewContent);
  }

  async openPartialViewAtRoot(partialViewName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(partialViewName).click();
  }

  async deletePartialView() {
    await this.clickDeleteButton();
    await this.clickConfirmToDeleteButton();
  }
}