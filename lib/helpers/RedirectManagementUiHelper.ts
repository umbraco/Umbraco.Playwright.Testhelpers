import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class RedirectManagementUiHelper extends UiBaseLocators {
  private readonly redirectManagementTab: Locator;
  private readonly enableURLTrackerBtn: Locator;
  private readonly disableURLTrackerBtn: Locator;
  private readonly originalUrlTxt: Locator;
  private readonly searchBtn: Locator;
  private readonly firstDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.redirectManagementTab = page.getByRole('tab', {name: 'Redirect URL Management'});
    this.enableURLTrackerBtn = page.getByLabel('Enable URL tracker');
    this.disableURLTrackerBtn = page.getByLabel('Disable URL tracker');
    this.originalUrlTxt = page.getByLabel('Original URL');
    this.searchBtn = page.getByLabel('Search', { exact: true });
    this.firstDeleteButton = page.locator('uui-button[label="Delete"]').first().locator('svg');
  }

  async clickRedirectManagementTab() {
    await this.redirectManagementTab.click();
  }

  async clickEnableURLTrackerButton() {
    await this.enableURLTrackerBtn.click();
  }

  async clickDisableURLTrackerButton() {
    await this.disableURLTrackerBtn.click();
  }

  async enterOriginalUrl(url: string) {
    await this.originalUrlTxt.clear();
    await this.originalUrlTxt.fill(url);
  }

  async clickSearchButton() {
    await this.searchBtn.click();
  }

  async deleteFirstRedirectURL() {
    await expect(this.firstDeleteButton).toBeVisible();
    await this.firstDeleteButton.click();
    await this.clickConfirmToDeleteButton();
  }
}
