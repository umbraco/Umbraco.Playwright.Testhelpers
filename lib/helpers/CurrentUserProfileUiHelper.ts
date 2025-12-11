import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class CurrentUserProfileUiHelper extends UiBaseLocators {
  private readonly changePasswordBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.changePasswordBtn = page.getByLabel('Change password');
  }

  async clickChangePasswordButton() {
    await this.click(this.changePasswordBtn);
  }

  async changePassword(currentPassword: string, newPassword: string) {
    await this.enterText(this.currentPasswordTxt, currentPassword);
    await this.enterText(this.newPasswordTxt, newPassword);
    await this.enterText(this.confirmPasswordTxt, newPassword);
    await this.clickConfirmButton();
  }
}