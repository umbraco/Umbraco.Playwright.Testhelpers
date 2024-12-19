import {UiBaseLocators} from "./UiBaseLocators";
import {Locator, Page} from "@playwright/test";

export class MediaTypeUiHelper extends UiBaseLocators {
  private readonly newMediaTypeThreeDotsBtn: Locator;
  private readonly mediaEditPropertyWorkspace: Locator;

  constructor(page: Page) {
    super(page);
    this.newMediaTypeThreeDotsBtn = page.getByLabel('New Media Type...');
    this.mediaEditPropertyWorkspace = page.locator('umb-media-type-workspace-view-edit-property');
  }

  async clickActionsMenuForMediaType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForMediaType("Media Types");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Media Types");
  }

  async clickNewMediaTypeButton() {
    await this.newMediaTypeThreeDotsBtn.click();
  }

  async goToMediaType(mediaTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(mediaTypeName).click();
  }

  async enterMediaTypeName(name: string) {
    await this.enterAName.waitFor({state: 'visible'});
    await this.enterAName.fill(name);
  }

  async enterDescriptionForPropertyEditorWithName(propertyEditorName: string, description: string) {
    await this.mediaEditPropertyWorkspace.filter({hasText: propertyEditorName}).getByLabel('description').fill(description);
  }
}