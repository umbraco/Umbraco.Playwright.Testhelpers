import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ScriptUiHelper extends UiBaseLocators{
  private readonly newJavascriptFileBtn: Locator;
  private readonly scriptTree: Locator;
  private readonly newFolderThreeDots: Locator;

  constructor(page: Page) {
    super(page);
    this.newJavascriptFileBtn = page.getByRole('link', {name: 'New Javascript file'});
    this.scriptTree = page.locator('umb-tree[alias="Umb.Tree.Script"]');
    this.newFolderThreeDots = page.getByRole('button', {name: 'New Folder...'});
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
  
  async waitForScriptToBeCreated() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForScriptToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForScriptToBeRenamed() {
    await this.waitForNetworkToBeIdle();
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
}