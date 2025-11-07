import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class DocumentBlueprintUiHelper extends UiBaseLocators{
  private readonly documentBlueprintTree: Locator;
  private readonly documentBlueprintNameTxt: Locator;
  private readonly deleteMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.documentBlueprintTree = page.locator('umb-tree[alias="Umb.Tree.DocumentBlueprint"]');
    this.documentBlueprintNameTxt = page.locator('#name-input #input');
    this.deleteMenu = page.locator('umb-section-sidebar #menu-item').getByLabel('Delete');
  }

  async clickActionsMenuForDocumentBlueprints(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForDocumentBlueprints('Document Blueprints');
  }

  async clickRootFolderCaretButton() {
    await this.openCaretButtonForName('Document Blueprints');
  }

  async waitForDocumentBlueprintToBeCreated() {
    await this.page.waitForLoadState();
  }

  async waitForDocumentBlueprintToBeDeleted() {
    await this.page.waitForLoadState();
  }
  
  async reloadDocumentBlueprintsTree() {
    await this.reloadTree('Document Blueprints');
  }
  
  async goToDocumentBlueprint(blueprintName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadDocumentBlueprintsTree();
    await this.page.getByLabel(blueprintName, {exact: true}).click();
  }

  async isDocumentBlueprintRootTreeItemVisible(blueprintName: string, isVisible: boolean = true, toReload: boolean = true){
    if (toReload) {
      await this.reloadDocumentBlueprintsTree();
    }
    return expect(this.documentBlueprintTree.getByText(blueprintName, {exact: true})).toBeVisible({visible: isVisible});
  }

  async clickCreateDocumentBlueprintButton() {
    await this.createDocumentBlueprintBtn.click();
  }
  
  async clickCreateNewDocumentBlueprintButton() {
    await this.createNewDocumentBlueprintBtn.click();
  }

  async enterDocumentBlueprintName(blueprintName: string) {
    await expect(this.documentBlueprintNameTxt).toBeVisible();
    await this.documentBlueprintNameTxt.fill(blueprintName);
  }

  async clickDeleteMenuButton() {
    await this.deleteMenu.click();
  }
}