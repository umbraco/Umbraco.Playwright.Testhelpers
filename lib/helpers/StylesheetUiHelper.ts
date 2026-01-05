import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class StylesheetUiHelper extends UiBaseLocators{
  private readonly newStylesheetBtn: Locator;
  private readonly newStylesheetFolderBtn: Locator;
  private readonly stylesheetNameTxt: Locator;
  private readonly stylesheetTree: Locator;
  private readonly stylesheetCreateModal: Locator;

  constructor(page: Page) {
    super(page);
    this.stylesheetCreateModal = page.locator('umb-entity-create-option-action-list-modal');
    this.newStylesheetBtn = this.stylesheetCreateModal.locator('umb-ref-item', {hasText: 'Stylesheet'});
    this.newStylesheetFolderBtn = this.stylesheetCreateModal.locator('umb-ref-item', {hasText: 'Folder'});
    this.stylesheetNameTxt = page.locator('umb-stylesheet-workspace-editor').locator('#nameInput #input');
    this.stylesheetTree = page.locator('umb-tree[alias="Umb.Tree.Stylesheet"]');
  }

  async clickActionsMenuForStylesheet(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async createStylesheetFolder(folderName: string) {
    await this.clickCreateActionMenuOption();
    await this.clickNewStylesheetFolderButton();
    await this.enterFolderName(folderName);
    await this.clickConfirmCreateFolderButton();
  }
  
  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForStylesheet('Stylesheets');
  }

  async clickRootFolderCaretButton() {
    await this.openCaretButtonForName('Stylesheets');
  }

  async clickNewStylesheetButton() {
    await this.click(this.newStylesheetBtn);
  }

  async clickNewStylesheetFolderButton() {
    await this.click(this.newStylesheetFolderBtn);
  }

  async clickSaveButtonAndWaitForStylesheetToBeCreated() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/stylesheet', this.clickSaveButton(), 201);
  }

  async clickSaveButtonAndWaitForStylesheetToBeUpdated() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/stylesheet', this.clickSaveButton(), 200);
  }
  
  async enterStylesheetName(stylesheetName: string) {
    await this.enterText(this.stylesheetNameTxt, stylesheetName);
  }
  
  async enterStylesheetContent(stylesheetContent: string) {
    await this.enterMonacoEditorValue(stylesheetContent);
  }

  async openStylesheetByNameAtRoot(stylesheetName: string) {
    await this.reloadStylesheetTree();
    await this.click(this.page.getByLabel(stylesheetName, {exact: true}));
  }

  async reloadStylesheetTree() {
    await this.reloadTree('Stylesheets');
  }

  async isStylesheetRootTreeItemVisible(stylesheetName: string, isVisible: boolean = true, toReload: boolean = true) {
    if (toReload) {
      await this.reloadStylesheetTree();
    }
    return await this.isVisible(this.stylesheetTree.getByText(stylesheetName, {exact: true}), isVisible);
  }

  async goToStylesheet(stylesheetName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadStylesheetTree();
    await this.click(this.page.getByLabel(stylesheetName, {exact: true}));
  }

  async clickConfirmToDeleteButtonAndWaitForStylesheetToBeDeleted() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/stylesheet/', this.clickConfirmToDeleteButton(), 200);
  }

  async clickDeleteAndConfirmButtonAndWaitForStylesheetToBeDeleted() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/stylesheet/', this.clickDeleteAndConfirmButton(), 200);
  }

  async createStylesheetFolderAndWaitForStylesheetToBeCreated(folderName: string) {
    await this.clickCreateActionMenuOption();
    await this.clickNewStylesheetFolderButton();
    await this.enterFolderName(folderName);
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/stylesheet/folder', this.clickConfirmCreateFolderButton(), 201);
  }

  async renameAndWaitForStylesheetToBeRenamed(newName: string) {
    await this.clickRenameActionMenuOption();
    await this.waitForVisible(this.newNameTxt);
    await this.enterText(this.newNameTxt, newName);
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/stylesheet/', this.click(this.renameModalBtn), 200);
  }
}