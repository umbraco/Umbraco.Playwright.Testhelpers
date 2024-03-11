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
  public readonly deleteFolderBtn: Locator;
  public readonly deleteExactLabelBtn: Locator;
  public readonly confirmCreateFolderBtn: Locator;
  public readonly dictionaryInsertItemBtn: Locator;
  public readonly caretDictionaryBtn: Locator;
  public readonly insertValueBtn: Locator;
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
  public readonly addBtn: Locator;
  private readonly renameFolderThreeDotsBtn: Locator;
  private readonly updateFolderBtn: Locator;
  private readonly filterChooseBtn: Locator;
  private readonly updateBtn: Locator;
  private readonly changeBtn: Locator;
  private readonly enterANameTxt: Locator;
  private readonly selectPropertyEditorBtn: Locator;
  private readonly addGroupBtn: Locator;
  private readonly iAmDoneReorderingBtn: Locator;
  private readonly reorderBtn: Locator;
  private readonly compositionsBtn: Locator;
  private readonly addTabBtn: Locator;
  private readonly descriptionBtn: Locator;
  private readonly enterDescriptionTxt: Locator;
  private readonly mandatorySlider: Locator;
  private readonly validation: Locator;
  private readonly regexTxt: Locator;
  private readonly regexMessageTxt: Locator;
  private readonly structureTabBtn: Locator;
  private readonly allowAsRootBtn: Locator;
  private readonly addPropertyBtn: Locator;
  private readonly typeToFilterIconsTxt: Locator;
  private readonly editorSettingsBtn: Locator;
  private readonly labelOnTopBtn: Locator;
  private readonly unnamedTxt: Locator;
  private readonly deleteThreeDotsBtn: Locator;
  private readonly removeExactBtn: Locator;
  private readonly confirmBtn: Locator;
  private readonly disableBtn: Locator;
  private readonly confirmDisableBtn: Locator; 
  private readonly enableBtn: Locator;
  private readonly confirmEnableBtn: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.saveBtn = page.getByLabel('Save', {exact: true});
    this.submitBtn = page.getByLabel('Submit');
    this.deleteExactLabelBtn = page.getByLabel('Delete', {exact: true});
    this.deleteFolderBtn = page.getByLabel('Delete');
    this.deleteBtn = page.getByRole('button', {name: 'Delete'});
    this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
    this.confirmCreateFolderBtn = page.locator('#confirm').getByLabel('Create Folder');
    this.breadcrumbBtn = page.getByLabel('Breadcrumb');
    this.createFolderBtn = page.getByLabel('Create folder');
    this.dictionaryInsertItemBtn = page.getByRole('button', {name: 'Dictionary item'});
    this.caretDictionaryBtn = page.locator('umb-tree-picker-modal').locator('#caret-button');
    this.insertValueBtn = page.locator('uui-button').filter({hasText: 'Insert'});
    this.modalCaretBtn = page.locator('umb-tree-picker-modal').locator('#caret-button');
    this.queryBuilderBtn = page.locator('#query-builder-button').getByLabel('Query builder');
    this.queryBuilderOrderedBy = page.locator('#property-alias-dropdown').getByLabel('Property alias');
    this.queryBuilderCreateDate = page.locator('#property-alias-dropdown').getByText('CreateDate').locator("..");
    this.folderNameTxt = page.getByRole('textbox', {name: 'Enter folder name...'});
    this.textAreaInputArea = page.locator('textarea.inputarea');
    this.wherePropertyAliasBtn = page.locator('umb-query-builder-filter').filter({hasText: 'where'}).getByLabel('Property alias');
    this.whereOperatorBtn = page.locator('umb-query-builder-filter').filter({hasText: 'where'}).getByLabel('Choose operator');
    this.whereConstrainValueTxt = page.locator('umb-query-builder-filter').filter({hasText: 'where'}).getByLabel('constrain value');
    this.orderByPropertyAliasBtn = page.locator('#sort-dropdown').getByLabel('Property alias');
    this.ascendingBtn = page.locator('uui-button').filter({hasText: 'ascending'}).locator('#button');
    this.queryBuilderShowCode = page.locator('umb-code-block');
    this.createThreeDotsBtn = page.getByLabel('Create...', {exact: true});
    this.chooseBtn = page.getByLabel('Choose', {exact: true});
    this.newFolderThreeDotsBtn = page.getByLabel('New Folder...');
    this.renameThreeDotsBtn = page.getByLabel('Rename...', {exact: true});
    this.newNameTxt = page.getByRole('textbox', {name: 'Enter new name...'});
    this.renameModalBtn = page.locator('umb-rename-modal').getByLabel('Rename');
    this.createBtn = page.getByLabel('Create', {exact: true});
    this.successState = page.locator('[state="success"]');
    this.addBtn = page.getByLabel('Add', {exact: true});
    this.renameFolderThreeDotsBtn = page.getByLabel('Rename Folder...');
    this.updateFolderBtn = page.getByLabel('Update Folder');
    this.filterChooseBtn = page.locator('button').filter({hasText: 'Choose'});
    this.updateBtn = page.getByLabel('Update');
    this.changeBtn = page.getByLabel('Change');
    this.enterANameTxt = page.getByRole('textbox', {name: 'Enter a name...'});
    this.selectPropertyEditorBtn = page.getByLabel('Select Property Editor');
    this.addGroupBtn = page.getByLabel('Add group', {exact: true});
    this.iAmDoneReorderingBtn = page.getByLabel('I am done reordering');
    this.reorderBtn = page.getByLabel('Reorder');
    this.compositionsBtn = page.getByLabel('Compositions');
    this.addTabBtn = page.getByLabel('Add tab');
    this.descriptionBtn = page.getByLabel('Description');
    this.enterDescriptionTxt = page.getByRole('textbox', {name: 'Enter description...'});
    this.mandatorySlider = page.locator('#mandatory #slider');
    this.validation = page.locator('#native');
    this.regexTxt = page.locator('input[name="pattern"]');
    this.regexMessageTxt = page.locator('textarea[name="pattern-message"]');
    this.structureTabBtn = page.getByRole('tab', {name: 'Structure'});
    this.allowAsRootBtn = page.locator('label').filter({hasText: 'Allow as root'});
    this.addPropertyBtn = page.getByLabel('Add property', {exact: true});
    this.typeToFilterIconsTxt = page.getByLabel('Type to filter icons');
    this.editorSettingsBtn = page.getByLabel('Editor settings');
    this.labelOnTopBtn = page.getByRole('button', {name: 'Label on top'});
    this.unnamedTxt = page.getByRole('textbox', {name: 'Unnamed'});
    this.deleteThreeDotsBtn = page.locator('umb-entity-action').getByLabel('Delete...');
    this.removeExactBtn = page.getByLabel('Remove', {exact: true});
    this.confirmBtn = page.getByLabel('Confirm');
    this.disableBtn = page.getByLabel('Disable');
    this.confirmDisableBtn = page.locator('#confirm').getByLabel('Disable');
    this.enableBtn = page.getByLabel('Enable');
    this.confirmEnableBtn = page.locator('#confirm').getByLabel('Enable');
  }

  async clickActionsMenuForName(name: string) {
    await this.page.locator('[label="' + name + '"] >> [label="Open actions menu"]').click({force: true});
  }

  async clickCaretButtonForName(name: string) {
    await this.page.locator('div').filter({hasText: name}).locator('#caret-button').click();
  }

  async clickCaretButton() {
    await this.page.locator('#caret-button').click();
  }

  async clickSaveButton() {
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

  async clickUpdateFolderButton() {
    await this.updateFolderBtn.click();
  }

  async clickUpdateButton() {
    await this.updateBtn.click();
  }

  async clickSubmitButton() {
    await this.submitBtn.click({force: true});
  }

  async clickChangeButton() {
    await this.changeBtn.click();
  }

  async clickTextButtonWithName(name: string) {
    await this.page.getByText(name, {exact: true}).click();
  }

  async clickSelectPropertyEditorButton() {
    await this.selectPropertyEditorBtn.click();
  }

  async clickCreateFolderButton() {
    await this.createFolderBtn.click();
  }

  async enterAName(name: string) {
    await this.enterANameTxt.fill(name);
  }
  
  async clickConfirmButton() {
    await this.confirmBtn.click();
  }

  async clickBreadcrumbButton() {
    await this.breadcrumbBtn.click();
  }

  async clickInsertButton() {
    await this.insertValueBtn.click();
  }

  async clickDictionaryInsertItemButton() {
    await this.dictionaryInsertItemBtn.click({force: true});
  }

  async clickCaretDictionaryButton() {
    await this.caretDictionaryBtn.click();
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
  
  async clickRemoveExactButton() {
    await this.removeExactBtn.click();
  }
  
  async clickRemoveWithName(name: string) {
    await this.page.getByLabel('Remove ' + name).click();
  }
  
  async clickDisableButton() {
    await this.disableBtn.click();
  }
  
  async clickConfirmDisableButton() {
    await this.confirmDisableBtn.click();
  }
  
  async clickEnableButton() {
    await this.enableBtn.click();
  }
  
  async clickConfirmEnableButton() {
    await this.confirmEnableBtn.click();
  }
  
  async insertDictionaryByName(dictionaryName: string) {
    await this.insertValueBtn.click();
    await this.clickDictionaryInsertItemButton();
    // This wait is necessary. I tried using waitFor, with timeout. But it did not work.
    await this.page.waitForTimeout(1000);
    await this.page.getByLabel(dictionaryName).click();
    await this.chooseBtn.click();
  }

  async addQueryBuilderWithOrderByStatement(propertyAlias: string, isAscending: boolean) {
    await this.queryBuilderBtn.click({force: true});
    // Wait and click to orderBy dropdownbox
    await this.orderByPropertyAliasBtn.waitFor({state: 'visible'})
    await this.orderByPropertyAliasBtn.click({force: true});
    // Wait and choose property alias option 
    await this.waitAndSelectQueryBuilderDropDownList(propertyAlias);
    // Click to acending button if isAcsending is false
    if (!isAscending) {
      await this.ascendingBtn.click({force: true});
    }
  }

  async addQueryBuilderWithWhereStatement(propertyAlias: string, operator: string, constrainValue: string) {
    await this.queryBuilderBtn.waitFor({state: 'visible'});
    await this.queryBuilderBtn.click({force: true});
    // Wait and choose property alias
    await this.wherePropertyAliasBtn.waitFor({state: 'visible'});
    await this.wherePropertyAliasBtn.click({force: true});
    await this.waitAndSelectQueryBuilderDropDownList(propertyAlias);
    // Wait and choose operator
    await this.whereOperatorBtn.waitFor({state: 'visible'})
    await this.whereOperatorBtn.click({force: true});
    await this.waitAndSelectQueryBuilderDropDownList(operator);
    // Wait and choose constrain value and press Enter
    await this.whereConstrainValueTxt.waitFor({state: 'visible'});
    await this.whereConstrainValueTxt.clear();
    await this.whereConstrainValueTxt.fill(constrainValue);
    await this.whereConstrainValueTxt.press('Enter');
  }

  async waitAndSelectQueryBuilderDropDownList(option: string) {
    const ddlOption = this.page.locator('[open]').locator('uui-combobox-list-option').filter({hasText: option}).first();
    await ddlOption.waitFor({state: 'visible'});
    await ddlOption.click({force: true});
  }

  async createFolder(folderName: string) {
    await this.clickCreateThreeDotsButton();
    await this.clickNewFolderThreeDotsButton();
    await this.folderNameTxt.waitFor({state: 'visible'});
    await this.folderNameTxt.fill(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async enterFolderName(folderName: string) {
    await this.folderNameTxt.clear();
    await this.folderNameTxt.fill(folderName);
  }

  isTextWithExactNameVisible(name: string, isVisible = true) {
    return expect(this.page.getByText(name, {exact: true})).toBeVisible({visible: isVisible});
  }
  
  async isQueryBuilderCodeShown(code: string) {
    await this.queryBuilderShowCode.click();
    await expect(this.queryBuilderShowCode).toContainText(code);
  }

  async deleteFolder() {
    await this.clickDeleteFolderButton();
    await this.clickConfirmToDeleteButton();
  }

  async clickDeleteExactLabel() {
    await this.deleteExactLabelBtn.click();
  }

  async isTreeItemVisible(name: string) {
    await expect(this.page.locator('umb-tree-item').locator('[label="' + name + '"] ')).toBeVisible();
  }

  async isUniqueTreeItemVisible(name: string) {
    return await expect(this.page.locator('umb-unique-tree-item').locator('[label="' + name + '"] ')).toBeVisible();
  }

  async goToSection(sectionName: string) {
    for (let section in ConstantHelper.sections) {
      await expect(this.page.getByRole('tab', {name: section})).toBeVisible({timeout: 30000});
    }
    await this.page.getByRole('tab', {name: sectionName}).click();
  }

  async goToSettingsTreeItem(settingsTreeItemName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.page.getByLabel(settingsTreeItemName).click();
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

  async clickLabelWithName(name: string) {
    await this.page.getByLabel(name).click();
  }

  async clickButtonWithName(name: string) {
    await this.page.getByRole('button', {name: name}).click({force: true});
  }

  async isSuccessNotificationVisible() {
    return await expect(this.page.locator('uui-toast-notification >> [color="positive"]')).toBeVisible();
  }

  async isErrorNotificationVisible() {
    return await expect(this.page.locator('uui-toast-notification >> [color="danger"]')).toBeVisible();
  }

  async clickCreateThreeDotsButton() {
    await this.createThreeDotsBtn.click();
  }

  async clickCreateButton() {
    await this.createBtn.click();
  }

  async clickAddButton() {
    await this.addBtn.click();
  };

  async clickNewFolderThreeDotsButton() {
    await this.newFolderThreeDotsBtn.click();
  }

  clickEditorSettingsButton() {
    return this.editorSettingsBtn.click();
  }

  async enterDescription(description: string) {
    await this.enterDescriptionTxt.fill(description);
  }

  async doesDescriptionHaveValue(value: string) {
    return await expect(this.descriptionBtn).toHaveValue(value);
  }

  async clickStructureTab() {
    await this.page.waitForTimeout(200);
    await this.structureTabBtn.click({force: true});
  }

  async clickAllowAsRootButton() {
    await this.allowAsRootBtn.click();
  }

  async clickIAmDoneReorderingButton() {
    await this.iAmDoneReorderingBtn.click();
  }

  async clickReorderButton() {
    await this.reorderBtn.click();
  }

  async clickLabelOnTopButton() {
    await this.labelOnTopBtn.click();
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

  async searchForPropertyEditor(propertyEditorName: string) {
    await this.typeToFilterIconsTxt.fill(propertyEditorName);
  }

  async addPropertyEditor(propertyEditorName: string, index: number = 0) {
    await this.addPropertyBtn.nth(index).click({force: true});
    await this.clickSelectPropertyEditorButton();
    await this.searchForPropertyEditor(propertyEditorName);
    await this.page.getByText(propertyEditorName, {exact: true}).click();
    await this.page.waitForTimeout(200);
    await this.enterAName(propertyEditorName);
    await this.clickAddButton();
  }

  async updatePropertyEditor(propertyEditorName: string) {
    await this.clickEditorSettingsButton();
    await this.clickChangeButton();
    await this.searchForPropertyEditor(propertyEditorName);
    await this.page.getByText(propertyEditorName, {exact: true}).click();
    await this.page.waitForTimeout(200);
    await this.enterAName(propertyEditorName);
    await this.clickUpdateButton();
  }

  async clickAddGroupButton() {
    await this.addGroupBtn.click();
  }

  async enterGroupName(groupName: string, index: number = 0) {
    await this.page.waitForTimeout(200);
    await this.page.getByLabel('Group', {exact: true}).nth(index).fill(groupName);
  }

  async doesGroupHaveValue(value: string) {
    return await expect(this.page.getByLabel('Group', {exact: true})).toHaveValue(value);
  }

  async rename(newName: string) {
    await this.renameThreeDotsBtn.click();
    await this.newNameTxt.click();
    await this.newNameTxt.clear();
    await this.newNameTxt.fill(newName);
    await this.renameModalBtn.click({force: true});
  }

  async isSuccessButtonWithTextVisible(text: string) {
    return await expect(this.successState.filter({hasText: text})).toBeVisible({timeout: 10000});
  }

  async dragAndDrop(dragFromSelector: Locator, dragToSelector: Locator, verticalOffset: number, horizontalOffset: number, steps?) {
    const targetLocation = await dragToSelector.boundingBox();
    const elementCenterX = targetLocation!.x + targetLocation!.width / 2;
    const elementCenterY = targetLocation!.y + targetLocation!.height / 2;
    await dragFromSelector.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(elementCenterX + horizontalOffset, elementCenterY + verticalOffset, {steps: steps});
    await this.page.mouse.up();
  }
}