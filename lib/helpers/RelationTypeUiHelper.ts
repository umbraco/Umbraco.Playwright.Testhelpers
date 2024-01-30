import {Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class RelationTypeUiHelper extends UiBaseLocators{
  private readonly relationTypeNameTxt: Locator;
  private readonly parentToChildRadio: Locator;
  private readonly bidirectionalRadio: Locator;
  private readonly isDependencySlider: Locator;

  constructor(page: Page) {
    super(page);
    this.relationTypeNameTxt = page.locator('#name #input');
    this.parentToChildRadio = page.locator("uui-radio[label='Parent to child'] #button");
    this.bidirectionalRadio = page.locator("uui-radio[label='Bidirectional'] #button");
    this.isDependencySlider = page.locator("umb-property-layout[label='Is dependency'] #slider");
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

  async clickParentToChildRadio() {
    await this.parentToChildRadio.click();
  }

  async clickBidirectionalRadio() {
    await this.bidirectionalRadio.click();
  }

  async clickIsDependencySlider() {
    await this.isDependencySlider.click();
  }

  async selectParentOption(option: string) {
    await this.page.locator("umb-property-layout[label='Parent'] #native").selectOption({ label: option });
  }

  async selectChildOption(option: string) {
    await this.page.locator("umb-property-layout[label='Child'] #native").selectOption({ label: option });
  }
}