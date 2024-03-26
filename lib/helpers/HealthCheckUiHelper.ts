import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class HealthCheckUiHelper extends UiBaseLocators {
  private readonly healthCheckTab: Locator;
  private readonly healthCheckGroupBox: Locator;
  private readonly performanceAllChecksBtn: Locator;
  private readonly positiveTag: string;
  private readonly warningTag: string;
  private readonly dangerTag: string;
  private readonly headline: Locator;
  private readonly healthCheckGroup: Locator;

  constructor(page: Page) {
    super(page);
    this.healthCheckTab = page.getByRole('tab', {name: 'Health Check'});
    this.healthCheckGroupBox = page.locator('umb-health-check-group-box-overview');
    this.performanceAllChecksBtn = page.getByLabel('Perform all checks');
    this.positiveTag = 'uui-tag[color="positive"]';
    this.warningTag = 'uui-tag[color="warning"]';
    this.dangerTag = 'uui-tag[color="danger"]';
    this.headline = page.locator('#headline');
    this.healthCheckGroup = page.locator('umb-dashboard-health-check-group');
  }

  async clickHealthCheckTab() {
    await this.healthCheckTab.click();
  }

  checkHealthCheckGroupCount() {
    return this.healthCheckGroupBox.count();
  }

  async clickPerformanceAllChecksButton() {
    await this.performanceAllChecksBtn.click();
  }

  async clickHeathCheckGroupByName(groupName: string) {
    await this.page.getByRole('link', { name: groupName }).click();
  }

  async isHealthCheckGroupVisible(groupName: string) {
    return await expect(this.healthCheckGroupBox.getByText(groupName)).toBeVisible();
  }

  async doesHeathCheckGroupHaveSuccessItemsCount(healthCheckGroupName: string, count: number) {
    return expect(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator(this.positiveTag)).toHaveText(count.toString());
  }

  async doesHeathCheckGroupHaveWarningItemsCount(healthCheckGroupName: string, count: number) {
    return expect(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator(this.warningTag)).toHaveText(count.toString());
  }

  async doesHeathCheckGroupHaveErrorItemsCount(healthCheckGroupName: string, count: number) {
    return expect(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator(this.dangerTag)).toHaveText(count.toString());
  }

  async isCheckNameVisible(name: string) {
    return await expect(this.headline.filter({hasText: name})).toBeVisible();
  }

  async isCheckDescriptionVisible(description: string) {
    return await expect(this.healthCheckGroup.getByText(description)).toBeVisible();
  }
}
