import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class StylesheetUiHelper extends UiBaseLocators{
  private readonly newStylesheetBtn: Locator;
  private readonly stylesheetNameTxt: Locator;
  private readonly stylesheetTree: Locator;

  constructor(page: Page) {
    super(page);
    this.stylesheetNameTxt = page.locator('umb-stylesheet-workspace-editor').locator('#nameInput #input');
    this.newStylesheetBtn = this.createOptionActionListModal.locator('[name="New Stylesheet"]');
    this.stylesheetTree = page.locator('umb-tree[alias="Umb.Tree.Stylesheet"]');
  }

  async clickActionsMenuForStylesheet(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async createStylesheetFolder(folderName: string) {
    await this.clickCreateActionMenuOption();
    await this.clickFolderButton();
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
    await this.newStylesheetBtn.click();
  }

  async waitForStylesheetToBeCreated() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForStylesheetToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForStylesheetToBeRenamed() {
    await this.waitForNetworkToBeIdle();
  }
  
  async enterStylesheetName(stylesheetName: string) {
    await this.enterText(this.stylesheetNameTxt, stylesheetName);
  }
  
  async enterStylesheetContent(stylesheetContent: string) {
    await this.enterMonacoEditorValue(stylesheetContent);
  }

  async openStylesheetByNameAtRoot(stylesheetName: string) {
    await this.reloadStylesheetTree();
    await this.page.getByLabel(stylesheetName, {exact: true}).click();
  }

  async reloadStylesheetTree() {
    await this.reloadTree('Stylesheets');
  }

  async isStylesheetRootTreeItemVisible(stylesheetName: string, isVisible: boolean = true, toReload: boolean = true) {
    if (toReload) {
      await this.reloadStylesheetTree();
    }
    return this.isVisible(this.stylesheetTree.getByText(stylesheetName, {exact: true}), isVisible);
  }

  async goToStylesheet(stylesheetName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadStylesheetTree();
    await this.page.getByLabel(stylesheetName, {exact: true}).click();
  }
}