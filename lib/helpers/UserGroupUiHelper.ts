import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class UserGroupUiHelper extends UiBaseLocators {
  private readonly userGroupsTabBtn: Locator;
  private readonly userGroupNameTxt: Locator;
  private readonly browseNodePermissionBtn: Locator;
  private readonly createDocumentBlueprintPermissionBtn: Locator;
  private readonly deletePermissionBtn: Locator;
  private readonly createPermissionBtn: Locator;
  private readonly notificationsPermissionBtn: Locator;
  private readonly publishPermissionBtn: Locator;
  private readonly setPermissionsPermissionBtn: Locator;
  private readonly unpublishPermissionBtn: Locator;
  private readonly updatePermissionBtn: Locator;
  private readonly copyPermissionBtn: Locator;
  private readonly movePermissionBtn: Locator;
  private readonly sortPermissionBtn: Locator;
  private readonly cultureAndHostnamesPermissionBtn: Locator;
  private readonly restrictPublicAccessPermissionBtn: Locator;
  private readonly rollbackPermissionBtn: Locator;
  private readonly addSectionsBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.userGroupsTabBtn = page.getByRole('tab', {name: 'User Groups'});
    this.userGroupNameTxt = page.getByLabel('Name', {exact: true});
    this.browseNodePermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Browse Node');
    this.createDocumentBlueprintPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Create Document Blueprint');
    this.deletePermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Delete', {exact: true});
    this.createPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Create', {exact: true});
    this.notificationsPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Notifications', {exact: true});
    this.publishPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Publish', {exact: true});
    this.setPermissionsPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Set permissions');
    this.unpublishPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Unpublish', {exact: true});
    this.updatePermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Update');
    this.copyPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Copy', {exact: true});
    this.movePermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Move', {exact: true});
    this.sortPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Sort', {exact: true});
    this.cultureAndHostnamesPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Culture and Hostnames', {exact: true});
    this.restrictPublicAccessPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Restrict Public Access');
    this.rollbackPermissionBtn = page.locator('umb-input-user-permission-verb').getByText('Rollback');
    this.addSectionsBtn = page.locator('[label="Sections"]').getByLabel('open', {exact: true});
  }

  async clickUserGroupsTabButton() {
    await this.userGroupsTabBtn.click({force: true});
  }

  async enterUserGroupName(name: string) {
    await this.userGroupNameTxt.clear();
    await this.userGroupNameTxt.fill(name);
  }

  async isUserGroupWithNameVisible(name: string, isVisible = true) {
    return await expect(this.page.locator('uui-table-row', {hasText: name})).toBeVisible({visible: isVisible});
  }

  async clickUserGroupWithName(name: string) {
    await this.page.getByRole('link', {name: name}).click();
  }

  async clickBrowseNodePermission() {
    await this.browseNodePermissionBtn.click();
  }

  async clickCreateDocumentBlueprintPermission() {
    await this.createDocumentBlueprintPermissionBtn.click();
  }

  async clickDeletePermission() {
    await this.deletePermissionBtn.click();
  }

  async clickCreatePermission() {
    await this.createPermissionBtn.click();
  }

  async clickNotificationsPermission() {
    await this.notificationsPermissionBtn.click();
  }

  async clickPublishPermission() {
    await this.publishPermissionBtn.click();
  }

  async clickSetPermissionsPermission() {
    await this.setPermissionsPermissionBtn.click();
  }

  async clickUnpublishPermission() {
    await this.unpublishPermissionBtn.click();
  }

  async clickUpdatePermission() {
    await this.updatePermissionBtn.click();
  }

  async clickCopyPermission() {
    await this.copyPermissionBtn.click();
  }

  async clickMovePermission() {
    await this.movePermissionBtn.click();
  }

  async clickSortPermission() {
    await this.sortPermissionBtn.click();
  }

  async clickCultureAndHostnamesPermission() {
    await this.cultureAndHostnamesPermissionBtn.click();
  }

  async clickRestrictPublicAccessPermission() {
    await this.restrictPublicAccessPermissionBtn.click();
  }

  async clickRollbackPermission() {
    await this.rollbackPermissionBtn.click();
  }

  async doesUserGroupHavePermission(permission: string, hasPermission = true) {
    return await expect(this.page.locator('umb-input-user-permission-verb', {hasText: permission}).locator('uui-toggle').locator('#icon-checked').getByRole('img')).toBeVisible({visible: hasPermission});
  }

  async addSectionWithNameToUserGroup(sectionName: string) {
    await this.page.getByLabel(sectionName).click();
  }

  async clickAddSectionsButton() {
    await this.addSectionsBtn.click();
  }

  async doesUserGroupHaveSection(userGroupName: string, sectionName: string, hasSection = true) {
    return await expect(this.page.locator('uui-table-row', {hasText: userGroupName}).locator('umb-user-group-table-sections-column-layout', {hasText: sectionName})).toBeVisible({visible: hasSection});
  }

  async removeSectionFromUserGroup(sectionName: string) {
    await this.page.locator('.user-group', {hasText: sectionName}).getByLabel('remove').click()
  }

  async clickAllPermissionsOnAUserGroup() {
    await this.clickBrowseNodePermission();
    await this.clickCreateDocumentBlueprintPermission();
    await this.clickDeletePermission();
    await this.clickCreatePermission();
    await this.clickNotificationsPermission();
    await this.clickPublishPermission();
    await this.clickSetPermissionsPermission();
    await this.clickUnpublishPermission();
    await this.clickUpdatePermission();
    await this.clickCopyPermission();
    await this.clickMovePermission();
    await this.clickSortPermission();
    await this.clickCultureAndHostnamesPermission();
    await this.clickRestrictPublicAccessPermission();
    await this.clickRollbackPermission();
  }

  async doesUserGroupHaveAllPermissionsEnabled() {
    return await Promise.all([
      this.doesUserGroupHavePermission('Browse Node'),
      this.doesUserGroupHavePermission('Create Document Blueprint'),
      this.doesUserGroupHavePermission('Delete'),
      this.doesUserGroupHavePermission('Create Allow access to create'),
      this.doesUserGroupHavePermission('Notifications'),
      this.doesUserGroupHavePermission('Publish Allow access to publish a node'),
      this.doesUserGroupHavePermission('Set permissions'),
      this.doesUserGroupHavePermission('Unpublish'),
      this.doesUserGroupHavePermission('Update'),
      this.doesUserGroupHavePermission('Copy'),
      this.doesUserGroupHavePermission('Move'),
      this.doesUserGroupHavePermission('Sort'),
      this.doesUserGroupHavePermission('Culture and Hostnames'),
      this.doesUserGroupHavePermission('Restrict Public Access'),
      this.doesUserGroupHavePermission('Rollback')
    ]);
  }
}