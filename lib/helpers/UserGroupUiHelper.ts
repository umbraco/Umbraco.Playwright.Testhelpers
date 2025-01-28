import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class UserGroupUiHelper extends UiBaseLocators {
  private readonly userGroupsBtn: Locator;
  private readonly chooseSectionBtn: Locator;
  private readonly languageInput: Locator;
  private readonly chooseLanguageBtn: Locator;
  private readonly permissionVerbBtn: Locator;
  private readonly userGroupCreateBtn: Locator;
  private readonly allowAccessToAllLanguagesBtn: Locator;
  private readonly allowAccessToAllDocumentsBtn: Locator;
  private readonly allowAccessToAllMediaBtn: Locator;
  private readonly contentStartNode: Locator;
  private readonly mediaStartNode: Locator;
  private readonly section: Locator;
  private readonly granularPermission: Locator;
  private readonly addGranularPermissionBtn: Locator;
  private readonly granularPermissionsModal: Locator;
  private readonly iconChecked: Locator;

  constructor(page: Page) {
    super(page);
    this.userGroupsBtn = page.getByLabel('User groups');
    this.permissionVerbBtn = page.locator('umb-input-user-permission-verb');
    this.chooseSectionBtn = page.locator('umb-input-section').getByLabel('Choose');
    this.languageInput = page.locator('umb-input-language');
    this.chooseLanguageBtn = this.languageInput.getByLabel('Choose');
    this.userGroupCreateBtn = page.getByLabel('Create');
    this.allowAccessToAllLanguagesBtn = page.getByText('Allow access to all languages');
    this.allowAccessToAllDocumentsBtn = page.getByText('Allow access to all documents');
    this.allowAccessToAllMediaBtn = page.getByText('Allow access to all media');
    this.contentStartNode = page.locator('umb-input-document');
    this.mediaStartNode = page.locator('umb-input-media');
    this.section = page.locator('umb-ref-section');
    this.granularPermission = page.locator('umb-input-document-granular-user-permission');
    this.addGranularPermissionBtn = this.granularPermission.getByLabel('Add');
    this.granularPermissionsModal = page.locator('umb-entity-user-permission-settings-modal');
    this.iconChecked = page.locator('uui-toggle').locator('#icon-checked').getByRole('img');
  }

  async clickUserGroupsButton() {
    // await this.page.waitForTimeout(500);
    await expect(this.userGroupsBtn).toBeVisible();
    await this.userGroupsBtn.click();
    await this.page.waitForTimeout(500);
  }

  async enterUserGroupName(name: string) {
    await expect(this.enterAName).toBeVisible();
    await this.enterAName.clear();
    await this.enterAName.fill(name);
  }

  async addLanguageToUserGroup(languageName: string) {
    await expect(this.chooseLanguageBtn).toBeVisible();
    await this.chooseLanguageBtn.click();
    await this.clickLabelWithName(languageName, true);
    await this.clickSubmitButton();
  }

  async clickAllowAccessToAllLanguages() {
    await expect(this.allowAccessToAllLanguagesBtn).toBeVisible();
    await this.allowAccessToAllLanguagesBtn.click();
  }

  async clickAllowAccessToAllDocuments() {
    await expect(this.allowAccessToAllDocumentsBtn).toBeVisible();
    await this.allowAccessToAllDocumentsBtn.click();
  }

  async clickAllowAccessToAllMedia() {
    await expect(this.allowAccessToAllMediaBtn).toBeVisible();
    await this.allowAccessToAllMediaBtn.click();
  }

  async clickCreateUserGroupButton() {
    await expect(this.userGroupCreateBtn).toBeVisible();
    await this.userGroupCreateBtn.click();
  }

  async clickRemoveLanguageFromUserGroup(languageName: string) {
    await expect(this.page.locator('uui-ref-node').filter({hasText: languageName}).getByLabel('Remove')).toBeVisible();
    await this.page.locator('uui-ref-node').filter({hasText: languageName}).getByLabel('Remove').click();
  }

  async isUserGroupWithNameVisible(name: string, isVisible = true) {
    return await expect(this.page.locator('uui-table-row', {hasText: name})).toBeVisible({visible: isVisible});
  }

  async clickUserGroupWithName(name: string) {
    await expect(this.page.getByRole('link', {name: name})).toBeVisible();
    await this.page.getByRole('link', {name: name}).click();
    await this.page.waitForTimeout(200);
  }

  async clickPermissionsByName(permissionName: string[]) {
    for (let i = 0; i < permissionName.length; i++) {
      await this.permissionVerbBtn.getByText(permissionName[i], {exact: true}).click();
    }
  }

  async clickGranularPermissionsByName(permissionName: string[]) {
    for (let i = 0; i < permissionName.length; i++) {
      await this.granularPermissionsModal.getByText(permissionName[i], {exact: true}).click();
    }
  }

  async doesUserGroupHavePermission(permissionName: string, hasPermission = true) {
    await expect(this.permissionVerbBtn.filter({has: this.page.getByLabel(permissionName, {exact: true})}).filter({has: this.iconChecked})).toBeVisible({visible: hasPermission});
  }

  async doesUserGroupHaveGranularPermission(permissionName: string, hasPermission = true) {
    await expect(this.granularPermissionsModal.filter({has: this.page.getByLabel(permissionName, {exact: true})}).filter({has: this.iconChecked})).toBeVisible({visible: hasPermission});
  }

  async addSectionWithNameToUserGroup(sectionName: string) {
    await this.clickChooseSectionButton();
    await this.clickLabelWithName(sectionName, true);
    await this.clickSubmitButton();
  }

  async clickChooseSectionButton() {
    await expect(this.chooseSectionBtn).toBeVisible();
    await this.chooseSectionBtn.click();
  }

  async doesUserGroupHaveSection(userGroupName: string, sectionName: string, hasSection = true) {
    await expect(this.page.locator('uui-table-row', {hasText: userGroupName}).locator('umb-user-group-table-sections-column-layout', {hasText: sectionName})).toBeVisible({visible: hasSection});
  }

  async doesUserGroupContainLanguage(languageName: string, isVisible = true) {
    await expect(this.languageInput).toBeVisible();
    await expect(this.languageInput.filter({hasText: languageName})).toBeVisible({visible: isVisible});
  }

  async clickRemoveSectionFromUserGroup(sectionName: string) {
    await expect(this.section.filter({hasText: sectionName}).getByLabel('Remove')).toBeVisible();
    await this.section.filter({hasText: sectionName}).getByLabel('Remove').click();
  }

  async clickRemoveContentStartNodeFromUserGroup(contentStartNodeName: string) {
    await expect(this.contentStartNode.filter({hasText: contentStartNodeName}).getByLabel('Remove')).toBeVisible();
    await this.contentStartNode.filter({hasText: contentStartNodeName}).getByLabel('Remove').click();
  }

  async clickRemoveMediaStartNodeFromUserGroup(mediaStartNodeName: string) {
    const removeMediaStartNodeWithNameLocator = this.mediaStartNode.filter({hasText: mediaStartNodeName}).getByLabel('Remove');
    await expect(removeMediaStartNodeWithNameLocator).toBeVisible();
    // Force click is needed
    await removeMediaStartNodeWithNameLocator.click({force: true});
  }

  async doesUserGroupHavePermissionEnabled(permissionName: string[]) {
    return await Promise.all(
      permissionName.map(permission => this.doesUserGroupHavePermission(permission))
    );
  }

  async clickGranularPermissionWithName(permissionName: string) {
    await expect(this.granularPermission.getByText(permissionName)).toBeVisible();
    await this.granularPermission.getByText(permissionName).click();
  }

  async clickAddGranularPermission() {
    await expect(this.addGranularPermissionBtn).toBeVisible();
    await this.addGranularPermissionBtn.click();
  }

  async clickRemoveGranularPermissionWithName(permissionName: string) {
    await expect(this.granularPermission.filter({hasText: permissionName}).getByLabel('Remove')).toBeVisible();
    await this.granularPermission.filter({hasText: permissionName}).getByLabel('Remove').click();
  }
}