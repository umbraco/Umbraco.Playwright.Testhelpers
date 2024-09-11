import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class UserGroupUiHelper extends UiBaseLocators {
  private readonly userGroupsTabBtn: Locator;
  private readonly userGroupNameTxt: Locator;
  private readonly addSectionsBtn: Locator;
  private readonly permissionVerbBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.userGroupsTabBtn = page.getByRole('tab', {name: 'User Groups'});
    this.userGroupNameTxt = page.getByLabel('Name', {exact: true});
    this.permissionVerbBtn = page.locator('umb-input-user-permission-verb');
    this.addSectionsBtn = page.locator('[label="Sections"]').getByLabel('open', {exact: true});
  }

  async clickUserGroupsTabButton() {
    await this.userGroupsTabBtn.click();
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

  async clickPermissionByName(permissionName: string[]) {
    for (let i = 0; i < permissionName.length; i++) {
      await this.permissionVerbBtn.getByText(permissionName[i], {exact: true}).click();
    }
  }

  async doesUserGroupHavePermission(permissionName: string, hasPermission = true) {
    return await expect(this.permissionVerbBtn.filter({has: this.page.getByText(permissionName, {exact: true})}).locator('uui-toggle').locator('#icon-checked').getByRole('img')).toBeVisible({visible: hasPermission});
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
    await this.page.locator('umb-ref-section', {hasText: sectionName}).getByText('Remove').click();
  }

  async doesUserGroupHavePermissionEnabled(permissionName: string[]) {
    return await Promise.all(
      permissionName.map(permission => this.doesUserGroupHavePermission(permission))
    );
  }
}