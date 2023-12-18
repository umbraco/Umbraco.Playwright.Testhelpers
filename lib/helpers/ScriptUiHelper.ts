import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class ScriptUiHelper {
  private readonly page: Page;
  private readonly uiBaseLocators: UiBaseLocators;
  private readonly newEmptyScriptBtn: Locator;
  private readonly insertScriptName: Locator;
  private readonly scriptTextArea: Locator;
  private readonly insertFolderName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uiBaseLocators = new UiBaseLocators(this.page);
    this.newEmptyScriptBtn = page.getByLabel('New empty script');
    this.insertScriptName = page.getByLabel('template name');
    this.scriptTextArea = page.locator('textarea.inputarea')
    this.insertFolderName = page.locator('[headline="Create Folder"] >> input');
  }

  async clickActionsMenuForScript(name: string) {
    await this.uiBaseLocators.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForScript("Scripts");
  }

  async clickRootFolderCaretButton() {
    await this.uiBaseLocators.clickCaretButtonForName("Scripts");
  }

  async clickCaretButtonForName(name: string) {
    await this.uiBaseLocators.clickCaretButtonForName(name);
  }

  async clickNewScriptButton() {
    await this.newEmptyScriptBtn.click();
  }

  async clickSaveButton() {
    await this.uiBaseLocators.clickSaveButton();
  }

  async createNewFolder(folderName: string) {
    await this.uiBaseLocators.clickCreateFolderButton();
    await this.insertFolderName.fill(folderName);
    await this.uiBaseLocators.clickConfirmCreateFolderButton();
  }

  async enterScriptName(scriptContent: string) {
    await this.insertScriptName.fill(scriptContent);
  }

  async enterScriptContent(scriptContent: string) {
    await this.scriptTextArea.clear();
    await this.scriptTextArea.fill(scriptContent);
  }

  async openScriptAtRoot(scriptName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(scriptName).click({force: true});
  }

  async deleteScript() {
    await this.uiBaseLocators.clickDeleteButton();
    await this.uiBaseLocators.clickConfirmToDeleteButton();
  }

  async deleteFolder() {
    await this.uiBaseLocators.clickDeleteFolderButton();
    await this.uiBaseLocators.clickConfirmToDeleteButton();
  }
}