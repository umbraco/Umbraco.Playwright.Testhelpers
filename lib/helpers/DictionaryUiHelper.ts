import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class DictionaryUiHelper extends UiBaseLocators {
  private readonly createDictionaryItemBtn: Locator;
  private readonly dictionaryNameTxt: Locator;
  private readonly searchTxt: Locator;
  private readonly exportBtn: Locator;
  private readonly includeDescendantsCheckbox: Locator;
  private readonly importBtn: Locator;
  private readonly importFileTxt: Locator;
  private readonly emptySearchResultMessage: Locator;
  private readonly dictionaryList: Locator;
  private readonly dictionaryListRows: Locator;
  private readonly dictionaryTree: Locator;
  private readonly dictionaryCollection: Locator;
  private readonly exportModalBtn: Locator;
  private readonly importModalBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.createDictionaryItemBtn = page.getByLabel('Create dictionary item', {exact: true});
    this.dictionaryNameTxt = page.locator('umb-workspace-header-name-editable').locator('input');
    this.exportBtn = page.getByRole('button', {name: /^Export(\.\.\.)?$/});
    this.importBtn = page.getByRole('button', {name: /^Import(\.\.\.)?$/});
    this.searchTxt = page.getByLabel('Type to filter...');
    this.dictionaryList = page.locator('umb-dictionary-table-collection-view');
    this.dictionaryListRows = this.dictionaryList.locator('uui-table-row');
    this.exportModalBtn = page.locator('umb-export-dictionary-modal').getByLabel('Export');
    this.includeDescendantsCheckbox = page.locator('umb-export-dictionary-modal #includeDescendants');
    this.importModalBtn = page.locator('uui-button').filter({hasText: 'Import'}).getByLabel('Import');
    this.importFileTxt = page.locator('umb-import-dictionary-modal #input');
    this.emptySearchResultMessage = page.locator('umb-dashboard-translation-dictionary umb-empty-state');
    this.dictionaryTree = page.locator('umb-tree[alias="Umb.Tree.Dictionary"]');
    this.dictionaryCollection = page.locator('umb-dictionary-collection');
  }

  async clickCreateDictionaryItemButton() {
    await expect(this.createDictionaryItemBtn).toBeVisible();
    await this.createDictionaryItemBtn.click();
  }

  async enterDictionaryName(name: string) {
    await expect(this.dictionaryNameTxt).toBeVisible();
    await this.dictionaryNameTxt.clear();
    await this.dictionaryNameTxt.fill(name);
  }

  async clickActionsMenuForDictionary(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async enterSearchKeywordAndPressEnter(keyword: string) {
    await this.searchTxt.clear();
    await this.searchTxt.fill(keyword);
    await this.page.keyboard.press('Enter');
  }

  async clickExportButton() {
    await this.exportBtn.click();
  }

  async clickImportButton() {
    await this.importBtn.click();
  }

  async deleteDictionary() {
    await this.clickDeleteButton();
    await this.confirmToDeleteBtn.click();
  }

  async doesDictionaryListHaveText(text: string) {
    await expect(this.dictionaryList).toBeVisible();
    const allRows = await this.dictionaryListRows.all();
    for (let currentRow of allRows) {
      const currentText = await currentRow.innerText();
      if (currentText.includes(text)) {
        return true;
      }
    }
    return false;
  }

  // This function will export dictionary and return the file name
  async exportDictionary(includesDescendants: boolean) {
    if (includesDescendants) {
      await this.includeDescendantsCheckbox.click();
    }
    const [downloadPromise] = await Promise.all([
      this.page.waitForEvent('download'),
      await this.exportModalBtn.click()
    ]);
    return downloadPromise.suggestedFilename();
  }

  async importDictionary(filePath: string) {
    await this.importFileTxt.setInputFiles(filePath);
    await expect(this.importModalBtn).toBeVisible();
    await this.importModalBtn.click();
  }

  async isSearchResultMessageDisplayEmpty(message: string) {
    return await expect(this.emptySearchResultMessage).toHaveText(message);
  }

  async isDictionaryTreeItemVisible(dictionaryName: string, isVisible: boolean = true) {
    return await expect(this.dictionaryTree.getByText(dictionaryName, {exact: true})).toBeVisible({visible: isVisible});
  }

  async doesDictionaryCollectionContainText(text: string) {
    return await expect(this.dictionaryCollection).toContainText(text);
  }
}