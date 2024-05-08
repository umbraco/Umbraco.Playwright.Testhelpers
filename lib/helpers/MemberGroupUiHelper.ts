import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class MemberGroupUiHelper extends UiBaseLocators {
  private readonly memberGroupsTab: Locator;
  private readonly memberGroupNameTxt: Locator;
  private readonly actionsBtn: Locator;
  private readonly memberGroupView: Locator;

  constructor(page: Page) {
    super(page);
    this.memberGroupsTab = page.locator('uui-tab[label="Member Groups"]');
    this.memberGroupNameTxt = page.locator('input#input');
    this.actionsBtn = page.getByLabel('Actions', {exact: true});
    this.memberGroupView = page.locator('umb-member-group-table-collection-view');
  }

  async clickMemberGroupsTab() {
    await this.memberGroupsTab.click();
  }

  async enterMemberGroupName(name: string) {
    await expect(this.memberGroupNameTxt).toBeVisible();
    await this.memberGroupNameTxt.clear();
    await this.memberGroupNameTxt.fill(name);
  }

  async clickMemberGroupLinkByName(memberGroupName: string) {
    await this.page.getByRole('link', {name: memberGroupName}).click();
  }

  async clickActionsButton() {
    await this.actionsBtn.click();
  }

  async isMemberGroupNameVisible(memberGroupName: string, isVisible: boolean = true) {
    return expect(this.memberGroupView.filter({hasText: memberGroupName})).toBeVisible({visible: isVisible, timeout: 500});
  }
}
