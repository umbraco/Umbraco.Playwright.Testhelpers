import {UiBaseLocators} from "./UiBaseLocators";
import {expect, Locator, Page} from "@playwright/test";

export class MediaUiHelper extends UiBaseLocators {
  private readonly createMediaItemBtn: Locator;
  private readonly mediaNameTxt: Locator;
  private readonly actionModalCreateBtn: Locator;
  private readonly mediaSearchTxt: Locator;
  private readonly trashBtn: Locator;
  private readonly restoreThreeDotsBtn: Locator;
  private readonly emptyRecycleBinThreeDotsBtn: Locator;
  private readonly confirmTrashBtn: Locator;
  private readonly recycleBinBtn: Locator;
  private readonly restoreBtn: Locator;
  private readonly confirmEmptyRecycleBinBtn: Locator;
  private readonly recycleBinMenuItem: Locator;
  private readonly recycleBinMenuItemCaretBtn: Locator;
  private readonly mediaSectionCreateBtn: Locator;
  private readonly viewBundleBtn: Locator;
  private readonly gridBtn: Locator;
  private readonly listBtn: Locator;
  private readonly mediaListHeader: Locator;
  private readonly mediaCardItemsValues: Locator;
  private readonly mediaListView: Locator;
  private readonly mediaGridView: Locator;
  private readonly mediaListNameValues: Locator;
  private readonly bulkTrashBtn: Locator;
  private readonly bulkMoveToBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.createMediaItemBtn = page.locator('umb-create-media-collection-action').getByLabel('Create');
    this.mediaNameTxt = page.locator('#name-input #input');
    this.actionModalCreateBtn = page.locator('#action-modal').getByLabel('Create');
    this.mediaSearchTxt = page.getByLabel('Search', {exact: true});
    this.trashBtn = page.getByLabel('Trash', {exact: true});
    this.restoreThreeDotsBtn = page.getByRole('button', {name: 'Restore...'});
    this.emptyRecycleBinThreeDotsBtn = page.getByLabel('Empty Recycle Bin...', {exact: true});
    this.confirmTrashBtn = page.locator('#confirm').getByLabel('Trash');
    this.recycleBinBtn = page.getByLabel('Recycle Bin', {exact: true});
    this.restoreBtn = page.getByLabel('Restore', {exact: true});
    this.confirmEmptyRecycleBinBtn = page.getByLabel('Empty Recycle Bin', {exact: true});
    this.recycleBinMenuItem = page.locator('uui-menu-item[label="Recycle Bin"]');
    this.recycleBinMenuItemCaretBtn = this.recycleBinMenuItem.locator('#caret-button');
    this.mediaSectionCreateBtn = this.page.locator('#header').filter({hasText: 'Media'}).getByLabel('#actions_create');
    this.viewBundleBtn = this.page.locator('umb-collection-view-bundle');
    this.gridBtn = this.page.getByLabel('Grid');
    this.listBtn = this.page.getByLabel('List');
    this.mediaListView = this.page.locator('umb-media-table-collection-view');
    this.mediaGridView = this.page.locator('umb-media-grid-collection-view');
    this.mediaListHeader = this.mediaListView.locator('uui-table-head-cell span');
    this.mediaCardItemsValues = this.mediaCardItems.locator('span');
    this.mediaListNameValues = this.mediaListView.locator('umb-media-table-column-name span');
    this.bulkTrashBtn = page.locator('umb-entity-bulk-action uui-button').filter({hasText: 'Trash'});
    this.bulkMoveToBtn = page.locator('umb-entity-bulk-action uui-button').filter({hasText: 'Move to'});
  }

  async clickCreateMediaItemButton() {
    await this.createMediaItemBtn.click();
  }

  async enterMediaItemName(name: string) {
    await this.mediaNameTxt.clear();
    await this.mediaNameTxt.fill(name);
  }

  async clickMediaTypeWithNameButton(mediaTypeName: string) {
    await this.page.getByLabel(mediaTypeName, {exact: true}).click({force: true});
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

  async clickConfirmTrashButton() {
    await this.confirmTrashBtn.click();
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
    await this.mediaSectionCreateBtn.click({force: true});
    await this.clickMediaTypeName(mediaTypeName);
  }

  async clickMediaTypeName(mediaTypeName: string) {
    await this.documentTypeNode.filter({hasText: mediaTypeName}).click();
  }

  async clickEmptyRecycleBinButton() {
    await this.emptyRecycleBinThreeDotsBtn.click({force: true});
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

  async reloadRecycleBin(containsMediaItems = true) {
    // We need to wait to be sure that the item is visible after reload
    await this.page.waitForTimeout(500);
    await this.page.reload();

    await expect(this.recycleBinMenuItem).toBeVisible();

    await this.clickActionsMenuForName('Recycle Bin');
    await this.clickReloadButton();
    await expect(this.recycleBinMenuItem).toBeVisible();

    // If the Recycle Bin does not contain any media items, the caret button should not be visible. and we should not try to click it
    if (!containsMediaItems) {
      await expect(this.recycleBinMenuItemCaretBtn).not.toBeVisible();
      return;
    }

    await expect(this.recycleBinMenuItemCaretBtn).toBeVisible();
    const isCaretButtonOpen = await this.recycleBinMenuItem.getAttribute('show-children');

    if (isCaretButtonOpen === null) {
      // We need to wait before clicking the caret button. Because the reload might not have happened yet. 
      await this.clickCaretButtonForName('Recycle Bin');
    }
  }

  async clickRecycleBinButton() {
    await this.recycleBinBtn.click();
  }

  async isMediaItemVisibleInRecycleBin(mediaItem: string, isVisible: boolean = true) {
    await this.reloadRecycleBin(isVisible);
    return expect(this.page.locator('[label="Recycle Bin"] [label="' + mediaItem + '"]')).toBeVisible({visible: isVisible});
  }

  async changeToGridView() {
    await this.viewBundleBtn.click();
    await this.gridBtn.click();
  }

  async changeToListView() {
    await this.viewBundleBtn.click();
    await this.listBtn.click();
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

  async isViewBundleButtonVisible(isVisible: boolean = true) {
    return expect(this.viewBundleBtn).toBeVisible({visible: isVisible});
  }

  async isMediaGridViewVisible(isVisible: boolean = true) {
    return expect(this.mediaGridView).toBeVisible({visible: isVisible});
  }

  async isMediaListViewVisible(isVisible: boolean = true) {
    return expect(this.mediaListView).toBeVisible({visible: isVisible});
  }

  async selectMediaByName(name: string) {
    await this.mediaCardItems.filter({hasText: name}).click();
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
}