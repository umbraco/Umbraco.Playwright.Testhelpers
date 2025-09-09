import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "../UiBaseLocators";

export class ExternalLoginUiHelpers extends UiBaseLocators {
  private readonly azureADB2CSignInBtn: Locator;
  private readonly azureADB2CEmailTxt: Locator;
  private readonly azureADB2CPasswordTxt: Locator;
  private readonly signInBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.azureADB2CSignInBtn = page.locator('umb-auth-provider-default').getByText('Sign in with Azure AD B2C');
    this.azureADB2CEmailTxt = page.locator('#email');
    this.azureADB2CPasswordTxt = page.locator('#password');
    this.signInBtn = page.getByRole('button', {name: 'Sign in'});
  }

  async clickSignInWithAzureADB2CButton() {
    await expect(this.azureADB2CSignInBtn).toBeVisible();
    await this.azureADB2CSignInBtn.click();
  }

  async enterAzureADB2CEmail(email: string) {
    await expect(this.azureADB2CEmailTxt).toBeVisible();
    await this.azureADB2CEmailTxt.fill(email);
  }

  async enterAzureADB2CPassword(password: string) {
    await expect(this.azureADB2CPasswordTxt).toBeVisible();
    await this.azureADB2CPasswordTxt.fill(password);
  }

  async clickSignInButton() {
    await expect(this.signInBtn).toBeVisible();
    await this.signInBtn.click();
  }
}