import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class PartialViewUiHelper extends UiBaseLocators{
  private readonly newEmptyPartialViewBtn: Locator;
  private readonly newPartialViewFromSnippetBtn: Locator;
  private readonly partialViewNameTxt: Locator;
  private readonly partialViewTree: Locator;

  constructor(page: Page) {
    super(page);
    this.newEmptyPartialViewBtn = page.getByLabel('New empty partial view');
    this.newPartialViewFromSnippetBtn = page.getByLabel('New partial view from snippet...');
    this.partialViewNameTxt = page.getByLabel('Partial view name');
    this.partialViewTree = page.locator("umb-tree[alias='Umb.Tree.PartialView']");
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

  // TODO: this method should place in UiBaseLocator as it is used for Stylesheet and Script as well
  async createFolder(folderName: string) {
    await this.clickNewFolderButton();
    await this.folderNameTxt.fill(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async enterPartialViewName(partialViewName: string) {
    await this.partialViewNameTxt.click();
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

  checkItemNameUnderPartialViewTree(name: string){
    return this.partialViewTree.getByText(name);
  }
}