import {Page, Locator} from "@playwright/test"
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
    await this.openCaretButtonForName('Partial Views');
  }

  async waitForPartialViewToBeCreated() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForPartialViewToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForPartialViewToBeRenamed() {
    await this.waitForNetworkToBeIdle();
  }
  
  async clickNewEmptyPartialViewButton() {
    await this.newEmptyPartialViewBtn.click();
  }

  async clickNewPartialViewFromSnippetButton() {
    await this.newPartialViewFromSnippetBtn.click();
  }

  async enterPartialViewName(partialViewName: string) {
    await this.click(this.enterAName);
    await this.enterText(this.enterAName, partialViewName);
    await this.hasValue(this.enterAName, partialViewName);
  }

  async enterPartialViewContent(partialViewContent: string) {
    // The waits in this method is currently needed as the test will fail with expects
    await this.waitUntilPartialViewLoaderIsNoLongerVisible();
    await this.enterMonacoEditorValue(partialViewContent);
    // We need this wait, to be sure that the partial view content is loaded.
    await this.page.waitForTimeout(200);
  }

  async openPartialViewAtRoot(partialViewName: string) {
    await this.reloadPartialViewTree();
    await this.page.locator('uui-menu-item[label="' + partialViewName +'"]').click();
    await this.isVisible(this.enterAName);
  }

  async createPartialViewFolder(folderName: string) {
    await this.clickCreateOptionsActionMenuOption();
    await this.newFolderThreeDots.click();
    await this.enterFolderName(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async reloadPartialViewTree() {
    await this.reloadTree('Partial Views');
  }

  async waitUntilPartialViewLoaderIsNoLongerVisible() {
    await this.isVisible(this.partialViewUiLoader, false);
  }

  async isPartialViewRootTreeItemVisible(partialView: string, isVisible: boolean = true, toReload: boolean = true) {
    if (toReload) {
      await this.reloadPartialViewTree();
    }
    return this.isVisible(this.partialViewTree.getByText(partialView, {exact: true}), isVisible);
  }
}