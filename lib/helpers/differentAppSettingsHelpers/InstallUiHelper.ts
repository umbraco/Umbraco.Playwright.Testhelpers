import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "../UiBaseLocators";

export class InstallUiHelper extends UiBaseLocators {
  private readonly nameTxt: Locator;
  private readonly emailTxt: Locator;
  private readonly passwordTxt: Locator;
  private readonly nextBtn: Locator;
  private readonly databaseTypeInput: Locator;
  private readonly databaseType: Locator;
  private readonly installBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.nameTxt = page.getByLabel('name');
    this.emailTxt = page.getByLabel('email');
    this.passwordTxt = page.getByLabel('password', {exact: true});
    this.nextBtn = page.getByLabel('Next');
    this.databaseTypeInput = page.locator('#database-type').locator('#native');
    this.databaseType = page.locator('#database-type').locator('option:checked');
    this.installBtn = page.getByLabel('Install');
  }

  async goToInstallPage() {
    await this.page.goto(process.env.URL + '/umbraco/install');
  }

  async enterName(name: string) {
    await expect(this.nameTxt).toBeVisible();
    await this.nameTxt.fill(name);
  }

  async enterEmail(email: string) {
    await expect(this.emailTxt).toBeVisible();
    await this.emailTxt.fill(email);
  }

  async enterPassword(password: string) {
    await expect(this.passwordTxt).toBeVisible();
    await this.passwordTxt.fill(password);
  }

  async clickNextButton() {
    await expect(this.nextBtn).toBeVisible();
    await this.nextBtn.click();
  }

  async setDatabaseType(databaseType: string) {
    await this.databaseTypeInput.selectOption(databaseType);
  }

  async doesDatabaseHaveType(databaseType: string) {
    await expect(this.databaseType).toHaveText(databaseType);
  }

  async clickInstallButton() {
    await expect(this.installBtn).toBeVisible();
    await this.installBtn.click();
  }
}
