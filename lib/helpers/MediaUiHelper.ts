import {UiBaseLocators} from "./UiBaseLocators";
import {expect, Locator, Page} from "@playwright/test";
import {ConstantHelper} from "./ConstantHelper";

export class MediaUiHelper extends UiBaseLocators {
  private readonly createMediaItemBtn: Locator;
  private readonly mediaNameTxt: Locator;
  private readonly actionModalCreateBtn: Locator;
  private readonly mediaSearchTxt: Locator;
  private readonly trashBtn: Locator;
  private readonly restoreThreeDotsBtn: Locator;
  private readonly confirmEmptyRecycleBinBtn: Locator;
  private readonly mediaCreateBtn: Locator;
  private readonly mediaListHeader: Locator;
  private readonly mediaCardItemsValues: Locator;
  private readonly mediaListView: Locator;
  private readonly mediaGridView: Locator;
  private readonly mediaListNameValues: Locator;
  private readonly bulkTrashBtn: Locator;
  private readonly bulkMoveToBtn: Locator;
  private readonly mediaHeader: Locator;
  private readonly mediaHeaderActionsMenu: Locator;
  private readonly emptyRecycleBinBtn: Locator;
  private readonly mediaTreeItem: Locator;
  private readonly mediaPopoverLayout: Locator;
  private readonly mediaWorkspace: Locator;

  constructor(page: Page) {
    super(page);
    this.createMediaItemBtn = page.locator('umb-create-media-collection-action').getByLabel('Create');
    this.mediaNameTxt = page.locator('#name-input #input');
    this.actionModalCreateBtn = page.locator('#action-modal').getByLabel('Create');
    this.mediaSearchTxt = page.getByLabel('Search', {exact: true});
    this.trashBtn = page.getByLabel(/^Trash(…)?$/);
    this.restoreThreeDotsBtn = page.getByRole('button', {name: 'Restore…'});
    this.confirmEmptyRecycleBinBtn = page.locator('#confirm').getByLabel('Empty Recycle Bin', {exact: true});
    this.mediaCreateBtn = this.page.locator('umb-collection-toolbar').getByLabel('Create');
    this.mediaListView = this.page.locator('umb-media-table-collection-view');
    this.mediaGridView = this.page.locator('umb-media-grid-collection-view');
    this.mediaListHeader = this.mediaListView.locator('uui-table-head-cell span');
    this.mediaCardItemsValues = this.mediaCardItems.locator('span');
    this.mediaListNameValues = this.mediaListView.locator('umb-media-table-column-name span');
    this.bulkTrashBtn = page.locator('umb-entity-bulk-action uui-button').filter({hasText: 'Trash'});
    this.bulkMoveToBtn = page.locator('umb-entity-bulk-action uui-button').filter({hasText: 'Move to'});
    this.mediaHeader = page.getByRole('heading', {name: 'Media'});
    this.mediaHeaderActionsMenu = page.locator('#header #action-modal');
    this.emptyRecycleBinBtn = page.locator('[label="Empty Recycle Bin"]').locator('svg');
    this.mediaTreeItem = page.locator('umb-media-tree-item');
    this.mediaPopoverLayout = page.locator('umb-popover-layout');
    this.mediaWorkspace = page.locator('umb-media-workspace-editor');
  }

  async clickCreateMediaItemButton() {
    await this.click(this.createMediaItemBtn);
  }

  async enterMediaItemName(name: string) {
    await this.enterText(this.mediaNameTxt, name, {verify: true});
  }

  async clickMediaTypeWithNameButton(mediaTypeName: string) {
    await this.click(this.page.getByLabel(mediaTypeName, {exact: true}));
  }

  async searchForMediaItemByName(name: string) {
    await this.enterText(this.mediaSearchTxt, name);
  }

  async doesMediaCardsContainAmount(count: number) {
    await expect(this.mediaCardItems).toHaveCount(count);
  }

  async doesMediaCardContainText(name: string) {
    await expect(this.mediaCardItems).toContainText(name);
  }

  async clickTrashButton() {
    await this.click(this.trashBtn);
  }

  async restoreMediaItem(name: string) {
    await this.clickActionsMenuForName(name);
    await this.click(this.restoreThreeDotsBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.medium);
    await this.clickRestoreButton();
  }

  async waitForMediaToBeTrashed() {
    await this.waitForLoadState();
  }

  async waitForRecycleBinToBeEmptied() {
    await this.waitForLoadState();
  }

