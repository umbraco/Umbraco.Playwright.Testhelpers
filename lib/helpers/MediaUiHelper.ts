import {UiBaseLocators} from "./UiBaseLocators";
import {Locator, Page} from "@playwright/test";
import {ConstantHelper} from "./ConstantHelper";

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
  private readonly mediaWorkspace: Locator;

  constructor(page: Page) {
    super(page);
    this.createMediaItemBtn = page.locator('umb-create-media-collection-action').getByLabel('Create');
    this.mediaNameTxt = page.locator('#name-input #input');
    this.actionModalCreateBtn = page.locator('#action-modal').getByLabel('Create');
    this.mediaSearchTxt = page.getByLabel('Search', {exact: true});
    this.trashBtn = page.getByLabel(/^Trash(…)?$/);
    this.restoreThreeDotsBtn = page.getByRole('button', {name: 'Restore…'});
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
    this.mediaHeaderActionsMenu = page.locator('#header #action-modal');
    this.emptyRecycleBinBtn = page.locator('[label="Empty Recycle Bin"]').locator('svg');
    this.mediaTreeItem = page.locator('umb-media-tree-item');
    this.mediaPopoverLayout = page.locator('umb-popover-layout');
    this.mediaWorkspace = page.locator('umb-media-workspace-editor');
  }

  async clickCreateMediaItemButton() {
    await this.createMediaItemBtn.click();
  }

  async enterMediaItemName(name: string) {
    await this.enterText(this.mediaNameTxt, name);
    await this.hasValue(this.mediaNameTxt, name);
  }

  async clickMediaTypeWithNameButton(mediaTypeName: string) {
    await this.page.getByLabel(mediaTypeName, {exact: true}).click();
  }

  async searchForMediaItemByName(name: string) {
    await this.enterText(this.mediaSearchTxt, name);
  }

  async doesMediaCardsContainAmount(count: number) {
    await this.hasCount(this.mediaCardItems, count);
  }

  async doesMediaCardContainText(name: string) {
    await this.containsText(this.mediaCardItems, name);
  }

  async clickTrashButton() {
    await this.trashBtn.click();
  }

  async restoreMediaItem(name: string) {
    await this.clickActionsMenuForName(name);
    await this.restoreThreeDotsBtn.click();
    await this.page.waitForTimeout(ConstantHelper.wait.medium);
    await this.restoreBtn.click();
  }

  async waitForMediaToBeTrashed() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForRecycleBinToBeEmptied() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForMediaToBeMoved() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForMediaItemToBeCreated() {
    await this.waitForNetworkToBeIdle();
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
    await this.documentTypeNode.filter({hasText: mediaTypeName}).click();
  }

  async clickMediaTypeInPopoverByName(mediaTypeName: string) {
    await this.mediaPopoverLayout.getByLabel(mediaTypeName).click();
  }

  async clickEmptyRecycleBinButton() {
    await this.recycleBinMenuItem.hover();
    await this.click(this.emptyRecycleBinBtn, {force: true});
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

  async openMediaCaretButtonForName(name: string) {
    const menuItem = this.page.locator('umb-media-tree-item [label="' + name + '"]')
    const isCaretButtonOpen = await menuItem.getAttribute('show-children');

    if (isCaretButtonOpen === null) {
      await this.clickMediaCaretButtonForName(name);
    }
  }

  async doesMediaGridValuesMatch(expectedValues: string[]) {
    for (let index = 0; index < expectedValues.length; index++) {
      await this.hasText(this.mediaCardItemsValues.nth(index), expectedValues[index]);
    }
  }

  async doesMediaListHeaderValuesMatch(expectedValues: string[]) {
    for (let index = 0; index < expectedValues.length; index++) {
      await this.hasText(this.mediaListHeader.nth(index), expectedValues[index]);
    }
  }

  async doesMediaListNameValuesMatch(expectedValues: string[]) {
    for (let index = 0; index < expectedValues.length; index++) {
      await this.hasText(this.mediaListNameValues.nth(index), expectedValues[index]);
    }
  }

  async isMediaGridViewVisible(isVisible: boolean = true) {
    return this.isVisible(this.mediaGridView, isVisible);
  }

  async isMediaListViewVisible(isVisible: boolean = true) {
    return this.isVisible(this.mediaListView, isVisible);
  }

  async doesMediaWorkspaceHaveText(text: string) {
    return this.containsText(this.mediaWorkspace, text);
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
    await this.click(this.mediaHeader);
    await this.click(this.mediaHeaderActionsMenu, {force: true});
    await this.clickReloadChildrenActionMenuOption();
  }

  async isMediaTreeItemVisible(name: string, isVisible: boolean = true) {
    return this.isVisible(this.mediaTreeItem.getByLabel(name, {exact: true}), isVisible);
  }

  async isChildMediaVisible(parentName: string, childName: string, isVisible: boolean = true) {
    return this.isVisible(this.mediaTreeItem.filter({hasText: parentName}).getByText(childName, {exact: true}), isVisible);
  }

  async clickCaretButtonForMediaName(name: string) {
    await this.mediaTreeItem.filter({hasText: name}).last().locator('#caret-button').last().click();
  }

  async goToMediaWithName(mediaName: string) {
    await this.click(this.mediaTreeItem.getByText(mediaName, {exact: true}));
  }
}