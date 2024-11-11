import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class MemberGroupUiHelper extends UiBaseLocators {
  private readonly memberGroupsTab: Locator;
  private readonly memberGroupNameTxt: Locator;
  private readonly memberGroupView: Locator;
  private readonly activeMemberGroupsTab: Locator;
  private readonly createMemberGroupBtn: Locator;
  private readonly memberGroupsMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.memberGroupsTab = page.locator('uui-tab[label="Member Groups"]');
    this.memberGroupNameTxt = page.locator('input#input');
    this.memberGroupView = page.locator('umb-member-group-table-collection-view');
    this.activeMemberGroupsTab = page.locator('uui-tab[label="Member Groups"][active]');
    this.createMemberGroupBtn = page.getByLabel('Create', {exact: true});
    this.memberGroupsMenu = page.locator('umb-menu').getByLabel('Member Groups', {exact: true});
  }

  async clickMemberGroupsTab() {
    await expect(this.memberGroupsTab).toBeVisible();
    await this.page.waitForTimeout(500);
    await this.memberGroupsTab.click();
    await expect(this.activeMemberGroupsTab).toBeVisible();
  }

  async clickMemberGroupCreateButton() {
    await this.createMemberGroupBtn.click();
  }

  async enterMemberGroupName(name: string) {
    await expect(this.memberGroupNameTxt).toBeVisible();
    await this.memberGroupNameTxt.clear();
    await this.memberGroupNameTxt.fill(name);
  }

  async clickMemberGroupLinkByName(memberGroupName: string) {
    await this.page.getByRole('link', {name: memberGroupName}).click();
  }

  async isMemberGroupNameVisible(memberGroupName: string, isVisible: boolean = true) {
    return expect(this.memberGroupView.filter({hasText: memberGroupName})).toBeVisible({visible: isVisible, timeout: 500});
  }

  async clickMemberGroupsMenu() {
    await this.memberGroupsMenu.click();
  }

  async goToMemberGroups() {
    await this.goToSection(ConstantHelper.sections.members);
    await this.clickMemberGroupsMenu();
  }
}