  async waitForMediaToBeMoved() {
    await this.waitForLoadState();
  }

  async waitForMediaItemToBeCreated() {
    await this.waitForLoadState();
  }

  async deleteMediaItem(name: string) {
    await this.clickActionsMenuForName(name);
    await this.clickDeleteActionMenuOption();
    await this.clickConfirmToDeleteButton();
  }

  async clickCreateMediaWithType(mediaTypeName: string) {
    await this.click(this.mediaCreateBtn);
    await this.clickMediaTypeInPopoverByName(mediaTypeName);
  }

  async clickMediaTypeName(mediaTypeName: string) {
    await this.click(this.documentTypeNode.filter({hasText: mediaTypeName}));
  }

  async clickMediaTypeInPopoverByName(mediaTypeName: string) {
    await this.click(this.mediaPopoverLayout.getByLabel(mediaTypeName));
  }

  async clickEmptyRecycleBinButton() {
    // Force click is needed
    await this.hoverAndClick(this.recycleBinMenuItem, this.emptyRecycleBinBtn, {force: true});
  }

  async clickConfirmEmptyRecycleBinButton() {
    await this.click(this.confirmEmptyRecycleBinBtn);
  }

  async clickCreateModalButton() {
    await this.click(this.actionModalCreateBtn);
  }

  async clickMediaCaretButtonForName(name: string) {
    await this.click(this.page.locator(`umb-media-tree-item [label="${name}"]`).locator('#caret-button'));
  }

  async openMediaCaretButtonForName(name: string) {
    const menuItem = this.page.locator(`umb-media-tree-item [label="${name}"]`);
    const isCaretButtonOpen = await menuItem.getAttribute('show-children');

    if (isCaretButtonOpen === null) {
      await this.clickMediaCaretButtonForName(name);
    }
  }
  
  async doesMediaGridValuesMatch(expectedValues: string[]) {
    return expectedValues.forEach((text, index) => {
      expect(this.mediaCardItemsValues.nth(index)).toHaveText(text);
    });
  }

  async doesMediaListHeaderValuesMatch(expectedValues: string[]) {
    return expectedValues.forEach((text, index) => {
      expect(this.mediaListHeader.nth(index)).toHaveText(text);
    });
  }

  async doesMediaListNameValuesMatch(expectedValues: string[]) {
    return expectedValues.forEach((text, index) => {
      expect(this.mediaListNameValues.nth(index)).toHaveText(text);
    });
  }

  async isMediaGridViewVisible(isVisible: boolean = true) {
    return expect(this.mediaGridView).toBeVisible({visible: isVisible});
  }

  async isMediaListViewVisible(isVisible: boolean = true) {
    return expect(this.mediaListView).toBeVisible({visible: isVisible});
  }

  async doesMediaWorkspaceHaveText(text: string) {
    return expect(this.mediaWorkspace).toContainText(text);
  }

  async clickBulkTrashButton() {
    await this.click(this.bulkTrashBtn);
  }

  async clickBulkMoveToButton() {
    await this.click(this.bulkMoveToBtn);
  }

  async clickModalTextByName(name: string) {
    await this.click(this.sidebarModal.getByLabel(name, {exact: true}));
  }

  async reloadMediaTree() {
    await this.click(this.mediaHeader);
    await this.click(this.mediaHeaderActionsMenu, {force: true});
    await this.clickReloadChildrenActionMenuOption();
  }

  async isMediaTreeItemVisible(name: string, isVisible: boolean = true) {
    return expect(this.mediaTreeItem.getByLabel(name, {exact: true})).toBeVisible({visible: isVisible});
  }

  async doesMediaItemInTreeHaveThumbnail(name: string, thumbnailIconName: string) {
    const mediaThumbnailIconLocator = this.page.locator(`umb-media-tree-item [label="${name}"]`).locator('#icon-container #icon');
    await expect(mediaThumbnailIconLocator).toHaveAttribute('name', thumbnailIconName);
  }

  async isChildMediaVisible(parentName: string, childName: string, isVisible: boolean = true) {
    return expect(this.mediaTreeItem.filter({hasText: parentName}).getByText(childName, {exact: true})).toBeVisible({visible: isVisible});
  }

  async clickCaretButtonForMediaName(name: string) {
    await this.click(this.mediaTreeItem.filter({hasText: name}).last().locator('#caret-button').last());
  }

  async goToMediaWithName(mediaName: string) {
    await this.click(this.mediaTreeItem.getByText(mediaName, {exact: true}));
  }
}