import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class MemberUiHelper extends UiBaseLocators {
  private readonly membersTab: Locator;
  private readonly searchTxt: Locator;
  private readonly memberNameTxt: Locator;
  private readonly commentsTxt: Locator;
  private readonly detailsTab: Locator;
  private readonly usernameTxt: Locator;
  private readonly emailTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly confirmNewPasswordTxt: Locator;
  private readonly approvedToggle: Locator;
  private readonly lockedOutToggle: Locator;
  private readonly twoFactorAuthenticationToggle: Locator;
  private readonly memberInfoItems: Locator;
  private readonly changePasswordBtn: Locator;
  private readonly membersMenu: Locator;
  private readonly infoTab: Locator;
  private readonly membersCreateBtn: Locator;
  private readonly membersSidebar: Locator;
  private readonly membersSidebarBtn: Locator;
  private readonly memberTableCollectionRow: Locator;

  constructor(page: Page) {
    super(page);
    this.membersTab = page.locator('uui-tab[label="Members"]');
    this.searchTxt = page.locator('#input-search');
    this.memberNameTxt = page.locator('#name-input #input');
    this.commentsTxt = page.locator('umb-content-workspace-view-edit-tab').locator('umb-property').filter({hasText: 'Comments'}).locator('#textarea');
    this.detailsTab = page.locator('uui-tab').filter({hasText: 'Details'}).locator('svg');
    this.usernameTxt = page.getByLabel('Username', {exact: true});
    this.emailTxt = page.getByLabel('Email', {exact: true});
    this.passwordTxt = page.getByLabel('Enter your new password', {exact: true});
    this.confirmNewPasswordTxt = page.getByLabel('Confirm new password', {exact: true});
    this.approvedToggle = page.locator('[label="Approved"] #toggle');
    this.lockedOutToggle = page.locator('[label="Locked out"] #toggle');
    this.twoFactorAuthenticationToggle = page.locator('[label="Two-Factor authentication"] #toggle');
    this.memberInfoItems = page.locator('umb-stack > div');
    this.changePasswordBtn = page.getByLabel('Change password', {exact: true});
    this.membersMenu = page.locator('umb-menu').getByLabel('Members', {exact: true});
    this.infoTab = page.locator('uui-tab').filter({hasText: 'Info'}).locator('svg');
    this.membersCreateBtn = page.locator('umb-create-member-collection-action').getByLabel('Create', {exact: true});
    this.membersSidebar = page.getByTestId('section-sidebar:Umb.SectionSidebarApp.Menu.MemberManagement');
    this.membersSidebarBtn = this.membersSidebar.locator('uui-menu-item').filter({hasText: 'Members'});
    this.memberTableCollectionRow = page.locator('umb-member-table-collection-view').locator('uui-table-row');
  }

  async clickMembersTab() {
    await this.membersTab.click();
  }

  async clickDetailsTab() {
    await expect(this.detailsTab).toBeVisible();
    await this.detailsTab.click();
  }

  async clickMemberLinkByName(memberName: string) {
    await this.page.getByRole('link', {name: memberName}).click();
  }

  async isMemberWithNameVisible(memberName: string, isVisible: boolean = true) {
    await expect(this.memberTableCollectionRow.getByText(memberName, {exact: true})).toBeVisible({visible: isVisible});
  }
  
  async clickMembersSidebarButton() {
    await expect(this.membersSidebarBtn).toBeVisible();
    await this.membersSidebarBtn.click();
  }
 
  async enterSearchKeyword(keyword: string) {
    await expect(this.searchTxt).toBeVisible();
    await this.searchTxt.clear();
    await this.searchTxt.fill(keyword);
  }

  async enterMemberName(name: string) {
    await expect(this.memberNameTxt).toBeVisible();
    await this.memberNameTxt.clear();
    await this.memberNameTxt.fill(name);
  }

  async enterComments(comment: string) {
    await expect(this.commentsTxt).toBeVisible();
    await this.commentsTxt.clear();
    await this.commentsTxt.fill(comment);
  }

  async enterUsername(username: string) {
    await expect(this.usernameTxt).toBeVisible();
    await this.usernameTxt.clear();
    await this.usernameTxt.fill(username);
  }

  async enterEmail(email: string) {
    await expect(this.emailTxt).toBeVisible();
    await this.emailTxt.clear();
    await this.emailTxt.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordTxt.clear();
    await this.passwordTxt.fill(password);
  }

  async enterConfirmPassword(password: string) {
    await this.confirmPasswordTxt.clear();
    await this.confirmPasswordTxt.fill(password);
  }

  async enterConfirmNewPassword(password: string) {
    await this.confirmNewPasswordTxt.clear();
    await this.confirmNewPasswordTxt.fill(password);
  }

  async chooseMemberGroup(memberGroupName: string) {
    await this.clickChooseButton();
    await this.page.getByText(memberGroupName, {exact: true}).click();
    await this.clickChooseContainerButton();
  }

  async doesMemberInfoHaveValue(infoName: string, value: string) {
    return expect(this.memberInfoItems.filter({hasText: infoName}).locator('span')).toHaveText(value);
  }

  async clickApprovedToggle() {
    await this.approvedToggle.click();
  }

  async clickLockedOutToggle() {
    await this.lockedOutToggle.click();
  }

  async clickTwoFactorAuthenticationToggle() {
    await this.twoFactorAuthenticationToggle.click();
  }

  async clickChangePasswordButton() {
    await this.changePasswordBtn.click();
  }

  async clickRemoveMemberGroupByName(memberGroupName: string) {
    await this.page.locator('[name="' + memberGroupName + '"]').getByLabel('Remove').click();
  }

  async enterNewPassword(password: string) {
    await this.newPasswordTxt.clear();
    await this.newPasswordTxt.fill(password);
  }

  async clickMembersMenu() {
    await this.membersMenu.click();
  }
  
  async waitForMemberToBeCreated(){
    await this.waitForNetworkToBeIdle();
  }
  
  async waitForMemberToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }

  async goToMembers() {
    await this.goToSection(ConstantHelper.sections.members);
    await this.clickMembersMenu();
  }

  async clickInfoTab() {
    await expect(this.infoTab).toBeVisible();
    await this.infoTab.click();
  }

  async clickCreateMembersButton() {
    await expect(this.membersCreateBtn).toBeVisible();
    await this.membersCreateBtn.click();
  }
}
