import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ScriptUiHelper {
  private readonly page: Page;
  private readonly uiBaseLocators: UiBaseLocators;
  private readonly newEmptyScriptBtn: Locator;
  private readonly insertScriptName: Locator;
  private readonly insertFolderName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uiBaseLocators = new UiBaseLocators(this.page);
    this.newEmptyScriptBtn = page.getByLabel('New empty script');
    this.insertScriptName = page.getByLabel('template name');
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

  // Will only work for root scripts
  async goToScript(scriptName: string) {
    await this.uiBaseLocators.goToSection(ConstantHelper.sections.settings);
    await this.clickActionsMenuAtRoot();
    await this.page.getByLabel(scriptName).click({force: true});
  }

  async clickSaveButton() {
    await this.uiBaseLocators.clickSaveButton();
  }

  async createFolder(folderName: string) {
    await this.uiBaseLocators.clickCreateFolderButton();
    await this.insertFolderName.fill(folderName);
    await this.uiBaseLocators.clickConfirmCreateFolderButton();
  }

  async enterScriptName(scriptContent: string) {
    await this.insertScriptName.fill(scriptContent);
  }

  async enterScriptContent(scriptContent: string) {
    await this.uiBaseLocators.textAreaInputArea.clear();
    await this.uiBaseLocators.textAreaInputArea.fill(scriptContent);
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
    await this.uiBaseLocators.deleteFolder();
  }
}