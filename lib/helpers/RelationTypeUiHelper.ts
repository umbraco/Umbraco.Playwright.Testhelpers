import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class RelationTypeUiHelper extends UiBaseLocators{
  private readonly relationTypeNameTxt: Locator;
  private readonly parentToChildRadioBtn: Locator;
  private readonly bidirectionalRadioBtn: Locator;
  private readonly isDependencyToggle: Locator;
  private readonly parentDropDownBox: Locator;
  private readonly childDropDownBox: Locator;
  private readonly relationTypeCollection: Locator;
  private readonly relationTypeWorkspace: Locator;
  private readonly relationTypeParentType: Locator;
  private readonly relationTypeChildType: Locator;
  private readonly relationTypeBidirectional: Locator;
  private readonly relationTypeDependency: Locator;
  private readonly relationsTableRow: Locator;

  constructor(page: Page) {
    super(page);
    this.relationTypeNameTxt = page.locator('#name #input');
    this.parentToChildRadioBtn = page.locator("uui-radio[label='Parent to child'] #button");
    this.bidirectionalRadioBtn = page.locator("uui-radio[label='Bidirectional'] #button");
    this.isDependencyToggle = page.locator("umb-property-layout[label='Is dependency'] #toggle");
    this.parentDropDownBox = page.locator("umb-property-layout[label='Parent'] #native");
    this.childDropDownBox = page.locator("umb-property-layout[label='Child'] #native");
    this.relationTypeCollection = page.locator('umb-relation-type-table-collection-view')
    this.relationTypeWorkspace = page.locator('umb-relation-type-detail-workspace-view');
    this.relationTypeParentType = this.relationTypeWorkspace.locator('[label="Parent Type"]').locator('[slot="editor"]');
    this.relationTypeChildType = this.relationTypeWorkspace.locator('[label="Child Type"]').locator('[slot="editor"]');
    this.relationTypeBidirectional =this.relationTypeWorkspace.locator('[label="Bidirectional"]').locator('[slot="editor"]');
    this.relationTypeDependency = this.relationTypeWorkspace.locator('[label="Dependency"]').locator('[slot="editor"]');
    this.relationsTableRow = this.relationTypeWorkspace.locator('umb-table').locator('uui-table-row');
  }

  async clickActionsMenuForRelationType(name: string) {
    await this.clickActionsMenuForName(name);
  }
  
  async goToRelationTypeWithName(name: string) {
    await expect(this.relationTypeCollection.getByText(name)).toBeVisible();
    await this.relationTypeCollection.getByText(name).click();
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Relation Types");
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForRelationType("Relation Types");
  }

  async openRelationTypeByNameAtRoot(relationTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(relationTypeName).click();
  }

  async enterRelationTypeName(name: string) {
    await this.relationTypeNameTxt.clear();
    await this.relationTypeNameTxt.fill(name);
  }

  async clickParentToChildRadioButton() {
    await this.parentToChildRadioBtn.click();
  }
  
  async doesParentTypeContainValue(value: string) {
    await expect(this.relationTypeParentType).toContainText(value);
  }

  async doesChildTypeContainValue(value: string) {
    await expect(this.relationTypeChildType).toContainText(value);
  }

  async doesBidirectionalContainValue(value: string) {
    await expect(this.relationTypeBidirectional).toContainText(value);
  }

  async doesDependencyContainValue(value: string) {
    await expect(this.relationTypeDependency).toContainText(value);
  }

  async isRelationWithParentAndChildVisible(parent: string, child: string, isVisible: boolean = true) {
    await expect(this.relationsTableRow.filter({has: this.page.locator('uui-table-cell').first().getByText(parent)}).filter({has: this.page.locator('uui-table-cell').nth(1).getByText(child)})).toBeVisible({visible: isVisible});
  }

  async clickBidirectionalRadioButton() {
    await this.bidirectionalRadioBtn.click();
  }

  async clickIsDependencyToggle() {
    await this.isDependencyToggle.click();
  }

  async selectParentOption(option: string) {
    await this.parentDropDownBox.selectOption({ label: option });
  }

  async selectChildOption(option: string) {
    await this.childDropDownBox.selectOption({ label: option });
  }
}