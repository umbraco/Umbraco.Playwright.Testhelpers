import {Page, Locator} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class StylesheetUiHelper extends UiBaseLocators{
  private readonly newStylesheetBtn: Locator;
  private readonly newStylesheetFolderBtn: Locator;
  private readonly stylesheetNameTxt: Locator;
  private readonly stylesheetTree: Locator;
  private readonly stylesheetCreateModal: Locator;

  constructor(page: Page) {
    super(page);
    this.stylesheetCreateModal = page.locator('umb-entity-create-option-action-list-modal');
    this.newStylesheetBtn = this.stylesheetCreateModal.locator('umb-ref-item', {hasText: 'Stylesheet'});
    this.newStylesheetFolderBtn = this.stylesheetCreateModal.locator('umb-ref-item', {hasText: 'Folder'});
    this.stylesheetNameTxt = page.locator('umb-stylesheet-workspace-editor').locator('#nameInput #input');
    this.stylesheetTree = page.locator('umb-tree[alias="Umb.Tree.Stylesheet"]');
  }

  async clickActionsMenuForStylesheet(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async createStylesheetFolder(folderName: string) {
    await this.clickCreateActionMenuOption();
    await this.clickNewStylesheetFolderButton();
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
    await this.click(this.newStylesheetBtn);
  }

  async clickNewStylesheetFolderButton() {
    await this.click(this.newStylesheetFolderBtn);
  }

  async waitForStylesheetToBeCreated() {
    await this.waitForLoadState();
  }

  async waitForStylesheetToBeDeleted() {
    await this.waitForLoadState();
  }

  async waitForStylesheetToBeRenamed() {
    await this.waitForLoadState();
  }
  
  async enterStylesheetName(stylesheetName: string) {
    await this.enterText(this.stylesheetNameTxt, stylesheetName);
  }
  
  async enterStylesheetContent(stylesheetContent: string) {
    await this.enterMonacoEditorValue(stylesheetContent);
  }

  async openStylesheetByNameAtRoot(stylesheetName: string) {
    await this.reloadStylesheetTree();
    await this.click(this.page.getByLabel(stylesheetName, {exact: true}));
  }

  async reloadStylesheetTree() {
    await this.reloadTree('Stylesheets');
  }

  async isStylesheetRootTreeItemVisible(stylesheetName: string, isVisible: boolean = true, toReload: boolean = true) {
    if (toReload) {
      await this.reloadStylesheetTree();
    }
    return await this.isVisible(this.stylesheetTree.getByText(stylesheetName, {exact: true}), isVisible);
  }

  async goToStylesheet(stylesheetName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadStylesheetTree();
    await this.click(this.page.getByLabel(stylesheetName, {exact: true}));
  }
}