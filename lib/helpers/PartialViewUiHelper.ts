import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class PartialViewUiHelper extends UiBaseLocators {
  private readonly newEmptyPartialViewBtn: Locator;
  private readonly newPartialViewFromSnippetBtn: Locator;
  private readonly partialViewTree: Locator;
  private readonly partialViewUiLoader: Locator;
  private readonly newFolderThreeDots: Locator;
  private readonly partialViewCreateModal: Locator;

  constructor(page: Page) {
    super(page);
    this.partialViewCreateModal = page.locator('umb-partial-view-create-options-modal');
    this.newEmptyPartialViewBtn = this.partialViewCreateModal.locator('uui-menu-item', {hasText: 'Empty partial view'});
    this.newPartialViewFromSnippetBtn = this.partialViewCreateModal.locator('uui-menu-item', {hasText: 'Partial view from snippet'});
    this.partialViewTree = page.locator('umb-tree[alias="Umb.Tree.PartialView"]');
    this.partialViewUiLoader = page.locator('uui-loader');
    this.newFolderThreeDots = this.partialViewCreateModal.locator('uui-menu-item', {hasText: 'Folder'});
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

  async clickSaveButtonAndWaitForPartialViewToBeCreated() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/partial-view', this.clickSaveButton(), 201);
  }

  async clickSaveButtonAndWaitForPartialViewToBeUpdated() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/partial-view', this.clickSaveButton(), 200);
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
    await this.enterMonacoEditorValue(partialViewContent);
    // We need this wait, to be sure that the partial view content is loaded.
    await this.page.waitForTimeout(200);
  }

  async openPartialViewAtRoot(partialViewName: string) {
    await this.reloadPartialViewTree();
    await this.page.locator('uui-menu-item[label="' + partialViewName +'"]').click();
    await expect(this.enterAName).toBeVisible();
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
    await expect(this.partialViewUiLoader).toBeVisible({visible: false});
  }

  async isPartialViewRootTreeItemVisible(partialView: string, isVisible: boolean = true, toReload: boolean = true) {
    if (toReload) {
      await this.reloadPartialViewTree();
    }
    return expect(this.partialViewTree.getByText(partialView, {exact: true})).toBeVisible({visible: isVisible});
  }

  async clickConfirmToDeleteButtonAndWaitForPartialViewToBeDeleted() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/partial-view/', this.clickConfirmToDeleteButton(), 200);
  }

  async clickDeleteAndConfirmButtonAndWaitForPartialViewToBeDeleted() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/partial-view/', this.clickDeleteAndConfirmButton(), 200);
  }

  async createPartialViewFolderAndWaitForPartialViewToBeCreated(folderName: string) {
    await this.clickCreateOptionsActionMenuOption();
    await this.newFolderThreeDots.click();
    await this.enterFolderName(folderName);
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/partial-view/folder', this.clickConfirmCreateFolderButton(), 201);
  }

  async renameAndWaitForPartialViewToBeRenamed(newName: string) {
    await this.clickRenameActionMenuOption();
    await expect(this.newNameTxt).toBeVisible();
    await this.newNameTxt.click();
    await this.newNameTxt.clear();
    await this.newNameTxt.fill(newName);
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/partial-view/', this.renameModalBtn.click(), 200);
  }
}