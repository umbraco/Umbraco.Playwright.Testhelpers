import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

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
  private readonly newPasswordTxt: Locator;
  private readonly approvedSlider: Locator;
  private readonly lockedOutSlider: Locator;
  private readonly twoFactorAuthenticationSlider: Locator;
  private readonly memberInfoItems: Locator;
  private readonly changePasswordBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.membersTab = page.locator('uui-tab[label="Members"]');
    this.searchTxt = page.locator('#input-search');
    this.memberNameTxt = page.locator('#name-input #input');
    this.commentsTxt = page.locator('#textarea');
    this.memberTab = page.locator('uui-tab').filter({hasText: 'Member'}).locator('svg');
    this.detailsTab = page.locator('uui-tab').filter({hasText: 'Details'}).locator('svg');
    this.usernameTxt = page.locator('[label="Username"] #input');
    this.emailTxt = page.locator('[label="Email"] #input');
    this.passwordTxt = page.locator('[label="Password"] #input');
    this.confirmPasswordTxt = page.locator('[label="Confirm password"] #input');
    this.newPasswordTxt = page.locator('[label="New password"] #input');
    this.approvedSlider = page.locator('[label="Approved"] #slider');
    this.lockedOutSlider = page.locator('[label="Locked out"] #slider');
    this.twoFactorAuthenticationSlider = page.locator('[label="Two-Factor authentication"] #slider');
    this.memberInfoItems = page.locator('.general-item');
    this.changePasswordBtn = page.getByLabel('Change password', {exact: true});
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
    await this.memberNameTxt.clear();
    await this.memberNameTxt.fill(name);
  }

  async enterComments(comment: string) {
    await this.commentsTxt.clear();
    await this.commentsTxt.fill(comment);
  }

  async enterUsername(username: string) {
    await this.usernameTxt.clear();
    await this.usernameTxt.fill(username);
  }

  async enterEmail(email: string) {
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

  async enterNewPassword(password: string) {
    await this.newPasswordTxt.clear();
    await this.newPasswordTxt.fill(password);
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
    await this.page.locator('uui-button[label="Remove ' + memberGroupName + '"]').click();
  }
}