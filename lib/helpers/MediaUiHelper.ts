import {UiBaseLocators} from "./UiBaseLocators";
import {expect, Locator, Page} from "@playwright/test";

export class MediaUiHelper extends UiBaseLocators {
  private readonly createMediaItemBtn: Locator;
  private readonly mediaNameTxt: Locator;
  private readonly actionModalCreateBtn: Locator;
  private readonly mediaSearchTxt: Locator;
  private readonly trashBtn: Locator;
  private readonly restoreThreeDotsBtn: Locator;
  private readonly restoreBtn: Locator;
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

  constructor(page: Page) {
    super(page);
    this.createMediaItemBtn = page.locator('umb-create-media-collection-action').getByLabel('Create');
    this.mediaNameTxt = page.locator('#name-input #input');
    this.actionModalCreateBtn = page.locator('#action-modal').getByLabel('Create');
    this.mediaSearchTxt = page.getByLabel('Search', {exact: true});
    this.trashBtn = page.getByLabel(/^Trash(\.\.\.)?$/);
    this.restoreThreeDotsBtn = page.getByRole('button', {name: 'Restore...'});
    this.restoreBtn = page.getByLabel('Restore', {exact: true});
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
    this.mediaHeaderActionsMenu = page.locator('#header >> [label="Open actions menu"]');
    this.emptyRecycleBinBtn = page.locator('[label="Empty Recycle Bin"]').locator('svg');
    this.mediaTreeItem = page.locator('umb-media-tree-item');
    this.mediaPopoverLayout = page.locator('umb-popover-layout');
  }

  async clickCreateMediaItemButton() {
    await this.createMediaItemBtn.click();
  }

  async enterMediaItemName(name: string) {
    await this.mediaNameTxt.clear();
    await this.mediaNameTxt.fill(name);
  }

  async clickMediaTypeWithNameButton(mediaTypeName: string) {
    await this.page.getByLabel(mediaTypeName, {exact: true}).click();
  }

  async searchForMediaItemByName(name: string) {
    await this.mediaSearchTxt.clear();
    await this.mediaSearchTxt.fill(name);
  }

  async doesMediaCardsContainAmount(count: number) {
    await expect(this.mediaCardItems).toHaveCount(count);
  }

  async doesMediaCardContainText(name: string) {
    await expect(this.mediaCardItems).toContainText(name);
  }

  async clickTrashButton() {
    await this.trashBtn.click();
  }

  async restoreMediaItem(name: string) {
    await this.clickActionsMenuForName(name);
    await this.restoreThreeDotsBtn.click();
    await this.page.waitForTimeout(1000);
    await this.restoreBtn.click();
  }

  async deleteMediaItem(name: string) {
    await this.clickActionsMenuForName(name);
    await this.clickDeleteButton();
    await this.clickConfirmToDeleteButton();
  }

  async clickCreateMediaWithType(mediaTypeName: string) {
    await expect(this.mediaCreateBtn).toBeVisible();
    await this.mediaCreateBtn.click();
    await this.clickMediaTypeInPopoverByName(mediaTypeName);
  }

  async clickMediaTypeName(mediaTypeName: string) {
    await this.documentTypeNode.filter({hasText: mediaTypeName}).click();
  }

  async clickMediaTypeInPopoverByName(mediaTypeName: string) {
    await this.mediaPopoverLayout.getByLabel(mediaTypeName).click();
  }

  async clickEmptyRecycleBinButton() {
    await this.recycleBinMenuItem.hover();
    await this.emptyRecycleBinBtn.click();
  }

  async clickConfirmEmptyRecycleBinButton() {
    await this.confirmEmptyRecycleBinBtn.click();
  }

  async clickCreateModalButton() {
    await this.actionModalCreateBtn.click();
  }

  async clickMediaCaretButtonForName(name: string) {
    await this.page.locator('umb-media-tree-item [label="' + name + '"]').locator('#caret-button').click();
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

  async clickBulkTrashButton() {
    await this.bulkTrashBtn.click();
  }

  async clickBulkMoveToButton() {
    await this.bulkMoveToBtn.click();
  }

  async clickModalTextByName(name: string) {
    await this.sidebarModal.getByLabel(name, {exact: true}).click();
  }

  async reloadMediaTree() {
    // Waits until the tree item is visible
    await expect(this.mediaHeader).toBeVisible();
    await this.page.waitForTimeout(500);
    await this.mediaHeader.click();
    await this.mediaHeaderActionsMenu.click()
    await this.clickReloadButton();
  }

  async isMediaTreeItemVisible(name: string, isVisible: boolean = true) {
    return expect(this.mediaTreeItem.getByLabel(name, {exact: true})).toBeVisible({visible: isVisible});
  }

  async isChildMediaVisible(parentName: string, childName: string, isVisible: boolean = true) {
    return expect(this.mediaTreeItem.filter({hasText: parentName}).getByLabel(childName)).toBeVisible({visible: isVisible});
  }

  async clickCaretButtonForMediaName(name: string) {
    await this.mediaTreeItem.filter({hasText: name}).last().locator('#caret-button').last().click();
  }

  async goToMediaWithName(mediaName: string) {
    await this.mediaTreeItem.getByText(mediaName, {exact: true}).click();
  }
}