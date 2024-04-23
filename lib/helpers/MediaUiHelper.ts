import {UiBaseLocators} from "./UiBaseLocators";
import {expect, Locator, Page} from "@playwright/test";

export class MediaUiHelper extends UiBaseLocators {
  private readonly createMediaItemBtn: Locator;
  private readonly mediaTypePopoverBtn: Locator;
  private readonly mediaNameTxt: Locator;
  private readonly clickToUploadBtn: Locator;
  private readonly actionModalCreateBtn: Locator;
  private readonly mediaSearchTxt: Locator;
  private readonly mediaCardItems: Locator;
  private readonly trashBtn: Locator;
  private readonly restoreThreeDotsBtn: Locator;
  private readonly emptyRecycleBinThreeDotsBtn: Locator;
  private readonly confirmTrashBtn: Locator;
  private readonly recycleBinBtn: Locator;
  private readonly restoreBtn: Locator;
  private readonly confirmEmptyRecycleBinBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.createMediaItemBtn = page.locator('umb-create-media-collection-action').getByLabel('Create');
    this.mediaTypePopoverBtn = page.locator('#collection-action-menu-popover');
    this.mediaNameTxt = page.locator('#name-input #input');
    this.clickToUploadBtn = page.getByLabel('Click to upload');
    this.actionModalCreateBtn = page.locator('#action-modal').getByLabel('Create');
    this.mediaSearchTxt = page.getByLabel('Search', {exact: true});
    this.mediaCardItems = page.locator('uui-card-media');
    this.trashBtn = page.getByLabel('Trash', {exact: true});
    this.restoreThreeDotsBtn = page.getByLabel('Restore...', {exact: true});
    this.emptyRecycleBinThreeDotsBtn = page.getByLabel('Empty Recycle Bin...', {exact: true});
    this.confirmTrashBtn = page.locator('#confirm').getByLabel('Trash');
    this.recycleBinBtn = page.getByLabel('Recycle Bin', {exact: true});
    this.restoreBtn = page.getByLabel('Restore', {exact: true});
    this.confirmEmptyRecycleBinBtn = page.getByLabel('Empty Recycle Bin', {exact: true});
  }

  async clickCreateMediaItemButton() {
    await this.createMediaItemBtn.click();
  }

  async enterMediaItemName(name: string) {
    await this.mediaNameTxt.clear();
    await this.mediaNameTxt.fill(name);
  }

  async clickMediaTypeWithNameButton(mediaTypeName: string) {
    await this.mediaTypePopoverBtn.getByLabel(mediaTypeName).click();
  }

  async clickToUploadButton() {
    await this.clickToUploadBtn.click();
  }

  async changeFileTypeWithFileChooser(filePath: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clickToUploadButton();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
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
    await this.restoreBtn.click();
  }

  async deleteMediaItem(name: string) {
    await this.clickActionsMenuForName(name);
    await this.clickDeleteButton();
    await this.clickConfirmToDeleteButton();
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

    const menuItem = this.page.locator('uui-menu-item[label="Recycle Bin"]');
    await expect(menuItem).toBeVisible();

    await this.clickActionsMenuForName('Recycle Bin');
    await this.clickReloadButton();
    await expect(menuItem).toBeVisible();

    // If the Recycle Bin does not contain any media items, the caret button should not be visible. and we should not try to click it
    if (!containsMediaItems) {
      await expect(menuItem.locator('#caret-button')).not.toBeVisible();
      return;
    }

    await expect(menuItem.locator('#caret-button')).toBeVisible();
    const isCaretButtonOpen = await menuItem.getAttribute('show-children');

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
}