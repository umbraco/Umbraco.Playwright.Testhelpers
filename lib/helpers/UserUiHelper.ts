import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {umbracoConfig} from "../../umbraco.config";
import {ConstantHelper} from "./ConstantHelper";

export class UserUiHelper extends UiBaseLocators {
  private readonly usersTabBtn: Locator;
  private readonly createUserBtn: Locator;
  private readonly nameOfTheUserTxt: Locator;
  private readonly userEmailTxt: Locator;
  private readonly addUserGroupsBtn: Locator;
  private readonly openUserGroupsBtn: Locator;
  private readonly updatedNameOfTheUserTxt: Locator;
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
  private readonly allowAccessToAllDocumentsBtn: Locator;
  private readonly allowAccessToAllMediaBtn: Locator;
  private readonly chooseDocumentInputBtn: Locator;
  private readonly chooseMediaInputBtn: Locator;
  private readonly documentInput: Locator;
  private readonly mediaInput: Locator;
  private readonly chooseContainerBtn: Locator;
  private readonly languageBtn: Locator;
  private readonly disabledTxt: Locator;
  private readonly activeTxt: Locator;
  private readonly orderByBtn: Locator;
  private readonly orderByNewestBtn: Locator;
  private readonly documentStartNode: Locator;
  private readonly mediaStartNode: Locator;
  private readonly usersMenu: Locator;
  private readonly userBtn: Locator;
  private readonly actionBtn: Locator;
  private readonly userGrid: Locator;

  constructor(page: Page) {
    super(page);
    this.usersTabBtn = page.locator('#views').getByRole('tab', {name: 'Users'});
    this.createUserBtn = page.getByLabel('Create user');
    this.nameOfTheUserTxt = page.getByLabel('name', {exact: true});
    this.userEmailTxt = page.getByLabel('email');
    this.addUserGroupsBtn = page.locator('#userGroups').getByLabel('open', {exact: true});
    this.openUserGroupsBtn = page.locator('[label="Groups"]').getByLabel('open', {exact: true});
    this.chooseUserGroupsBtn = page.locator('umb-user-group-input').getByLabel('Choose');
    this.updatedNameOfTheUserTxt = page.locator('umb-workspace-header-name-editable').locator('input');
    this.changePasswordBtn = page.getByLabel('Change password');
    this.newPasswordTxt = page.locator('input[name="newPassword"]');
    this.confirmPasswordTxt = page.locator('input[name="confirmPassword"]');
    this.changePhotoBtn = page.getByLabel('Change photo');
    this.removePhotoBtn = page.getByLabel('Remove photo');
    this.searchInUserSectionTxt = page.getByLabel('Search the users section');
    this.userSectionCard = page.locator('uui-card-user');
    this.statusBtn = page.locator('uui-button', {hasText: 'Status'});
    this.groupBtn = page.locator('uui-button', {hasText: 'Groups'});
    this.allowAccessToAllDocumentsBtn = page.locator('umb-property-layout').filter({hasText: 'Allow access to all documents'}).locator('#slider');
    this.allowAccessToAllMediaBtn = page.locator('umb-property-layout').filter({hasText: 'Allow access to all media'}).locator('#slider');
    this.chooseDocumentInputBtn = page.locator('umb-input-document').getByLabel('Choose');
    this.chooseMediaInputBtn = page.locator('umb-input-media').getByLabel('Choose');
    this.documentInput = page.locator('umb-input-document');
    this.mediaInput = page.locator('umb-input-media');
    this.chooseContainerBtn = page.locator('#container').getByLabel('Choose');
    this.languageBtn = page.locator('[label="UI Culture"] select');
    this.disabledTxt = page.getByText('Disabled', {exact: true});
    this.activeTxt = page.getByText('Active', {exact: true});
    this.orderByBtn = page.getByLabel('order by');
    this.orderByNewestBtn = page.getByLabel('Newest');
    this.documentStartNode = page.locator('umb-user-document-start-node');
    this.mediaStartNode = page.locator('umb-user-media-start-node');
    this.usersMenu = page.locator('umb-menu').getByLabel('Users', {exact: true});
    this.userBtn = page.locator('#collection-action-menu-popover').getByLabel('User', {exact: true});
    this.actionBtn = page.locator('umb-workspace-entity-action-menu').getByLabel('Actions', {exact: true});
    this.userGrid = page.locator('#user-grid');
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

  async clickChooseUserGroupsButton() {
    await this.chooseUserGroupsBtn.click();
  }

  async clickOpenUserGroupsButton() {
    await this.openUserGroupsBtn.click();
  }

  async enterUpdatedNameOfUser(name: string) {
    await this.updatedNameOfTheUserTxt.fill(name);
  }

  async clickUserWithName(name: string) {
    await expect(this.page.getByText(name, {exact: true})).toBeVisible();
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
    return await expect(this.userGrid).toContainText(name);
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
    await this.chooseDocumentInputBtn.click();
  }

  async clickChooseMediaStartNodeButton() {
    await this.chooseMediaInputBtn.click({force: true});
  }

  async clickChooseContainerButton() {
    await this.chooseContainerBtn.click();
  }

  async selectUserLanguage(language: string) {
    await this.languageBtn.selectOption(language);
  }

  async clickRemoveButtonForContentNodeWithName(name: string) {
    await this.documentInput.locator('[name="' + name + '"]').locator('[label="Remove"]').click();
  }

  async clickRemoveButtonForMediaNodeWithName(name: string) {
    await this.mediaInput.locator('[name="' + name + '"]').locator('[label="Remove"]').click();
  }

  async clickMediaCardWithName(name: string) {
    await this.mediaCardItems.filter({hasText: name}).locator('umb-icon').click();
  }

  async clickAllowAccessToAllDocumentsSlider() {
    await this.allowAccessToAllDocumentsBtn.click();
  }

  async clickAllowAccessToAllMediaSlider() {
    await this.allowAccessToAllMediaBtn.click();
  }

  async isUserDisabledTextVisible() {
    return await expect(this.disabledTxt).toBeVisible();
  }

  async isUserActiveTextVisible() {
    return await expect(this.activeTxt).toBeVisible();
  }

  async orderByNewestUser() {
    await this.orderByBtn.click({force: true});
    await this.orderByNewestBtn.click();
  }

  async isUserWithNameTheFirstUserInList(name: string) {
    await expect(this.userSectionCard.first()).toContainText(name);
  }

  async doesUserHaveAccessToContentNode(name: string) {
    return await expect(this.documentStartNode.locator('[name="' + name + '"]')).toBeVisible();
  }

  async doesUserHaveAccessToMediaNode(name: string) {
    return await expect(this.mediaStartNode.locator('[name="' + name + '"]')).toBeVisible();
  }

  async clickUsersMenu() {
    await this.usersMenu.click();
  }

  async goToUsers() {
    await this.goToSection(ConstantHelper.sections.users);
    await this.clickUsersMenu();
  }

  async clickUserButton() {
    await this.userBtn.click();
  }

  async clickActionButton() {
    await expect(this.actionBtn).toBeVisible();
    await this.page.waitForTimeout(500);
    await this.actionBtn.click();
  }
}