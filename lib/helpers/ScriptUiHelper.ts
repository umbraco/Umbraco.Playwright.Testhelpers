import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ScriptUiHelper extends UiBaseLocators{
  private readonly insertScriptName: Locator;
  private readonly newJavascriptFileBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.insertScriptName = page.getByLabel('Script name');
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

  async enterScriptName(scriptContent: string) {
    await this.insertScriptName.fill(scriptContent);
  }

  async enterScriptContent(scriptContent: string) {
    await expect(this.textAreaInputArea).toBeVisible();
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(scriptContent);
  }

  async openScriptAtRoot(scriptName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(scriptName).click({force: true});
  }

  async deleteScript() {
    await this.clickDeleteThreeDotsButton();
    await this.clickConfirmToDeleteButton();
  }
}