import {Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class RelationTypeUiHelper extends UiBaseLocators{
  constructor(page: Page) {
    super(page);
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Relation Types");
  }
}