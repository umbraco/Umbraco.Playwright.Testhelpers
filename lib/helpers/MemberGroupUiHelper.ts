import {Page, Locator} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class MemberGroupUiHelper extends UiBaseLocators {
  private readonly memberGroupsTab: Locator;
  private readonly memberGroupNameTxt: Locator;
  private readonly memberGroupView: Locator;
  private readonly activeMemberGroupsTab: Locator;
  private readonly createMemberGroupBtn: Locator;
  private readonly memberGroupsMenu: Locator;
  private readonly membersSidebar: Locator;
  private readonly memberGroupsSidebarBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.memberGroupsTab = page.locator('uui-tab[label="Member Groups"]');
    this.memberGroupNameTxt = page.locator('input#input');
    this.memberGroupView = page.locator('umb-member-group-table-collection-view');
    this.activeMemberGroupsTab = page.locator('uui-tab[label="Member Groups"][active]');
    this.createMemberGroupBtn = page.getByTestId('collection-action:Umb.CollectionAction.MemberGroup.Create').getByLabel('Create', {exact: true});
    this.memberGroupsMenu = page.locator('umb-menu').getByLabel('Member Groups', {exact: true});
    this.membersSidebar = page.getByTestId('section-sidebar:Umb.SectionSidebarApp.Menu.MemberManagement');
    this.memberGroupsSidebarBtn = this.membersSidebar.locator('uui-menu-item').filter({hasText: 'Member Groups'});
  }

  async clickMemberGroupsTab() {
    await this.isVisible(this.memberGroupsTab);
    await this.page.waitForTimeout(500);
    await this.memberGroupsTab.click();
    await this.isVisible(this.activeMemberGroupsTab);
  }

  async clickMemberGroupCreateButton() {
    await this.createMemberGroupBtn.click();
  }

  async clickMemberGroupsSidebarButton() {
    await this.click(this.memberGroupsSidebarBtn);
  }

  async enterMemberGroupName(name: string) {
    await this.enterText(this.memberGroupNameTxt, name);
  }

  async clickMemberGroupLinkByName(memberGroupName: string) {
    await this.page.getByRole('link', {name: memberGroupName}).click();
  }

  async isMemberGroupNameVisible(memberGroupName: string, isVisible: boolean = true) {
    return this.isVisible(this.memberGroupView.filter({hasText: memberGroupName}), isVisible, 500);
  }

  async clickMemberGroupsMenu() {
    await this.memberGroupsMenu.click();
  }

  async waitForMemberGroupToBeCreated() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForMemberGroupToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }
  
  async goToMemberGroups() {
    await this.goToSection(ConstantHelper.sections.members);
    await this.clickMemberGroupsMenu();
  }
}
