import {UiBaseLocators} from "./UiBaseLocators";
import {Locator, Page} from "@playwright/test";

export class MemberTypeUiHelper extends UiBaseLocators {
  private readonly memberTypeNameTxt: Locator;
  private readonly memberTypeEditPropertyWorkspace: Locator;

  constructor(page: Page) {
    super(page);
    this.memberTypeNameTxt = page.getByLabel('name', {exact: true});
    this.memberTypeEditPropertyWorkspace = page.locator('umb-member-type-workspace-view-edit-property');
  }

  async clickActionsMenuForMemberType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForMemberType("Member Types");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Member Types");
  }

  async goToMemberType(memberTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(memberTypeName).click();
  }

  async enterMemberTypeName(name: string) {
    await this.memberTypeNameTxt.clear();
    await this.memberTypeNameTxt.fill(name);
  }

  async enterDescriptionForPropertyEditorWithName(propertyEditorName: string, description: string) {
    await this.memberTypeEditPropertyWorkspace.filter({hasText: propertyEditorName}).getByLabel('description').fill(description);
  }
}