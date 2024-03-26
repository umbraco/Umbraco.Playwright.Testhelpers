import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class PublishedStatusUiHelper extends UiBaseLocators {
  private readonly publishedStatusTab: Locator;
  private readonly refreshStatusBtn: Locator;
  private readonly reloadMemoryCacheBtn: Locator;
  private readonly rebuildDatabaseCacheBtn: Locator;
  private readonly snapshotInternalCacheBtn: Locator;
  private readonly continueBtn: Locator;
  private readonly publishedCacheBox: Locator;

  constructor(page: Page) {
    super(page);
    this.publishedStatusTab = page.getByRole('tab', {name: 'Published Status'});
    this.refreshStatusBtn = page.getByLabel('Refresh Status');
    this.reloadMemoryCacheBtn = page.getByLabel('Reload Memory Cache');
    this.rebuildDatabaseCacheBtn = page.getByLabel('Rebuild Database Cache');
    this.snapshotInternalCacheBtn = page.getByLabel('Snapshot Internal Cache');
    this.continueBtn = page.locator('#confirm').getByLabel('Continue');
    this.publishedCacheBox = page.locator('[headline="Published Cache Status"]')
  }

  async clickPublishedStatusTab() {
    await this.publishedStatusTab.click();
  }

  async clickRefreshStatusButton() {
    await this.refreshStatusBtn.click();
  }

  async clickReloadMemoryCacheButton() {
    await this.reloadMemoryCacheBtn.click();
  }

  async clickRebuildDatabaseCacheButton() {
    await this.rebuildDatabaseCacheBtn.click();
  }

  async clickSnapshotInternalCacheButton() {
    await this.snapshotInternalCacheBtn.click();
  }

  async clickContinueButton() {
    await this.continueBtn.click();
  }

  async isPublishedCacheStatusVisible(status: string) {
    return expect(this.publishedCacheBox.getByText(status)).toBeVisible({timeout: 1000});
  }
}
