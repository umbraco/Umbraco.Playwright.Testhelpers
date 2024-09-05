import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ScriptUiHelper extends UiBaseLocators{
  private readonly scriptNameTxt: Locator;
  private readonly newJavascriptFileBtn: Locator;
  private readonly scriptTree: Locator;

  constructor(page: Page) {
    super(page);
    this.scriptNameTxt = page.getByLabel('Enter a name...');
    this.newJavascriptFileBtn = page.getByLabel('New Javascript file');
    this.scriptTree = page.locator('umb-tree[alias="Umb.Tree.Script"]');
  }

  async clickActionsMenuForScript(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForScript('Scripts');
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName('Scripts');
  }

  async clickNewJavascriptFileButton() {
    await this.newJavascriptFileBtn.click();
  }
  
  // Will only work for root scripts
  async goToScript(scriptName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadScriptTree();
    await this.page.getByLabel(scriptName).click({force: true});
  }

  async enterScriptName(scriptContent: string) {
    await expect(this.scriptNameTxt).toBeVisible();
    await this.scriptNameTxt.fill(scriptContent);
  }

  async enterScriptContent(scriptContent: string) {
    await expect(this.textAreaInputArea).toBeVisible();
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(scriptContent);
  }

  async openScriptAtRoot(scriptName: string) {
    await this.reloadScriptTree();
    await this.page.getByLabel(scriptName, {exact: true}).click({force: true});
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