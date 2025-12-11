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
    await this.click(this.newFolderThreeDots);
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
    await this.click(this.newJavascriptFileBtn);
  }
  
  async waitForScriptToBeCreated() {
    await this.page.waitForLoadState();
  }

  async waitForScriptToBeDeleted() {
    await this.page.waitForLoadState();
  }

  async waitForScriptToBeRenamed() {
    await this.page.waitForLoadState();
  }
  
  // Will only work for root scripts
  async goToScript(scriptName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadScriptTree();
    await this.click(this.page.getByLabel(scriptName, {exact: true}));
  }

  async enterScriptName(scriptContent: string) {
    await this.enterText(this.enterAName, scriptContent);
  }

  async enterScriptContent(scriptContent: string) {
    await this.enterMonacoEditorValue(scriptContent);
  }

  async openScriptAtRoot(scriptName: string) {
    await this.reloadScriptTree();
    await this.click(this.page.getByLabel(scriptName, {exact: true}));
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
}