import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class PartialViewUiHelper extends UiBaseLocators {
  private readonly newEmptyPartialViewBtn: Locator;
  private readonly newPartialViewFromSnippetBtn: Locator;
  private readonly partialViewTree: Locator;
  private readonly partialViewUiLoader: Locator;
  private readonly newFolderThreeDots: Locator;

  constructor(page: Page) {
    super(page);
    this.newEmptyPartialViewBtn = page.getByLabel('New empty partial view');
    this.newPartialViewFromSnippetBtn = page.getByLabel('New partial view from snippet...');
    this.partialViewTree = page.locator('umb-tree[alias="Umb.Tree.PartialView"]');
    this.partialViewUiLoader = page.locator('uui-loader');
    this.newFolderThreeDots = page.getByLabel('New Folder...');
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
    await expect(this.enterAName).toHaveValue(partialViewName);
  }

  async enterPartialViewContent(partialViewContent: string) {
    // The waits in this method is currently needed as the test will fail with expects
    await this.waitUntilPartialViewLoaderIsNoLongerVisible();
    await expect(this.textAreaInputArea).toBeVisible();
    await this.textAreaInputArea.click({force: true});
    await this.page.waitForTimeout(500);
    await this.textAreaInputArea.clear();
    await this.page.waitForTimeout(500);
    await expect(this.textAreaInputArea).toHaveValue('');
    await this.textAreaInputArea.fill(partialViewContent);
    await this.page.waitForTimeout(500);
  }

  async openPartialViewAtRoot(partialViewName: string) {
    await this.reloadPartialViewTree();
    await this.page.getByLabel(partialViewName).click();
    await expect(this.enterAName).toBeVisible();
  }

  async createPartialViewFolder(folderName: string) {
    await this.clickCreateOptionsActionMenu();
    await this.newFolderThreeDots.click();
    await this.enterFolderName(folderName);
    await this.clickConfirmCreateFolderButton();
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