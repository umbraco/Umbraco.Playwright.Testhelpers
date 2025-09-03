import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class LoginUiHelper extends UiBaseLocators {
  private readonly emailTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly loginBtn: Locator;
  private readonly azureADB2CSignInBtn: Locator;
  private readonly azureADB2CEmailTxt: Locator;
  private readonly azureADB2CPasswordTxt: Locator;
  private readonly signInBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailTxt = page.locator('[name="username"]');
    this.passwordTxt = page.locator('[name="password"]');
    this.loginBtn = page.getByLabel('Login');
    this.azureADB2CSignInBtn = page.locator('umb-auth-provider-default').getByText('Sign in with Azure AD B2C');
    this.azureADB2CEmailTxt = page.locator('#email');
    this.azureADB2CPasswordTxt = page.locator('#password');
    this.signInBtn = page.getByRole('button', {name: 'Sign in'});
  }

  async enterEmail(email: string) {
    await expect(this.emailTxt).toBeVisible({timeout: 20000});
    await this.emailTxt.clear();
    await this.emailTxt.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordTxt.clear();
    await this.passwordTxt.fill(password);
  }

  async clickLoginButton() {
    await this.loginBtn.click();
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
