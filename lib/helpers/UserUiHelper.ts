import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {umbracoConfig} from "../../umbraco.config";

export class UserUiHelper extends UiBaseLocators {
  private readonly usersTabBtn: Locator;
  private readonly createUserBtn: Locator;
  private readonly nameOfTheUserTxt: Locator;
  private readonly userEmailTxt: Locator;
  private readonly addUserGroupsBtn: Locator;
  private readonly openUserGroupsBtn: Locator;
  private readonly updatedNameOfTheUserTxt : Locator;
  private readonly changePasswordBtn: Locator;
  private readonly newPasswordTxt: Locator;
  private readonly confirmPasswordTxt: Locator;
  private readonly changePhotoBtn: Locator;
  private readonly removePhotoBtn: Locator;
  private readonly searchInUserSectionTxt: Locator;
  private readonly userSectionCard: Locator;
  private readonly statusBtn: Locator;
  private readonly groupBtn: Locator;
  private readonly chooseUserGroupsBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.usersTabBtn = page.locator('#views').getByRole('tab', {name: 'Users'});
    this.createUserBtn = page.getByLabel('Create user');
    this.nameOfTheUserTxt = page.getByLabel('name', {exact: true});
    this.userEmailTxt = page.getByLabel('email');
    this.addUserGroupsBtn = page.locator('#userGroups').getByLabel('open', {exact: true});
    this.openUserGroupsBtn = page.locator('[label="Groups"]').getByLabel('open', {exact: true});
    this.chooseUserGroupsBtn = page.locator('umb-user-group-input').getByLabel('Choose');
    this.updatedNameOfTheUserTxt = page.locator('#name #input');
    this.changePasswordBtn = page.getByLabel('Change your password');
    this.newPasswordTxt = page.locator('input[name="newPassword"]');
    this.confirmPasswordTxt = page.locator('input[name="confirmPassword"]');
    this.changePhotoBtn = page.getByLabel('Change photo');
    this.removePhotoBtn = page.getByLabel('Remove photo');
    this.searchInUserSectionTxt = page.getByLabel('Search the users section');
    this.userSectionCard = page.locator('uui-card-user');
    this.statusBtn = page.locator('uui-button', {hasText: 'Status'});
    this.groupBtn = page.locator('uui-button', {hasText: 'Groups'});
  }

  async clickUsersTabButton() {
    await this.usersTabBtn.click({force: true});
  }

  async clickCreateUserButton() {
    await this.createUserBtn.click();
  }

  async enterNameOfTheUser(name: string) {
    await this.nameOfTheUserTxt.fill(name);
  }

  async enterUserEmail(email: string) {
    await this.userEmailTxt.fill(email);
  }

  async clickAddUserGroupsButton() {
    await this.addUserGroupsBtn.click();
    // This wait is necessary to avoid the click on the user group button to be ignored
    await this.page.waitForTimeout(200);
  }
  
  async clickChooseUserGroupsButton(){
    await this.chooseUserGroupsBtn.click();
  }

  async clickOpenUserGroupsButton() {
    await this.openUserGroupsBtn.click();
  }

  async enterUpdatedNameOfUser(name: string) {
    await this.updatedNameOfTheUserTxt .fill(name);
  }

  async clickUserWithName(name: string) {
    await this.page.getByText(name, {exact: true}).click();
  }

  async clickChangePasswordButton() {
    await this.changePasswordBtn.click();
  }

  async updatePassword(newPassword: string) {
    await this.newPasswordTxt.fill(newPassword);
    await this.confirmPasswordTxt.fill(newPassword);
  }

  async isUserVisible(name: string, isVisible = true) {
    return await expect(this.page.getByText(name, {exact: true})).toBeVisible({visible: isVisible});
  }

  async clickChangePhotoButton() {
    await this.changePhotoBtn.click();
  }
  
  async clickRemoveButtonForUserGroupWithName(userGroupName: string) {
    await this.page.locator('umb-user-group-ref', {hasText: userGroupName}).locator('[label="Remove"]').click();
  }

  async clickRemovePhotoButton() {
    await this.removePhotoBtn.click();
  }

  async changePhotoWithFileChooser(filePath: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clickChangePhotoButton();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async searchInUserSection(name: string) {
    await this.searchInUserSectionTxt.fill(name);
  }

  async doesUserSectionContainUserAmount(amount: number) {
    return await expect(this.userSectionCard).toHaveCount(amount);
  }

  async doesUserSectionContainUserWithText(name: string) {
    return await expect(this.userSectionCard).toContainText(name);
  }

  async filterByStatusName(statusName: string) {
    await this.statusBtn.click();
    await this.page.locator('label').filter({hasText: statusName}).click();
  }

  async filterByGroupName(groupName: string) {
    await this.groupBtn.click();
    await this.page.locator('label').filter({hasText: groupName}).click();
  }

  async isPasswordUpdatedForUserWithId(userId: string) {
    await Promise.all([
      this.page.waitForResponse(resp => resp.url().includes(umbracoConfig.environment.baseUrl + '/umbraco/management/api/v1/user/' + userId + '/change-password') && resp.status() === 200),
      await this.clickConfirmButton()
    ]);
  }
  
  async clickChooseContentStartNodeButton() {
    await this.page.locator('umb-input-document').getByLabel('Choose').click();
  }

  async clickChooseMediaStartNodeButton() {
    await this.page.locator('umb-input-media').getByLabel('Choose').click();
  }
  async clickChooseContainerButton(){
    await this.page.locator('#container').getByLabel('Choose').click();
  }
  
  async selectUserLanguage(language: string) {
    await this.page.locator('[label="UI Culture"] [label="combobox-input"]').click();
    await this.page.getByText(language).click();
  }

  async clickRemoveButtonForContentNodeWithName(name: string) {
    await this.page.locator('umb-input-document').locator('[name="' + name + '"]').locator('[label="Remove"]').click();
  }

  async clickRemoveButtonForMediaNodeWithName(name: string) {
    await this.page.locator('umb-input-media').locator('[name="' + name + '"]').locator('[label="Remove"]').click();
  }
  
}