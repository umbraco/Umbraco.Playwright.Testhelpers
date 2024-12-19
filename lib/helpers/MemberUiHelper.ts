import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class MemberUiHelper extends UiBaseLocators {
  private readonly membersTab: Locator;
  private readonly searchTxt: Locator;
  private readonly memberNameTxt: Locator;
  private readonly commentsTxt: Locator;
  private readonly memberTab: Locator;
  private readonly detailsTab: Locator;
  private readonly usernameTxt: Locator;
  private readonly emailTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly confirmPasswordTxt: Locator;
  private readonly confirmNewPasswordTxt: Locator;
  private readonly approvedSlider: Locator;
  private readonly lockedOutSlider: Locator;
  private readonly twoFactorAuthenticationSlider: Locator;
  private readonly memberInfoItems: Locator;
  private readonly changePasswordBtn: Locator;
  private readonly newPasswordTxt: Locator;
  private readonly membersMenu: Locator;
  private readonly infoTab: Locator;

  constructor(page: Page) {
    super(page);
    this.membersTab = page.locator('uui-tab[label="Members"]');
    this.searchTxt = page.locator('#input-search');
    this.memberNameTxt = page.locator('#name-input #input');
    this.commentsTxt = page.locator('umb-content-workspace-view-edit-tab').locator('umb-property').filter({hasText: 'Comments'}).locator('#textarea');
    this.memberTab = page.locator('uui-tab').filter({hasText: 'Member'}).locator('svg');
    this.detailsTab = page.locator('uui-tab').filter({hasText: 'Details'}).locator('svg');
    this.usernameTxt = page.getByLabel('Username', {exact: true});
    this.emailTxt = page.getByLabel('Email', {exact: true});
    this.passwordTxt = page.getByLabel('Enter your new password', {exact: true});
    this.confirmPasswordTxt = page.getByLabel('Confirm password', {exact: true});
    this.confirmNewPasswordTxt = page.getByLabel('Confirm new password', {exact: true});
    this.approvedSlider = page.locator('[label="Approved"] #slider');
    this.lockedOutSlider = page.locator('[label="Locked out"] #slider');
    this.twoFactorAuthenticationSlider = page.locator('[label="Two-Factor authentication"] #slider');
    this.memberInfoItems = page.locator('umb-stack > div');
    this.changePasswordBtn = page.getByLabel('Change password', {exact: true});
    this.newPasswordTxt = page.getByLabel('New password', {exact: true});
    this.membersMenu = page.locator('umb-menu').getByLabel('Members', {exact: true});
    this.infoTab = page.locator('uui-tab').filter({hasText: 'Info'}).locator('svg');
  }

  async clickMembersTab() {
    await this.membersTab.click();
  }

  async clickMemberTab() {
    await expect(this.memberTab).toBeVisible();
    await this.memberTab.click();
  }

  async clickDetailsTab() {
    await expect(this.detailsTab).toBeVisible();
    await this.detailsTab.click();
  }

  async clickMemberLinkByName(memberName: string) {
    await this.page.getByRole('link', {name: memberName}).click();
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
    await this.submitBtn.click();
  }

  async doesMemberInfoHaveValue(infoName: string, value: string) {
    return expect(this.memberInfoItems.filter({hasText: infoName}).locator('span')).toHaveText(value);
  }

  async clickApprovedSlider() {
    await this.approvedSlider.click();
  }

  async clickLockedOutSlider() {
    await this.lockedOutSlider.click();
  }

  async clickTwoFactorAuthenticationSlider() {
    await this.twoFactorAuthenticationSlider.click();
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

  async goToMembers() {
    await this.goToSection(ConstantHelper.sections.members);
    await this.clickMembersMenu();
  }

  async clickInfoTab() {
    await expect(this.infoTab).toBeVisible();
    await this.infoTab.click();
  }
}
