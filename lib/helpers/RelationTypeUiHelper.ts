import {Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class RelationTypeUiHelper extends UiBaseLocators{
  private readonly relationTypeNameTxt: Locator;
  private readonly parentToChildRadioBtn: Locator;
  private readonly bidirectionalRadioBtn: Locator;
  private readonly isDependencySlider: Locator;
  private readonly parentDropDownBox: Locator;
  private readonly childDropDownBox: Locator;

  constructor(page: Page) {
    super(page);
    this.relationTypeNameTxt = page.locator('#name #input');
    this.parentToChildRadioBtn = page.locator("uui-radio[label='Parent to child'] #button");
    this.bidirectionalRadioBtn = page.locator("uui-radio[label='Bidirectional'] #button");
    this.isDependencySlider = page.locator("umb-property-layout[label='Is dependency'] #slider");
    this.parentDropDownBox = page.locator("umb-property-layout[label='Parent'] #native");
    this.childDropDownBox = page.locator("umb-property-layout[label='Child'] #native");
  }

  async clickActionsMenuForRelationType(name: string) {
    await this.clickActionsMenuForName(name);
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

  async clickBidirectionalRadioButton() {
    await this.bidirectionalRadioBtn.click();
  }

  async clickIsDependencySlider() {
    await this.isDependencySlider.click();
  }

  async selectParentOption(option: string) {
    await this.parentDropDownBox.selectOption({ label: option });
  }

  async selectChildOption(option: string) {
    await this.childDropDownBox.selectOption({ label: option });
  }
}