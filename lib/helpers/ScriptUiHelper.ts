import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ScriptUiHelper extends UiBaseLocators{
  private readonly newJavascriptFileBtn: Locator;
  private readonly scriptTree: Locator;
  private readonly newFolderThreeDots: Locator;
  private readonly scriptCreateModal: Locator;

  constructor(page: Page) {
    super(page);
    this.scriptCreateModal = page.locator('umb-script-create-options-modal');
    this.newJavascriptFileBtn = this.scriptCreateModal.locator('umb-ref-item', {hasText: 'JavaScript file'});
    this.newFolderThreeDots = this.scriptCreateModal.locator('umb-ref-item', {hasText: 'Folder'});
    this.scriptTree = page.locator('umb-tree[alias="Umb.Tree.Script"]');
  }

  async clickActionsMenuForScript(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async createScriptFolder(folderName: string) {
    await this.clickCreateOptionsActionMenuOption();
    await expect(this.newFolderThreeDots).toBeVisible();
    await this.newFolderThreeDots.click();
    await this.enterFolderName(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForScript('Scripts');
  }

  async clickRootFolderCaretButton() {
    await this.openCaretButtonForName('Scripts');
  }

  async clickNewJavascriptFileButton() {
    await expect(this.newJavascriptFileBtn).toBeVisible();
    await this.newJavascriptFileBtn.click();
  }
  
  async clickSaveButtonAndWaitForScriptToBeCreated() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/script', this.clickSaveButton(), 201);
  }

  async clickSaveButtonAndWaitForScriptToBeUpdated() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/script', this.clickSaveButton(), 200);
  }
  
  // Will only work for root scripts
  async goToScript(scriptName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadScriptTree();
    await this.page.getByLabel(scriptName, {exact: true}).click();
  }

  async enterScriptName(scriptContent: string) {
    await expect(this.enterAName).toBeVisible();
    await this.enterAName.fill(scriptContent);
  }

  async enterScriptContent(scriptContent: string) {
    await this.enterMonacoEditorValue(scriptContent);
  }

  async openScriptAtRoot(scriptName: string) {
    await this.reloadScriptTree();
    await this.page.getByLabel(scriptName, {exact: true}).click();
  }

  async reloadScriptTree() {
    await this.reloadTree('Scripts');
  }

  async isScriptRootTreeItemVisible(scriptName: string, isVisible: boolean = true, toReload: boolean = true){
    if (toReload) {
      await this.reloadScriptTree();
    }
    return expect(this.scriptTree.getByText(scriptName, {exact: true})).toBeVisible({visible: isVisible});
  }

  async clickConfirmToDeleteButtonAndWaitForScriptToBeDeleted() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/script/', this.clickConfirmToDeleteButton(), 200);
  }

  async clickDeleteAndConfirmButtonAndWaitForScriptToBeDeleted() {
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/script/', this.clickDeleteAndConfirmButton(), 200);
  }

  async createScriptFolderAndWaitForScriptToBeCreated(folderName: string) {
    await this.clickCreateOptionsActionMenuOption();
    await expect(this.newFolderThreeDots).toBeVisible();
    await this.newFolderThreeDots.click();
    await this.enterFolderName(folderName);
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/script/folder', this.clickConfirmCreateFolderButton(), 201);
  }

  async renameAndWaitForScriptToBeRenamed(newName: string) {
    await this.clickRenameActionMenuOption();
    await expect(this.newNameTxt).toBeVisible();
    await this.newNameTxt.click();
    await this.newNameTxt.clear();
    await this.newNameTxt.fill(newName);
    return await this.waitForResponseAfterExecutingPromise('/umbraco/management/api/v1/script/', this.renameModalBtn.click(), 200);
  }
}