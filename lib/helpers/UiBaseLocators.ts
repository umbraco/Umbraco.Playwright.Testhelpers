import {expect, Locator, Page} from "@playwright/test"
import {ConstantHelper} from "./ConstantHelper";

export class UiBaseLocators {
  public readonly page: Page;
  public readonly saveBtn: Locator;
  public readonly chooseBtn: Locator;
  public readonly submitBtn: Locator;
  public readonly createFolderBtn: Locator;
  public readonly breadcrumbBtn: Locator;
  public readonly deleteBtn: Locator;
  public readonly confirmToDeleteBtn: Locator;
  public readonly deleteLabelBtn: Locator;
  public readonly deleteExactLabelBtn: Locator;
  public readonly deleteExactBtn: Locator;
  public readonly confirmCreateFolderBtn: Locator;
  public readonly insertBtn: Locator;
  public readonly modalCaretBtn: Locator;
  public readonly queryBuilderBtn: Locator;
  public readonly queryBuilderOrderedBy: Locator;
  public readonly queryBuilderCreateDate: Locator;
  public readonly folderNameTxt: Locator;
  public readonly textAreaInputArea: Locator;
  public readonly wherePropertyAliasBtn: Locator;
  public readonly whereOperatorBtn: Locator;
  public readonly whereConstrainValueTxt: Locator;
  public readonly orderByPropertyAliasBtn: Locator;
  public readonly ascendingBtn: Locator;
  public readonly queryBuilderShowCode: Locator;
  public readonly createThreeDotsBtn: Locator;
  public readonly newFolderThreeDotsBtn: Locator;
  public readonly renameThreeDotsBtn: Locator;
  public readonly newNameTxt: Locator;
  public readonly renameModalBtn: Locator;
  public readonly createBtn: Locator;
  public readonly successState: Locator;
  public readonly chooseModalBtn: Locator;
  public readonly addBtn: Locator;
  public readonly renameFolderThreeDotsBtn: Locator;
  public readonly renameFolderBtn: Locator;
  public readonly updateFolderBtn: Locator;
  public readonly filterChooseBtn: Locator;
  public readonly updateBtn: Locator;
  public readonly changeBtn: Locator;
  public readonly propertyNameTxt: Locator;
  public readonly selectPropertyEditorBtn: Locator;
  public readonly addGroupBtn: Locator;
  public readonly iAmDoneReorderingBtn: Locator;
  public readonly reorderBtn: Locator;
  public readonly compositionsBtn: Locator;
  public readonly addTabBtn: Locator;
  public readonly descriptionBtn: Locator;
  public readonly enterDescriptionTxt: Locator;
  public readonly mandatorySlider: Locator;
  public readonly validation: Locator;
  public readonly regexTxt: Locator;
  public readonly regexMessageTxt: Locator;
  public readonly structureTabBtn: Locator;
  public readonly allowAtRootBtn: Locator;
  public readonly addPropertyBtn: Locator;
  public readonly typeToFilterSearchTxt: Locator;
  public readonly editorSettingsBtn: Locator;
  public readonly labelAboveBtn: Locator;
  public readonly unnamedTxt: Locator;
  public readonly deleteThreeDotsBtn: Locator;
  public readonly removeExactBtn: Locator;
  public readonly confirmBtn: Locator;
  public readonly disableBtn: Locator;
  public readonly confirmDisableBtn: Locator;
  public readonly enableBtn: Locator;
  public readonly confirmEnableBtn: Locator;
  public readonly iconBtn: Locator;
  public readonly aliasLockBtn: Locator;
  public readonly aliasNameTxt: Locator;
  public readonly deleteFolderThreeDotsBtn: Locator;
  public readonly createLink: Locator;
  public readonly insertValueBtn: Locator;
  public readonly insertPartialViewBtn: Locator;
  public readonly insertDictionaryItemBtn: Locator;
  public readonly chooseFieldDropDown: Locator;
  public readonly systemFieldsOption: Locator;
  public readonly chooseFieldValueDropDown: Locator;
  public readonly renameBtn: Locator;
  public readonly deleteFolderBtn: Locator;
  public readonly returnedItemsCount: Locator;
  public readonly chooseRootContentBtn: Locator;
  public readonly queryResults: Locator;
  public readonly reloadBtn: Locator;
  public readonly confirmToRemoveBtn: Locator;
  public readonly confirmToSubmitBtn: Locator;
  public readonly propertySettingsModal: Locator;
  public readonly typeGroups: Locator;
  public readonly allowedChildNodesModal: Locator;
  public readonly configureAsACollectionBtn: Locator;
  public readonly errorNotification: Locator;
  public readonly successNotification: Locator;
  public readonly leftArrowBtn: Locator;
  public readonly clickToUploadBtn: Locator;
  public readonly backOfficeHeader: Locator;
  public readonly failedStateButton: Locator;
  public readonly sidebarModal: Locator;
  public readonly enterAName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.saveBtn = page.getByLabel('Save', {exact: true});
    this.submitBtn = page.getByLabel('Submit');
    this.deleteExactLabelBtn = page.getByLabel('Delete', {exact: true});
    this.deleteExactBtn = page.getByRole('button', {name: 'Delete', exact: true});
    this.deleteLabelBtn = page.getByLabel('Delete');
    this.deleteBtn = page.getByRole('button', {name: 'Delete'});
    this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
    this.confirmCreateFolderBtn = page.locator('#confirm').getByLabel('Create Folder');
    this.breadcrumbBtn = page.getByLabel('Breadcrumb');
    this.createFolderBtn = page.getByLabel('Create folder');
    this.insertBtn = page.locator('uui-box uui-button').filter({hasText: 'Insert'});
    this.sidebarModal = page.locator('uui-modal-sidebar');
    this.modalCaretBtn = this.sidebarModal.locator('#caret-button');
    this.enterAName = page.getByLabel('Enter a name...', {exact: true});
    this.queryBuilderBtn = page.locator('#query-builder-button').getByLabel('Query builder');
    this.queryBuilderOrderedBy = page.locator('#property-alias-dropdown').getByLabel('Property alias');
    this.queryBuilderCreateDate = page.locator('#property-alias-dropdown').getByText('CreateDate').locator("..");
    this.folderNameTxt = page.getByLabel('Enter a folder name');
    this.textAreaInputArea = page.locator('textarea.inputarea');
    this.wherePropertyAliasBtn = page.locator('#property-alias-dropdown');
    this.whereOperatorBtn = page.locator('#operator-dropdown');
    this.whereConstrainValueTxt = page.getByLabel('constrain value');
    this.orderByPropertyAliasBtn = page.locator('#sort-dropdown');
    this.ascendingBtn = page.locator('[key="template_ascending"]');
    this.queryBuilderShowCode = page.locator('umb-code-block');
    this.createThreeDotsBtn = page.getByText('Create...', {exact: true});
    this.chooseBtn = page.getByLabel('Choose', {exact: true});
    this.newFolderThreeDotsBtn = page.getByLabel('New Folder...');
    this.renameThreeDotsBtn = page.getByLabel('Rename...', {exact: true});
    this.newNameTxt = page.getByRole('textbox', {name: 'Enter new name...'});
    this.renameModalBtn = page.locator('umb-rename-modal').getByLabel('Rename');
    this.createBtn = page.getByText('Create', {exact: true});
    this.successState = page.locator('[state="success"]');
    this.chooseModalBtn = page.locator('umb-tree-picker-modal').getByLabel('Choose');
    this.addBtn = page.getByLabel('Add', {exact: true});
    this.renameFolderThreeDotsBtn = page.getByLabel('Rename Folder...');
    this.renameFolderBtn = page.getByLabel('Rename folder');
    this.updateFolderBtn = page.getByLabel('Update Folder');
    this.filterChooseBtn = page.locator('button').filter({hasText: 'Choose'});
    this.updateBtn = page.getByLabel('Update');
    this.changeBtn = page.getByLabel('Change');
    this.propertyNameTxt = page.locator('#name-input #input');
    this.selectPropertyEditorBtn = page.getByLabel('Select Property Editor');
    this.addGroupBtn = page.getByLabel('Add group', {exact: true});
    this.iAmDoneReorderingBtn = page.getByLabel('I am done reordering');
    this.reorderBtn = page.getByLabel('Reorder');
    this.compositionsBtn = page.getByLabel('Compositions');
    this.addTabBtn = page.getByLabel('Add tab');
    this.descriptionBtn = page.getByLabel('Description');
    this.enterDescriptionTxt = page.getByLabel('Enter a description...');
    this.mandatorySlider = page.locator('#mandatory #slider');
    this.validation = page.locator('#native');
    this.regexTxt = page.locator('input[name="pattern"]');
    this.regexMessageTxt = page.locator('textarea[name="pattern-message"]');
    this.structureTabBtn = page.locator('uui-tab').filter({hasText: 'Structure'}).locator('svg');
    this.allowAtRootBtn = page.locator('label').filter({hasText: 'Allow at root'});
    this.addPropertyBtn = page.getByLabel('Add property', {exact: true});
    this.typeToFilterSearchTxt = page.locator('[type="search"] #input');
    this.editorSettingsBtn = page.getByLabel('Editor settings');
    this.labelAboveBtn = page.locator('button').filter({hasText: 'Label above'});
    this.unnamedTxt = page.getByRole('textbox', {name: 'Unnamed'});
    this.deleteThreeDotsBtn = page.locator('#action-modal').getByLabel('Delete...');
    this.removeExactBtn = page.getByLabel('Remove', {exact: true});
    this.confirmBtn = page.getByLabel('Confirm');
    this.disableBtn = page.getByLabel('Disable', {exact: true});
    this.confirmDisableBtn = page.locator('#confirm').getByLabel('Disable');
    this.confirmToSubmitBtn = page.locator('#confirm').getByLabel('Submit');
    this.enableBtn = page.getByLabel('Enable');
    this.confirmEnableBtn = page.locator('#confirm').getByLabel('Enable');
    this.iconBtn = page.getByLabel('icon');
    this.aliasLockBtn = page.locator('#name #alias-lock');
    this.aliasNameTxt = page.locator('#name').getByLabel('alias');
    this.deleteFolderThreeDotsBtn = page.locator('#action-modal').getByLabel('Delete Folder...');
    this.createLink = page.getByRole('link', {name: 'Create'});
    this.insertValueBtn = page.locator('uui-button').filter({has: page.locator('[key="template_insertPageField"]')});
    this.insertPartialViewBtn = page.locator('uui-button').filter({has: page.locator('[key="template_insertPartialView"]')});
    this.insertDictionaryItemBtn = page.locator('uui-button').filter({has: page.locator('[key="template_insertDictionaryItem"]')});
    this.chooseFieldDropDown = page.locator('#preview #expand-symbol-wrapper');
    this.systemFieldsOption = page.getByText('System fields');
    this.chooseFieldValueDropDown = page.locator('#value #expand-symbol-wrapper');
    this.renameBtn = page.locator('#action-modal').getByLabel('Rename');
    this.deleteFolderBtn = page.locator('#action-modal').getByLabel('Delete folder');
    this.returnedItemsCount = page.locator('#results-count');
    this.chooseRootContentBtn = page.getByLabel('Choose root document');
    this.queryResults = page.locator('query-results');
    this.reloadBtn = page.getByLabel('Reload', {exact: true});
    this.confirmToRemoveBtn = page.locator('#confirm').getByLabel('Remove');
    this.propertySettingsModal = page.locator('umb-property-type-settings-modal');
    this.typeGroups = page.locator('umb-content-type-design-editor-group');
    this.allowedChildNodesModal = page.locator('umb-tree-picker-modal');
    this.configureAsACollectionBtn = page.getByLabel('Configure as a collection');
    this.errorNotification = page.locator('uui-toast-notification >> [color="danger"]');
    this.successNotification = page.locator('uui-toast-notification >> [color="positive"]');
    this.leftArrowBtn = page.locator('[name="icon-arrow-left"] svg');
    this.clickToUploadBtn = page.getByLabel('Click to upload');
    this.backOfficeHeader = page.locator('umb-backoffice-header');
    this.failedStateButton = page.locator('uui-button[state="failed"]');
  }

  async clickActionsMenuForName(name: string) {
    await this.page.locator('[label="' + name + '"]').click();
    await this.page.locator('[label="' + name + '"] >> [label="Open actions menu"]').first().click({force: true});
  }

  async clickCaretButtonForName(name: string) {
    await this.page.locator('div').filter({hasText: name}).locator('#caret-button').click();
  }

  async clickCaretButton() {
    await this.page.locator('#caret-button').click();
  }

  async reloadTree(treeName: string) {
    // Waits until the tree item is visible
    await expect(this.page.getByLabel(treeName, {exact: true})).toBeVisible();
    await this.page.waitForTimeout(500);
    await this.clickActionsMenuForName(treeName);
    await this.clickReloadButton();

    const menuItem = this.page.locator('uui-menu-item[label="' + treeName + '"]');
    const isCaretButtonOpen = await menuItem.getAttribute('show-children');

    if (isCaretButtonOpen === null) {
      // We need to wait before clicking the caret button. Because the reload might not have happend yet. 
      // await this.page.waitForTimeout(500);
      await this.clickCaretButtonForName(treeName);
    }
  }

  async clickReloadButton() {
    await this.reloadBtn.click();
  }

  async clickSaveButton() {
    // This wait is necessary to avoid the save button is ignored
    await this.page.waitForTimeout(500);
    await expect(this.saveBtn).toBeVisible();
    await this.saveBtn.click();
  }

  async clickChooseButton() {
    await this.chooseBtn.click();
  }

  async clickFilterChooseButton() {
    await this.filterChooseBtn.click();
  }

  async clickRenameFolderThreeDotsButton() {
    await this.renameFolderThreeDotsBtn.click();
  }

  async clickRenameFolderButton() {
    await this.renameFolderBtn.click();
  }

  async clickUpdateFolderButton() {
    await this.updateFolderBtn.click();
  }

  async clickUpdateButton() {
    await this.updateBtn.click();
  }

  async clickSubmitButton() {
    await expect(this.submitBtn).toBeVisible();
    await this.submitBtn.click();
  }

  async clickConfirmToSubmitButton() {
    await this.confirmToSubmitBtn.click();
  }

  async clickChangeButton() {
    await this.changeBtn.click();
  }

  async clickExactLinkWithName(name: string) {
    await this.page.getByRole('link', {name: name, exact: true}).click();
  }

  async enterAliasName(aliasName: string) {
    // Unlocks alias
    await this.aliasLockBtn.click();
    await this.aliasNameTxt.clear();
    await this.aliasNameTxt.fill(aliasName);
  }

  async updateIcon(iconName: string) {
    await this.iconBtn.click({force: true});
    await this.searchForTypeToFilterValue(iconName);
    await this.clickLabelWithName(iconName, true);
    await this.clickSubmitButton();
  }

  async clickTextButtonWithName(name: string) {
    await expect(this.page.getByText(name, {exact: true})).toBeVisible();
    await this.page.getByText(name, {exact: true}).click();
  }

  async clickSelectPropertyEditorButton() {
    await expect(this.selectPropertyEditorBtn).toBeVisible();
    await this.selectPropertyEditorBtn.click();
  }

  async clickCreateFolderButton() {
    await this.createFolderBtn.click();
  }

  async enterAPropertyName(name: string) {
    await expect(this.propertyNameTxt).toBeVisible();
    await this.propertyNameTxt.fill(name);
  }

  async clickConfirmButton() {
    await this.confirmBtn.click();
  }

  async clickBreadcrumbButton() {
    await this.breadcrumbBtn.click();
  }

  async clickInsertButton() {
    await expect(this.insertBtn).toBeVisible();
    await this.insertBtn.click();
  }

  async clickDeleteButton() {
    await this.deleteBtn.click();
  }

  async clickConfirmToDeleteButton() {
    await this.confirmToDeleteBtn.click();
  }

  async clickDeleteFolderButton() {
    await this.deleteFolderBtn.click();
  }

  async clickConfirmCreateFolderButton() {
    await this.confirmCreateFolderBtn.click();
  }

  async clickDeleteThreeDotsButton() {
    await this.deleteThreeDotsBtn.click();
  }

  async clickRemoveExactButton(toForce: boolean = false) {
    await this.removeExactBtn.click({force: toForce});
  }

  async clickRemoveButtonForName(name: string) {
    await this.page.locator('[name="' + name + '"] [Label="Remove"]').click();
  }

  async clickTrashIconButtonForName(name: string) {
    await this.page.locator('[name="' + name + '"] [name="icon-trash"]').click();
  }

  async clickRemoveWithName(name: string, forceClick = false) {
    await this.page.getByLabel('Remove ' + name).click({force: forceClick});
  }

  async clickDisableButton() {
    await this.disableBtn.click();
  }

  async clickConfirmDisableButton() {
    await this.confirmDisableBtn.click();
  }

  async clickConfirmRemoveButton() {
    await this.confirmToRemoveBtn.click();
  }

  async clickEnableButton() {
    await this.enableBtn.click();
  }

  async clickConfirmEnableButton() {
    await this.confirmEnableBtn.click();
  }

  async insertDictionaryItem(dictionaryName: string) {
    await this.clickInsertButton();
    await expect(this.insertDictionaryItemBtn).toBeVisible();
    await this.insertDictionaryItemBtn.click();
    await expect(this.page.getByLabel(dictionaryName)).toBeVisible();
    await this.page.getByLabel(dictionaryName).click();
    await this.chooseBtn.click();
  }

  async addQueryBuilderWithOrderByStatement(propertyAlias: string, isAscending: boolean) {
    await expect(this.queryBuilderBtn).toBeVisible({timeout: 10000});
    await this.queryBuilderBtn.click({force: true});
    await expect(this.orderByPropertyAliasBtn).toBeVisible();
    await this.orderByPropertyAliasBtn.click({force: true});
    // Wait and choose property alias option 
    await this.waitAndSelectQueryBuilderDropDownList(propertyAlias);
    // Click to acending button if isAcsending is false
    if (!isAscending) {
      await this.ascendingBtn.click({force: true});
    }
  }

  async addQueryBuilderWithWhereStatement(propertyAlias: string, operator: string, constrainValue: string) {
    await expect(this.queryBuilderBtn).toBeVisible({timeout: 10000});
    await this.queryBuilderBtn.click({force: true});
    // Wait and choose property alias
    await expect(this.wherePropertyAliasBtn).toBeVisible();
    await this.wherePropertyAliasBtn.click({force: true});
    await this.waitAndSelectQueryBuilderDropDownList(propertyAlias);
    // Wait and choose operator
    await expect(this.whereOperatorBtn).toBeVisible();
    await this.whereOperatorBtn.click({force: true});
    await this.waitAndSelectQueryBuilderDropDownList(operator);
    // Wait and choose constrain value and press Enter
    await expect(this.whereConstrainValueTxt).toBeVisible();
    await this.whereConstrainValueTxt.clear();
    await this.whereConstrainValueTxt.fill(constrainValue);
    await this.whereConstrainValueTxt.press('Enter');
  }

  async waitAndSelectQueryBuilderDropDownList(option: string) {
    const ddlOption = this.page.locator('[open]').locator('uui-combobox-list-option').filter({hasText: option}).first();
    await expect(ddlOption).toBeVisible({timeout: 10000});
    await ddlOption.click();
  }

  async createFolder(folderName: string) {
    await this.clickCreateButton();
    await this.clickNewFolderThreeDotsButton();
    await this.enterFolderName(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async deletePropertyEditor(propertyEditorName: string) {
    // We need to hover over the property to be able to see the delete button
    await this.page.locator('uui-button').filter({hasText: propertyEditorName}).getByLabel('Editor settings').hover();
    await this.deleteLabelBtn.click({force: true});
  }

  async enterFolderName(folderName: string) {
    await this.folderNameTxt.clear();
    await this.folderNameTxt.fill(folderName);
  }

  async isTextWithExactNameVisible(name: string, isVisible = true) {
    return expect(this.page.getByText(name, {exact: true})).toBeVisible({visible: isVisible});
  }

  async isQueryBuilderCodeShown(code: string) {
    await expect(this.queryBuilderShowCode).toBeVisible();
    await this.queryBuilderShowCode.click();
    await expect(this.queryBuilderShowCode).toContainText(code, {timeout: 10000});
  }

  async deleteFolder() {
    await this.clickDeleteFolderButton();
    await this.clickConfirmToDeleteButton();
  }

  async clickDeleteExactLabel(forceClick = false) {
    await this.deleteExactLabelBtn.click({force: forceClick});
  }

  async clickDeleteExactButton(forceClick = false) {
    await this.deleteExactBtn.click({force: forceClick});
  }

  async isTreeItemVisible(name: string, isVisible = true) {
    await expect(this.page.locator('umb-tree-item').locator('[label="' + name + '"]')).toBeVisible({visible: isVisible});
  }

  async doesTreeItemHaveTheCorrectIcon(name: string, icon: string) {
    return await expect(this.page.locator('umb-tree-item').filter({hasText: name}).locator('umb-icon').locator('[name="' + icon + '"]')).toBeVisible();
  }

  async goToSection(sectionName: string) {
    for (let section in ConstantHelper.sections) {
      await expect(this.backOfficeHeader.getByRole('tab', {name: ConstantHelper.sections[section]})).toBeVisible({timeout: 30000});
    }
    await this.backOfficeHeader.getByRole('tab', {name: sectionName}).click();
  }

  async goToSettingsTreeItem(settingsTreeItemName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.page.getByLabel(settingsTreeItemName, {exact: true}).click({force: true});
  }

  async clickDataElement(elementName: string, options: any = null) {
    await this.page.click(`[data-element="${elementName}"]`, options);
  }

  async getDataElement(elementName: string) {
    return this.page.locator(`[data-element="${elementName}"]`);
  }

  async isButtonWithNameVisible(name: string) {
    await expect(this.page.getByRole('button', {name: name})).toBeVisible();
  }

  async clickLabelWithName(name: string, toForceClick = false) {
    await expect(this.page.getByLabel(name)).toBeVisible();
    await this.page.getByLabel(name).click({force: toForceClick});
  }

  async clickButtonWithName(name: string) {
    await this.page.getByRole('button', {name: name}).click({force: true});
  }

  async isSuccessNotificationVisible(isVisible: boolean = true) {
    return await expect(this.successNotification.first()).toBeVisible({visible: isVisible});
  }

  async doesSuccessNotificationsHaveCount(count: number) {
    return await expect(this.successNotification).toHaveCount(count);
  }

  async isErrorNotificationVisible(isVisible: boolean = true) {
    return await expect(this.errorNotification.first()).toBeVisible({visible: isVisible});
  }

  async clickCreateThreeDotsButton() {
    await this.createThreeDotsBtn.click();
  }

  async clickCreateButton() {
    await expect(this.createBtn).toBeVisible();
    await this.createBtn.click();
  }

  async clickAddButton() {
    await this.addBtn.click();
  };

  async clickNewFolderThreeDotsButton() {
    await this.newFolderThreeDotsBtn.click();
  }

  async clickEditorSettingsButton(index: number = 0) {
    return this.editorSettingsBtn.nth(index).click();
  }

  async enterDescription(description: string) {
    await this.enterDescriptionTxt.fill(description);
  }

  async doesDescriptionHaveValue(value: string, index: number = 0) {
    return await expect(this.descriptionBtn.nth(index)).toHaveValue(value);
  }

  async clickStructureTab() {
    await this.page.waitForTimeout(1000);
    await this.structureTabBtn.waitFor({state: 'visible'});
    await this.structureTabBtn.click();
  }

  async clickAllowAtRootButton() {
    await this.allowAtRootBtn.click();
  }

  async clickIAmDoneReorderingButton() {
    await this.iAmDoneReorderingBtn.click();
  }

  async clickReorderButton() {
    await this.reorderBtn.click();
  }

  async clickLabelAboveButton() {
    await this.labelAboveBtn.click();
  }

  async clickMandatorySlider() {
    await this.mandatorySlider.click();
  }

  async selectValidationOption(option: string) {
    await this.validation.selectOption(option);
  }

  async enterRegEx(regEx: string) {
    await this.regexTxt.fill(regEx);
  }

  async enterRegExMessage(regExMessage: string) {
    await this.regexMessageTxt.fill(regExMessage);
  }

  async clickCompositionsButton() {
    await this.compositionsBtn.click();
  }

  async clickAddTabButton() {
    await this.addTabBtn.click();
  }

  async enterTabName(tabName: string) {
    await this.unnamedTxt.fill(tabName);
  }

  async searchForTypeToFilterValue(searchValue: string) {
    await expect(this.typeToFilterSearchTxt).toBeVisible();
    await this.typeToFilterSearchTxt.fill(searchValue);
  }

  async addPropertyEditor(propertyEditorName: string, index: number = 0) {
    await expect(this.addPropertyBtn.nth(index)).toBeVisible();
    await this.addPropertyBtn.nth(index).click({force: true});
    await this.enterAPropertyName(propertyEditorName);
    await expect(this.propertyNameTxt).toHaveValue(propertyEditorName);
    await this.clickSelectPropertyEditorButton();
    await this.searchForTypeToFilterValue(propertyEditorName);
    await this.page.getByText(propertyEditorName, {exact: true}).click();
    await this.clickAddButton();
  }

  async updatePropertyEditor(propertyEditorName: string) {
    await this.clickEditorSettingsButton();
    await this.clickChangeButton();
    await this.searchForTypeToFilterValue(propertyEditorName);
    await this.page.getByText(propertyEditorName, {exact: true}).click();
    await this.enterAPropertyName(propertyEditorName);
    await this.clickUpdateButton();
  }

  async enterPropertyEditorDescription(description: string) {
    await this.propertySettingsModal.locator(this.enterDescriptionTxt).fill(description);
  }

  async clickAddGroupButton() {
    await this.addGroupBtn.click();
  }
  
  async clickChooseModalButton(){
    await this.chooseModalBtn.click();
  }

  async enterGroupName(groupName: string, index: number = 0) {
    const groupNameTxt = this.page.getByLabel('Group', {exact: true}).nth(index);
    await expect(groupNameTxt).toBeVisible();
    await groupNameTxt.clear();
    await groupNameTxt.fill(groupName);
  }

  async doesGroupHaveValue(value: string) {
    await expect(this.page.getByLabel('Group', {exact: true})).toBeVisible();
    return await expect(this.page.getByLabel('Group', {exact: true})).toHaveValue(value);
  }

  async rename(newName: string) {
    await this.clickRenameButton();
    await expect(this.newNameTxt).toBeVisible();
    await this.newNameTxt.click();
    await this.newNameTxt.clear();
    await this.newNameTxt.fill(newName);
    await this.renameModalBtn.click({force: true});
  }

  async isSuccessButtonWithTextVisible(text: string) {
    return await expect(this.successState.filter({hasText: text})).toBeVisible();
  }

  async dragAndDrop(dragFromSelector: Locator, dragToSelector: Locator, verticalOffset: number = 0, horizontalOffset: number = 0, steps: number = 5) {
    await expect(dragFromSelector).toBeVisible();
    await expect(dragToSelector).toBeVisible();
    const targetLocation = await dragToSelector.boundingBox();
    const elementCenterX = targetLocation!.x + targetLocation!.width / 2;
    const elementCenterY = targetLocation!.y + targetLocation!.height / 2;
    await dragFromSelector.hover();
    await this.page.mouse.down();
    await this.page.waitForTimeout(200)
    await this.page.mouse.move(elementCenterX + horizontalOffset, elementCenterY + verticalOffset, {steps: steps});
    await this.page.waitForTimeout(200)
    await this.page.mouse.up();
  }

  async clickCreateLink() {
    await this.createLink.click();
  }

  async insertSystemFieldValue(fieldValue: string) {
    await this.clickInsertButton();
    await expect(this.insertValueBtn).toBeVisible();
    await this.insertValueBtn.click();
    await expect(this.chooseFieldDropDown).toBeVisible();
    await this.chooseFieldDropDown.click();
    await this.systemFieldsOption.click();
    await this.chooseFieldValueDropDown.click();
    await this.page.getByText(fieldValue).click();
    await this.clickSubmitButton();
  }

  async insertPartialView(partialViewName: string) {
    await this.clickInsertButton();
    await expect(this.insertPartialViewBtn).toBeVisible();
    await this.insertPartialViewBtn.click();
    await expect(this.page.getByLabel(partialViewName)).toBeVisible();
    await this.page.getByLabel(partialViewName).click();
    await this.chooseBtn.click();
  }

  async deletePropertyEditorWithName(name: string) {
    // We need to hover over the Property Editor to make the delete button visible
    const propertyEditor = this.page.locator('umb-content-type-design-editor-property', {hasText: name});
    await propertyEditor.hover();
    await propertyEditor.getByLabel('Delete').click({force: true});
    await this.clickConfirmToDeleteButton();
  }

  async clickRenameButton() {
    await this.renameBtn.click();
  }

  async clickDeleteAndConfirmButton() {
    await this.clickDeleteExactLabel();
    await this.clickConfirmToDeleteButton();
  }

  async clickQueryBuilderButton() {
    await this.queryBuilderBtn.click();
  }

  async chooseRootContentInQueryBuilder(contentName: string) {
    await expect(this.chooseRootContentBtn).toBeVisible();
    await this.chooseRootContentBtn.click();
    await expect(this.page.getByText(contentName)).toBeVisible();
    await this.page.getByText(contentName).click();
    await this.chooseBtn.click();
  }

  async reorderTwoGroups() {
    const firstGroup = this.typeGroups.nth(0);
    const secondGroup = this.typeGroups.nth(1);
    const firstGroupValue = await firstGroup.getByLabel('Group', {exact: true}).inputValue();
    const secondGroupValue = await secondGroup.getByLabel('Group', {exact: true}).inputValue();
    const dragToLocator = firstGroup.locator('[name="icon-navigation"]').first();
    const dragFromLocator = secondGroup.locator('[name="icon-navigation"]').first();
    await this.dragAndDrop(dragFromLocator, dragToLocator, 0, 0, 10);

    return {firstGroupValue, secondGroupValue};
  }

  async clickAllowedChildNodesButton() {
    await this.allowedChildNodesModal.locator(this.chooseBtn).click();
  }

  async clickConfigureAsACollectionButton() {
    await this.configureAsACollectionBtn.click();
  }

  async doesReturnedItemsHaveCount(itemCount: number) {
    await expect(this.returnedItemsCount).toContainText(itemCount.toString() + ' items returned');
  }

  async doesQueryResultHaveContentName(contentName: string) {
    await expect(this.queryBuilderShowCode).toContainText(contentName);
  }

  async deleteGroup(groupName: string, forceClick: boolean = false) {
    await this.page.waitForTimeout(1000);
    const groups = this.page.locator('umb-content-type-design-editor-group').all();
    for (const group of await groups) {
      if (await group.getByLabel('Group', {exact: true}).inputValue() === groupName) {
        await group.locator('[slot="header-actions"]').getByLabel('Delete').click({force: forceClick});
        return;
      }
    }
  }

  async clickRemoveTabWithName(name: string) {
    await this.page.locator('[label="' + name + '"] [label="Remove"]').click();
  }

  async clickLeftArrowButton() {
    await this.leftArrowBtn.click();
  }

  async clickToUploadButton() {
    await this.clickToUploadBtn.click();
  }

  async changeFileTypeWithFileChooser(filePath: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clickToUploadButton();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  getTabLocatorWithName(name: string) {
    return this.page.getByRole('tab', {name: name});
  }

  getTextLocatorWithName(name: string) {
    return this.page.getByText(name, {exact: true});
  }

  async isFailedStateButtonVisible() {
    await expect(this.failedStateButton).toBeVisible();
  }
}