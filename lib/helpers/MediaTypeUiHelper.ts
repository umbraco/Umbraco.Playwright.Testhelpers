import {UiBaseLocators} from "./UiBaseLocators";
import {Locator, Page} from "@playwright/test";

export class MediaTypeUiHelper extends UiBaseLocators {
  private readonly newMediaTypeThreeDotsBtn: Locator;
  private readonly mediaTypeNameTxt: Locator;
  private readonly groupNameTxt: Locator;
  
  constructor(page: Page) {
    super(page);
    this.newMediaTypeThreeDotsBtn =  page.getByLabel('New Media Type...');
    this.mediaTypeNameTxt = page.getByLabel('name', { exact: true });
    this.groupNameTxt = page.getByLabel('Group name');


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
    await this.mediaTypeNameTxt.fill(name);
  }
  
  async enterMediaTypeGroupName(name: string) {
    await this.groupNameTxt.waitFor({state: 'visible'});
    await this.groupNameTxt.fill(name);
  }
}