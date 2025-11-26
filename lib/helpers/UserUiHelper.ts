import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {umbracoConfig} from "../../umbraco.config";
import {ConstantHelper} from "./ConstantHelper";

export class UserUiHelper extends UiBaseLocators {
  private readonly usersBtn: Locator;
  private readonly createUserBtn: Locator;
  private readonly nameOfTheUserTxt: Locator;
  private readonly userEmailTxt: Locator;
  private readonly addUserGroupsBtn: Locator;
  private readonly openUserGroupsBtn: Locator;
  private readonly updatedNameOfTheUserTxt: Locator;
  private readonly changePasswordBtn: Locator;
  private readonly changePhotoBtn: Locator;
  private readonly removePhotoBtn: Locator;
  private readonly searchInUserSectionTxt: Locator;
  private readonly userSectionCard: Locator;
  private readonly statusBtn: Locator;
  private readonly groupBtn: Locator;
  private readonly chooseUserGroupsBtn: Locator;
  private readonly allowAccessToAllDocumentsToggle: Locator;
  private readonly allowAccessToAllMediaToggle: Locator;
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
  private readonly userGrid: Locator;
  private readonly apiUserBtn: Locator;
  private readonly goToProfileBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.usersBtn = page.getByLabel('Users');
    this.createUserBtn = page.getByLabel('Create user');
    this.nameOfTheUserTxt = page.getByLabel('name', {exact: true});
    this.userEmailTxt = page.getByLabel('email');
    this.addUserGroupsBtn = page.locator('#userGroups').getByLabel('open', {exact: true});
    this.openUserGroupsBtn = page.locator('[label="Groups"]').getByLabel('open', {exact: true});
    this.chooseUserGroupsBtn = page.locator('umb-user-group-input').getByLabel('Choose');
    this.updatedNameOfTheUserTxt = page.locator('umb-workspace-header-name-editable').locator('input');
    this.changePasswordBtn = page.getByLabel('Change your password');
    this.changePhotoBtn = page.getByLabel('Change photo');
    this.removePhotoBtn = page.getByLabel('Remove photo');
    this.searchInUserSectionTxt = page.locator('umb-collection-filter-field #input');
    this.userSectionCard = page.locator('uui-card-user');
    this.statusBtn = page.locator('uui-button', {hasText: 'Status'});
    this.groupBtn = page.locator('uui-button', {hasText: 'Groups'});
    this.allowAccessToAllDocumentsToggle = page.locator('umb-property-layout').filter({hasText: 'Allow access to all documents'}).locator('#toggle');
    this.allowAccessToAllMediaToggle = page.locator('umb-property-layout').filter({hasText: 'Allow access to all media'}).locator('#toggle');
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
    this.userGrid = page.locator('#user-grid');
    this.apiUserBtn = page.locator('#collection-action-menu-popover').getByLabel('API User', {exact: true});
    this.goToProfileBtn = page.getByLabel('Go to profile', {exact: true});
  }

  async clickUsersButton() {
    await expect(this.usersBtn).toBeVisible();
    await this.usersBtn.click();
  }

  async clickCreateUserButton() {
    await this.createUserBtn.click();
    await this.page.waitForTimeout(500);
  }

  async enterNameOfTheUser(name: string) {
    await this.nameOfTheUserTxt.fill(name);
  }

  async enterUserEmail(email: string) {
    await this.userEmailTxt.fill(email);
  }

  async waitForUserToBeCreated() {
    await this.page.waitForLoadState();
  }

  async waitForUserToBeDeleted() {
    await this.page.waitForLoadState();
  }

  async waitForUserToBeRenamed() {
    await this.page.waitForLoadState();
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
    const userNameLocator = this.page.locator('#open-part').getByText(name, {exact: true});
    await expect(userNameLocator).toBeVisible();
    await userNameLocator.click();
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
    let userCount = 0;

    while (true) {
      await this.page.waitForTimeout(1000);
      const currentPageCount = await this.userSectionCard.count();
      userCount += currentPageCount;

      // If we have more than 50 users, we will need to use the pagination
      if (amount > 50) {
        const nextButton = this.nextPaginationBtn;
        const isNextEnabled = await nextButton.isEnabled();
        if (!isNextEnabled) {
          break;
        }

        await this.clickNextButton();
        await this.page.waitForTimeout(1000);
      }
    }

    // If we actually navigated through the pagination, we should go back
    if (amount > 50) {
      const firstPage = this.firstPaginationBtn;
      const isFirstPageEnabled = await firstPage.isEnabled();
      if (isFirstPageEnabled) {
        firstPage.click();
      }
      
      await this.page.waitForTimeout(1000);
    }
    
    return expect(userCount).toBe(amount);
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

  async clickChooseContainerButton() {
    await this.chooseContainerBtn.click();
  }

  async selectUserLanguage(language: string) {
    await this.languageBtn.selectOption(language, {force: true});
  }

  async clickRemoveButtonForContentNodeWithName(name: string) {
    await this.entityItem.filter({has: this.page.locator('[name="' + name + '"]')}).hover();
    await this.entityItem.filter({has: this.page.locator('[name="' + name + '"]')}).getByRole('button', { name: 'Remove' }).click({force: true});
  }

  async clickRemoveButtonForMediaNodeWithName(name: string) {
    await this.mediaInput.locator('[name="' + name + '"]').locator('[label="Remove"]').click();
  }

  async clickAllowAccessToAllDocumentsToggle() {
    await this.allowAccessToAllDocumentsToggle.click();
  }

  async clickAllowAccessToAllMediaToggle() {
    await this.allowAccessToAllMediaToggle.click();
  }

  async isUserDisabledTextVisible() {
    return await expect(this.disabledTxt).toBeVisible();
  }

  async isUserActiveTextVisible() {
    return await expect(this.activeTxt).toBeVisible();
  }

  async orderByNewestUser() {
    await expect(this.orderByBtn).toBeVisible();
    // Force click is needed
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

  async goToUserWithName(name: string) {
    await this.goToSection(ConstantHelper.sections.users);
    await this.clickUsersMenu();
    await this.searchInUserSection(name);
    await this.clickUserWithName(name);
  }
  
  async clickUserButton() {
    await this.userBtn.click();
  }
  
  async isGoToProfileButtonVisible(isVisible: boolean = true) {
    await expect(this.goToProfileBtn).toBeVisible({visible: isVisible});
  }

  async clickAPIUserButton() {
    await this.apiUserBtn.click();
  }
}