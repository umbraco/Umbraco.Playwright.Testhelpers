import {expect, Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class CurrentUserProfileUiHelper extends UiBaseLocators {
  private readonly changePasswordBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.changePasswordBtn = page.getByLabel('Change your password');
  }

  async clickChangePasswordButton() {
    await expect(this.changePasswordBtn).toBeVisible();
    await this.changePasswordBtn.click();
  }

  async changePassword(currentPassword: string, newPassword: string) {
    await expect(this.currentPasswordTxt).toBeVisible();
    await this.currentPasswordTxt.clear();
    await this.currentPasswordTxt.fill(currentPassword);
    await this.newPasswordTxt.clear();
    await this.newPasswordTxt.fill(newPassword);
    await this.confirmPasswordTxt.clear();
    await this.confirmPasswordTxt.fill(newPassword);
    await this.clickConfirmButton();
  }
}