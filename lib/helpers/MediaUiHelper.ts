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

  constructor(page: Page) {
    super(page);
    this.createMediaItemBtn = page.locator('umb-create-media-collection-action').getByLabel('Create');
    this.mediaTypePopoverBtn = page.locator('#collection-action-menu-popover');
    this.mediaNameTxt = page.locator('#name-input #input');
    this.clickToUploadBtn = page.getByLabel('Click to upload');
    this.actionModalCreateBtn = page.locator('#action-modal').getByLabel('Create');
    this.mediaSearchTxt = page.getByLabel('Search', {exact: true});
    this.mediaCardItems = page.locator('uui-card-media');
  }

  async clickActionsMenuForMediaType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async isMediaNameVisible(name: string, isVisible = true) {
    return await expect(this.page.locator('umb-tree-item').getByLabel(name)).toBeVisible({visible: isVisible});
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

  async clickCreateModalButton() {
    await this.actionModalCreateBtn.click();
  }
}