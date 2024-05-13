import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class DocumentBlueprintsUiHelper extends UiBaseLocators{
  private readonly documentBlueprintTree: Locator;
  private readonly createDocumentBlueprintBtn: Locator;
  private readonly documentBlueprintNameTxt: Locator;

  constructor(page: Page) {
    super(page);
    this.documentBlueprintTree = page.locator('umb-tree[alias="Umb.Tree.DocumentBlueprint"]');
    this.createDocumentBlueprintBtn = page.getByLabel('Create Document Blueprint');
    this.documentBlueprintNameTxt = page.locator('#name-input #input');
  }

  async clickActionsMenuForDocumentBlueprints(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForDocumentBlueprints('Document Blueprints');
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName('Document Blueprints');
  }

  async reloadDocumentBlueprintsTree() {
    await this.reloadTree('Document Blueprints');
  }
  
  async goToDocumentBlueprints(blueprintName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.reloadDocumentBlueprintsTree();
    await this.page.getByLabel(blueprintName).click({force: true});
  }

  async isDocumentBlueprintRootTreeItemVisible(blueprintName: string, isVisible: boolean = true){
    await this.reloadDocumentBlueprintsTree();
    return expect(this.documentBlueprintTree.getByText(blueprintName, {exact: true})).toBeVisible({visible: isVisible});
  }

  async clickCreateDocumentBlueprintButton() {
    await this.createDocumentBlueprintBtn.click();
  }

  async enterDocumentBlueprintName(blueprintName: string) {
    await expect(this.documentBlueprintNameTxt).toBeVisible();
    await this.documentBlueprintNameTxt.fill(blueprintName);
  }
}