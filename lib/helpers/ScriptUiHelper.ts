import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ScriptUiHelper extends UiBaseLocators{
  private readonly insertScriptName: Locator;
  private readonly insertFolderName: Locator;
  private readonly newJavascriptFileBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.insertScriptName = page.getByLabel('Script name');
    this.insertFolderName = page.locator('[headline="Create Folder"] >> input');
    this.newJavascriptFileBtn = page.getByLabel('New Javascript file');
  }

  async clickActionsMenuForScript(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForScript("Scripts");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Scripts");
  }

  async clickNewJavascriptFileButton() {
    await this.newJavascriptFileBtn.click();
  }
  
  // Will only work for root scripts
  async goToScript(scriptName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.clickActionsMenuAtRoot();
    await this.page.getByLabel(scriptName).click({force: true});
  }

  async createFolder(folderName: string) {
    await this.clickCreateLabelButton();
    await this.clickNewFolderLabelButton();
    await this.page.waitForTimeout(1000);
    await this.insertFolderName.fill(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async enterScriptName(scriptContent: string) {
    await this.insertScriptName.fill(scriptContent);
  }

  async enterScriptContent(scriptContent: string) {
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(scriptContent);
  }

  async openScriptAtRoot(scriptName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(scriptName).click({force: true});
  }

  async deleteScript() {
    await this.clickDeleteButton();
    await this.clickConfirmToDeleteButton();
  }
}