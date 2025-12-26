import {Locator, Page} from "@playwright/test"
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
  private readonly inputEntityUserPermissionList: Locator;
  private readonly sectionList: Locator;

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
    this.sectionList = page.locator('umb-input-section uui-ref-list');
    this.section = this.sectionList.locator('umb-ref-section');
    this.granularPermission = page.locator('umb-input-document-granular-user-permission');
    this.addGranularPermissionBtn = this.granularPermission.getByLabel('Add');
    this.granularPermissionsModal = page.locator('umb-entity-user-permission-settings-modal');
    this.iconChecked = page.locator('uui-toggle').locator('#icon-checked').getByRole('img');
    this.inputEntityUserPermissionList = page.locator('umb-user-group-entity-user-permission-list');
  }

  async clickUserGroupsButton() {
    await this.click(this.userGroupsBtn);
    await this.page.waitForTimeout(500);
  }

  async enterUserGroupName(name: string) {
    await this.enterText(this.enterAName, name);
  }

  async addLanguageToUserGroup(languageName: string) {
    await this.click(this.chooseLanguageBtn);
    await this.clickLabelWithName(languageName, true);
    await this.clickSubmitButton();
  }

  async clickAllowAccessToAllLanguages() {
    await this.click(this.allowAccessToAllLanguagesBtn);
  }

  async clickAllowAccessToAllDocuments() {
    await this.click(this.allowAccessToAllDocumentsBtn);
  }

  async clickAllowAccessToAllMedia() {
    await this.click(this.allowAccessToAllMediaBtn);
  }

  async waitForUserGroupToBeCreated() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForUserGroupToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForUserGroupToBeRenamed() {
    await this.waitForNetworkToBeIdle();
  }

  async clickCreateUserGroupButton() {
    await this.click(this.userGroupCreateBtn);
  }

  async clickRemoveLanguageFromUserGroup(languageName: string) {
    await this.click(this.page.locator('umb-entity-item-ref').filter({hasText: languageName}).getByLabel('Remove'));
  }

  async isUserGroupWithNameVisible(name: string, isVisible = true) {
    return await this.isVisible(this.page.locator('uui-table-row', {hasText: name}), isVisible);
  }

  async clickUserGroupWithName(name: string) {
    await this.click(this.page.getByRole('link', {name: name}));
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
    await this.isVisible(this.permissionVerbBtn.filter({has: this.page.getByLabel(permissionName, {exact: true})}).filter({has: this.iconChecked}), hasPermission);
  }

  async doesUserGroupHaveGranularPermission(permissionName: string, hasPermission = true) {
    await this.isVisible(this.granularPermissionsModal.filter({has: this.page.getByLabel(permissionName, {exact: true})}).filter({has: this.iconChecked}), hasPermission);
  }

  async addSectionWithNameToUserGroup(sectionName: string) {
    await this.clickChooseSectionButton();
    await this.clickLabelWithName(sectionName, true);
    await this.clickSubmitButton();
  }

  async clickChooseSectionButton() {
    await this.click(this.chooseSectionBtn);
  }

  async doesUserGroupTableHaveSection(userGroupName: string, sectionName: string, hasSection = true) {
    await this.isVisible(this.page.locator('uui-table-row', {hasText: userGroupName}).locator('umb-user-group-table-sections-column-layout', {hasText: sectionName}), hasSection);
  }

  async doesUserGroupContainLanguage(languageName: string, isVisible = true) {
    await this.isVisible(this.languageInput);
    await this.isVisible(this.languageInput.filter({hasText: languageName}), isVisible);
  }

  async clickRemoveSectionFromUserGroup(sectionName: string) {
    await this.click(this.section.filter({hasText: sectionName}).getByLabel('Remove'));
  }

  async clickRemoveContentStartNodeFromUserGroup(contentStartNodeName: string) {
    await this.click(this.contentStartNode.filter({hasText: contentStartNodeName}).getByLabel('Remove'));
  }

  async clickRemoveMediaStartNodeFromUserGroup(mediaStartNodeName: string) {
    const removeMediaStartNodeWithNameLocator = this.mediaStartNode.filter({hasText: mediaStartNodeName}).getByLabel('Remove');
    await this.isVisible(removeMediaStartNodeWithNameLocator);
    // Force click is needed
    await removeMediaStartNodeWithNameLocator.click({force: true});
  }

  async doesUserGroupHavePermissionEnabled(permissionName: string[]) {
    return await Promise.all(
      permissionName.map(permission => this.doesUserGroupHavePermission(permission))
    );
  }

  async clickGranularPermissionWithName(permissionName: string) {
    await this.click(this.granularPermission.getByText(permissionName));
  }

  async clickAddGranularPermission() {
    await this.click(this.addGranularPermissionBtn);
  }

  async clickRemoveGranularPermissionWithName(permissionName: string) {
    await this.click(this.granularPermission.filter({hasText: permissionName}).getByLabel('Remove'));
  }

  async doesSettingHaveValue(headline: string, settings) {
    for (let index = 0; index < Object.keys(settings).length; index++) {
      const [label, description] = settings[index];
      const propertyLocator = this.page.locator('uui-box').filter({hasText: headline}).locator('umb-property-layout').nth(index);
      await this.hasText(propertyLocator.locator('#headerColumn #label'), label);
      if (description !== '')
        await this.hasText(propertyLocator.locator('#description'), description);
    }
  }

  async doesPermissionsSettingsHaveValue(settings) {
    for (let index = 0; index < Object.keys(settings).length; index++) {
      const [name, description] = settings[index];
      const permissionItemLocator = this.inputEntityUserPermissionList.locator(this.permissionVerbBtn).nth(index);
      await this.hasText(permissionItemLocator.locator('#name'), name);
      if (description !== '')
        await this.hasText(permissionItemLocator.locator('#setting small'), description);
    }
  }

  async doesUserGroupContainSection(section: string) {
    return await this.containsText(this.sectionList, section);
  }

  async doesUserGroupHaveSections(sections: string[]) {
    return await Promise.all(
      sections.map(section => this.doesUserGroupContainSection(section))
    );
  }

  async doesUserGroupSectionsHaveCount(count: number) {
    return await this.hasCount(this.section, count);
  }
}