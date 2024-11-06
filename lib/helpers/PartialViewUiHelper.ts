import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class PartialViewUiHelper extends UiBaseLocators {
  private readonly newEmptyPartialViewBtn: Locator;
  private readonly newPartialViewFromSnippetBtn: Locator;
  private readonly partialViewTree: Locator;
  private readonly partialViewUiLoader: Locator;

  constructor(page: Page) {
    super(page);
    this.newEmptyPartialViewBtn = page.getByLabel('New empty partial view');
    this.newPartialViewFromSnippetBtn = page.getByLabel('New partial view from snippet...');
    this.partialViewTree = page.locator('umb-tree[alias="Umb.Tree.PartialView"]');
    this.partialViewUiLoader = page.locator('uui-loader');
  }

  async clickActionsMenuForPartialView(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForPartialView('Partial Views');
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName('Partial Views');
  }

  async clickNewEmptyPartialViewButton() {
    await this.newEmptyPartialViewBtn.click();
  }

  async clickNewPartialViewFromSnippetButton() {
    await this.newPartialViewFromSnippetBtn.click();
  }

  async enterPartialViewName(partialViewName: string) {
    await expect(this.enterAName).toBeVisible();
    await this.enterAName.click();
    await this.enterAName.clear();
    await this.enterAName.fill(partialViewName);
  }

  async enterPartialViewContent(partialViewContent: string) {
    await this.waitUntilPartialViewLoaderIsNoLongerVisible();
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(partialViewContent);
  }

  async openPartialViewAtRoot(partialViewName: string) {
    await this.reloadPartialViewTree();
    await this.page.getByLabel(partialViewName).click();
    await expect(this.enterAName).toBeVisible();
  }

  async reloadPartialViewTree() {
    await this.reloadTree('Partial Views');
  }

  async waitUntilPartialViewLoaderIsNoLongerVisible() {
    await expect(this.partialViewUiLoader).toBeVisible({visible: false});
  }

  async isPartialViewRootTreeItemVisible(partialView: string, isVisible: boolean = true, toReload: boolean = true) {
    if (toReload) {
      await this.reloadPartialViewTree();
    }
    return expect(this.partialViewTree.getByText(partialView, {exact: true})).toBeVisible({visible: isVisible});
  }
}