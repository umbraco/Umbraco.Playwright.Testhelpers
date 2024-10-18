import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class UserGroupUiHelper extends UiBaseLocators {
  private readonly userGroupsTabBtn: Locator;
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

  constructor(page: Page) {
    super(page);
    this.userGroupsTabBtn = page.getByRole('tab', {name: 'User Groups'});
    this.permissionVerbBtn = page.locator('umb-input-user-permission-verb');
    this.chooseSectionBtn = page.locator('umb-input-section').getByLabel('Choose');
    this.languageInput = page.locator('umb-input-language');
    this.chooseLanguageBtn = this.languageInput.getByLabel('Choose');
    this.userGroupCreateBtn = page.getByLabel('Create');
    this.allowAccessToAllLanguagesBtn = page.getByText('Allow access to all languages');
    this.allowAccessToAllDocumentsBtn = page.getByText('Allow access to all documents');
    this.allowAccessToAllMediaBtn = page.getByText('Allow access to all media');
    this.contentStartNode = page.locator('umb-input-document')
    this.mediaStartNode = page.locator('umb-input-media')
    this.section = page.locator('umb-ref-section');
    this.granularPermission = page.locator('umb-input-document-granular-user-permission');
    this.addGranularPermissionBtn =  this.granularPermission.getByLabel('Add');
    this.granularPermissionsModal = page.locator('umb-entity-user-permission-settings-modal')
  }

  async clickUserGroupsTabButton() {
    await this.page.waitForTimeout(500);
    await this.userGroupsTabBtn.click({force: true});
    await this.page.waitForTimeout(500);
  }
  
  async enterUserGroupName(name: string) {
    await this.enterAName.clear();
    await this.enterAName.fill(name);
  }
  
  async addLanguageToUserGroup(languageName: string) {
    await this.chooseLanguageBtn.click();
    await this.page.getByLabel(languageName, {exact: true}).click();
    await this.clickSubmitButton();
  }
  
  async clickAllowAccessToAllLanguages() {
    await this.allowAccessToAllLanguagesBtn.click();
  }
  
  async clickAllowAccessToAllDocuments() {
    await this.allowAccessToAllDocumentsBtn.click();
  }
  
  async clickAllowAccessToAllMedia() {
    await this.allowAccessToAllMediaBtn.click();
  }
  
  async clickCreateUserGroupButton() {
    await this.userGroupCreateBtn.click();
  }
  
  async clickRemoveLanguageFromUserGroup(languageName: string) 
  {
    await this.page.locator('uui-ref-node').filter({hasText:languageName}).getByLabel('Remove').click();
  }

  async isUserGroupWithNameVisible(name: string, isVisible = true) {
    return await expect(this.page.locator('uui-table-row', {hasText: name})).toBeVisible({visible: isVisible});
  }

  async clickUserGroupWithName(name: string) {
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
    return await expect(this.permissionVerbBtn.filter({has: this.page.getByLabel(permissionName, {exact: true})}).locator('uui-toggle').locator('#icon-checked').getByRole('img')).toBeVisible({visible: hasPermission});
  }
  
  async doesUserGroupHaveGranularPermission(permissionName: string, hasPermission = true) {
    
    return await expect(this.granularPermissionsModal.filter({has: this.page.getByLabel(permissionName, {exact: true})}).locator('uui-toggle').locator('#icon-checked').getByRole('img')).toBeVisible({visible: hasPermission});
  }

  async addSectionWithNameToUserGroup(sectionName: string) {
    await this.clickChooseSectionButton();
    await this.page.getByLabel(sectionName, {exact: true}).click();
    await this.clickSubmitButton();
  }

  async clickChooseSectionButton() {
    await this.chooseSectionBtn.click();
  }

  async doesUserGroupHaveSection(userGroupName: string, sectionName: string, hasSection = true) {
    return await expect(this.page.locator('uui-table-row', {hasText: userGroupName}).locator('umb-user-group-table-sections-column-layout', {hasText: sectionName})).toBeVisible({visible: hasSection});
  }
  
  async doesUserGroupContainLanguage(languageName : string, isVisible = true) {
    return await expect(this.languageInput.filter({hasText: languageName})).toBeVisible({visible: isVisible});
  }
  
  async clickRemoveSectionFromUserGroup(sectionName: string) {
    await this.section.filter({hasText: sectionName}).getByLabel('Remove').click();
  }
  
  async clickRemoveContentStartNodeFromUserGroup(contentStartNodeName: string) {
    await this.contentStartNode.filter({hasText: contentStartNodeName}).getByLabel('Remove').click();
  }
  
  async clickRemoveMediaStartNodeFromUserGroup(mediaStartNodeName: string) {
    await this.mediaStartNode.filter({hasText:mediaStartNodeName}).getByLabel('Remove').click({force: true});
  }

  async doesUserGroupHavePermissionEnabled(permissionName: string[]) {
    return await Promise.all(
      permissionName.map(permission => this.doesUserGroupHavePermission(permission))
    );
  }
  
  async clickGranularPermissionWithName(permissionName: string) {
    await this.granularPermission.getByText(permissionName).click();
  }
  
  async clickAddGranularPermission() {
    await this.addGranularPermissionBtn.click();
  }

  async clickRemoveGranularPermissionWithName(permissionName: string) {
    await this.granularPermission.filter({hasText:permissionName}).getByLabel('Remove').click();
  }
}