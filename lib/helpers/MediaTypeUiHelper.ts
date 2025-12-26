import {UiBaseLocators} from "./UiBaseLocators";
import {Locator, Page} from "@playwright/test";

export class MediaTypeUiHelper extends UiBaseLocators {
  private readonly newMediaTypeThreeDotsBtn: Locator;
  private readonly mediaEditPropertyWorkspace: Locator;
  private readonly mediaTypeBtn: Locator;
  private readonly mediaTypesMenu: Locator;
  private readonly mediaTypeTreeRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.newMediaTypeThreeDotsBtn = page.getByLabel('New Media Type…');
    this.mediaEditPropertyWorkspace = page.locator('umb-media-type-workspace-view-edit-property');
    this.mediaTypeBtn = this.createOptionActionListModal.locator('[name="Media Type"]');
    this.mediaTypesMenu = page.locator('#menu-item').getByRole('link', {name: 'Media Types'});
    this.mediaTypeTreeRoot = page.locator('[alias="Umb.TreeItem.MediaType"]').locator('uui-menu-item[label="Media Types"]')
  }

  async clickActionsMenuForMediaType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForMediaType("Media Types");
  }

  async clickRootFolderCaretButton() {
    await this.openCaretButtonForName("Media Types");
  }

  async clickNewMediaTypeButton() {
    await this.newMediaTypeThreeDotsBtn.click();
  }

  async isMediaTypeTreeItemVisible(name: string, isVisible: boolean = true) {
    {
      const hasShowChildren = await this.mediaTypeTreeRoot.getAttribute('show-children') !== null;

      if (!hasShowChildren) {
        await this.mediaTypeTreeRoot.locator(this.caretBtn).first().click();
      }

      await this.isTreeItemVisible(name, isVisible);
    }
  }

  async waitForMediaTypeToBeCreated() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForMediaTypeToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForMediaTypeToBeRenamed() {
    await this.waitForNetworkToBeIdle();
  }


  async goToMediaType(mediaTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.clickLabelWithName(mediaTypeName);
  }

  async enterMediaTypeName(name: string) {
    await this.waitForVisible(this.enterAName);
    await this.enterText(this.enterAName, name);
  }

  async enterDescriptionForPropertyEditorWithName(propertyEditorName: string, description: string) {
    await this.enterText(this.mediaEditPropertyWorkspace.filter({hasText: propertyEditorName}).getByLabel('description'), description);
  }

  async clickMediaTypeButton() {
    await this.click(this.mediaTypeBtn);
  }

  async clickMediaTypesMenu() {
    await this.click(this.mediaTypesMenu);
  }
}
