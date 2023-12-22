import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ScriptUiHelper extends UiBaseLocators{
  private readonly newEmptyScriptBtn: Locator;
  private readonly insertScriptName: Locator;
  private readonly insertFolderName: Locator;

  constructor(page: Page) {
    super(page);
    this.newEmptyScriptBtn = page.getByLabel('New empty script');
    this.insertScriptName = page.getByLabel('template name');
    this.insertFolderName = page.locator('[headline="Create Folder"] >> input');
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

  async clickNewScriptButton() {
    await this.newEmptyScriptBtn.click();
  }

  // Will only work for root scripts
  async goToScript(scriptName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.clickActionsMenuAtRoot();
    await this.page.getByLabel(scriptName).click({force: true});
  }

  async createFolder(folderName: string) {
    await this.clickCreateFolderButton();
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