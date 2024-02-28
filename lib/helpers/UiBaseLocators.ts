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
    this.dictionaryInsertItemBtn = page.getByRole('button', { name: 'Dictionary item' });
    this.caretDictionaryBtn = page.locator('umb-tree-picker-modal').locator('#caret-button');
    this.insertValueBtn = page.locator('uui-button').filter({ hasText: 'Insert' });
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

  async clickSubmitButton() {
    await this.submitBtn.click({force: true});
  }
  
  async clickTextButtonWithName(name: string) {
    await this.page.getByText(name, { exact: true }).click();
  }

  async clickCreateFolderButton() {
    await this.createFolderBtn.click();
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

  async dragAndDrop(dragFromSelector: Locator, dragToSelector: Locator, verticalOffset: number, horizontalOffset: number, steps?){

    const targetLocation = await dragToSelector.boundingBox();

    const elementCenterX = targetLocation!.x + targetLocation!.width / 2;
    const elementCenterY = targetLocation!.y + targetLocation!.height / 2;

    await dragFromSelector.hover();

    await this.page.mouse.down();
    await this.page.mouse.move(elementCenterX + horizontalOffset, elementCenterY + verticalOffset,{steps: steps});
    await this.page.mouse.up();
  }
}