import {Page, Locator, expect} from "@playwright/test"
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
    await expect(this.partialViewNameTxt).toBeVisible();
  }

  async deletePartialView() {
    await this.clickDeleteThreeDotsButton();
    await this.clickConfirmToDeleteButton();
  }

  checkItemNameUnderPartialViewTree(name: string){
    return this.partialViewTree.getByText(name);
  }
}