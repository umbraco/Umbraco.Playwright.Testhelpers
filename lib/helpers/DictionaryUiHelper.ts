import { Page, Locator, expect } from "@playwright/test";

export class DictionaryUiHelper {
  private readonly page: Page;
  private readonly createDictionaryItemBtn: Locator;
  private readonly dictionaryNameTxt: Locator;
  private readonly saveBtn: Locator;
  private readonly createMenu: Locator;
  private readonly exportMenu: Locator;
  private readonly importMenu: Locator;
  private readonly deleteMenu: Locator;
  private readonly searchTxt: Locator;
  private readonly confirmTodeleteMenu: Locator;
  private readonly exportBtn: Locator;
  private readonly includeDecendantsCheckbox: Locator;
  private readonly importBtn: Locator;
  private readonly importFileTxt: Locator;
  private readonly emptySearchResultMessage: Locator;
  private readonly dictionaryListRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createDictionaryItemBtn = page.getByLabel("Create dictionary item", {
      exact: true,
    });
    this.dictionaryNameTxt = page.getByLabel("Dictionary Name", {
      exact: true,
    });
    this.saveBtn = page.getByLabel("Save", { exact: true });
    this.createMenu = page.locator("umb-entity-action").getByLabel("Create");
    this.exportMenu = page.locator("umb-entity-action").getByLabel("Export");
    this.importMenu = page.locator("umb-entity-action").getByLabel("Import");
    this.deleteMenu = page.locator("umb-entity-action").getByLabel("Delete");
    this.searchTxt = page.getByLabel("Type to filter...");
    this.confirmTodeleteMenu = page.locator("#confirm").getByLabel("Delete");
    this.dictionaryListRows = page.locator("umb-dashboard-translation-dictionary uui-table-row");
    this.exportBtn = page.locator("umb-export-dictionary-modal").getByLabel("Export");
    this.includeDecendantsCheckbox = page.locator("umb-export-dictionary-modal #includeDescendants");
    this.importBtn = page.locator("umb-export-dictionary-modal").getByLabel("Import");
    this.importFileTxt = page.locator("umb-import-dictionary-modal #input");
    this.emptySearchResultMessage = page.locator("umb-dashboard-translation-dictionary umb-empty-state");
  }

  async clickCreateDictionaryItemButton() {
    await this.createDictionaryItemBtn.click();
  }

  async enterDictionaryName(name: string) {
    await this.dictionaryNameTxt.clear();
    await this.dictionaryNameTxt.fill(name);
  }

  async clickSaveButton() {
    await this.saveBtn.click();
  }

  async openActionsMenuForName(name: string) {
    await this.page.locator('[label="' + name + '"] >> [label="Open actions menu"]').click({force: true});  
  }

  async clickCaretButtonForName(name: string) {
    await this.page.locator('umb-tree-item >> [label="' + name + '"]').locator("#caret-button").click();
  }

  async enterSearchKeywordAndPressEnter(keyword: string) {
    await this.searchTxt.clear();
    await this.searchTxt.fill(keyword);
    await this.page.keyboard.press("Enter");
  }

  async clickCreateMenu() {
    await this.createMenu.click();
  }

  async clickExportMenu() {
    await this.exportMenu.click();
  }

  async clickImportMenu() {
    await this.importMenu.click();
  }

  async clickDeleteMenu() {
    await this.deleteMenu.click();
  }

  async deleteDictionary() {
    await this.clickDeleteMenu();
    await this.confirmTodeleteMenu.click();
  }

  async isDictionaryListHasText(text: string) {
    const allRows = await this.dictionaryListRows.all();
    for (let currentRow of allRows) {
      const currentText = await currentRow.innerText();
      if (currentText.includes(text)) {
        return true;
      }
    }
    return false;
  }

  async exportDictionary(isIncludeDesendants: boolean) {
    if (isIncludeDesendants) {
      await this.includeDecendantsCheckbox.click();
    }
    await this.exportBtn.click();
  }

  async importDictionary(filePath: string) {
    await this.importFileTxt.setInputFiles(filePath);
    await this.importBtn.click();
  }

  async isEmptySearchResultMessageDisplay(message: string) {
    return await expect(this.emptySearchResultMessage).toHaveText(message);
  }
}
