import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import { ConstantHelper } from "./ConstantHelper";

export class StylesheetUiHelper extends UiBaseLocators{
  private readonly newStylesheetBtn: Locator;
  private readonly stylesheetNameTxt: Locator;
  private readonly stylesheetTree: Locator;
  private readonly saveStylesheetBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.stylesheetNameTxt = page.locator('umb-stylesheet-workspace-editor').locator('#nameInput #input');
    this.newStylesheetBtn = this.createOptionActionListModal.locator('[name="New Stylesheet"]');
    this.stylesheetTree = page.locator('umb-tree[alias="Umb.Tree.Stylesheet"]');
    this.saveStylesheetBtn  = page.locator('[data-mark="workspace-action:Umb.WorkspaceAction.Stylesheet.Save"]');

  }

  async clickActionsMenuForStylesheet(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async isSuccessStateVisibleForSaveButton (isVisible: boolean = true){
    const saveBtn = this.workspaceAction.filter({has: this.saveStylesheetBtn});
    await expect(saveBtn.locator(this.successState)).toBeVisible({visible: isVisible, timeout: 10000});
  }

  async createStylesheetFolder(folderName: string) {
    await this.clickActionsMenuCreateButton();
    await this.clickFolderButton();
    await this.enterFolderName(folderName);
    await this.clickConfirmCreateFolderButton();
  }
  
  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForStylesheet('Stylesheets');
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName('Stylesheets');
  }

  async clickNewStylesheetButton() {
    await this.newStylesheetBtn.click();
  }

  async enterStylesheetName(stylesheetName: string) {
    await expect(this.stylesheetNameTxt).toBeVisible();
    await this.stylesheetNameTxt.clear();
    await this.stylesheetNameTxt.fill(stylesheetName);
  }
  
  async enterStylesheetContent(stylesheetContent: string) {
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(stylesheetContent);
  }

  async openStylesheetByNameAtRoot(stylesheetName: string) {
    await this.reloadStylesheetTree();
    await this.page.getByLabel(stylesheetName).click();
  }

  async reloadStylesheetTree() {
    await this.reloadTree('Stylesheets');
  }

  async isStylesheetRootTreeItemVisible(stylesheetName: string, isVisible: boolean = true, toReload: boolean = true) {
    if (toReload) {
      await this.reloadStylesheetTree();
    }
    return expect(this.stylesheetTree.getByText(stylesheetName, {exact: true})).toBeVisible({visible: isVisible});
  }

  async goToStylesheet(stylesheetName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadStylesheetTree();
    await this.page.getByLabel(stylesheetName).click();
  }
}