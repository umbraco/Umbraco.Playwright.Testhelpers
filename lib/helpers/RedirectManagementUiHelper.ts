import {Page, Locator} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class RedirectManagementUiHelper extends UiBaseLocators {
  private readonly redirectManagementTab: Locator;
  private readonly enableURLTrackerBtn: Locator;
  private readonly disableURLTrackerBtn: Locator;
  private readonly originalUrlTxt: Locator;
  private readonly searchBtn: Locator;


  constructor(page: Page) {
    super(page);
    this.redirectManagementTab = page.getByRole('tab', {name: 'Redirect Management'});
    this.enableURLTrackerBtn = page.getByLabel('Enable URL tracker');
    this.disableURLTrackerBtn = page.getByLabel('Disable URL tracker');
    this.originalUrlTxt = page.getByLabel('Original URL');
    this.searchBtn = page.getByLabel('Search', { exact: true });
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
}
