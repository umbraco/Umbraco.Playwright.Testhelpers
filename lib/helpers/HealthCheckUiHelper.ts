import {Page, Locator} from "@playwright/test";
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

  async checkHealthCheckGroupCount() {
    await this.isVisible(this.healthCheckGroupBox.first());
    return this.healthCheckGroupBox.count();
  }

  async clickPerformanceAllChecksButton() {
    await this.performanceAllChecksBtn.click();
  }

  async clickHeathCheckGroupByName(groupName: string) {
    await this.page.getByRole('link', { name: groupName }).click();
  }

  async isHealthCheckGroupVisible(groupName: string) {
    return await this.isVisible(this.healthCheckGroupBox.getByText(groupName));
  }

  async doesHeathCheckGroupHaveSuccessItemsCount(healthCheckGroupName: string, count: number) {
    return this.hasText(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator(this.positiveTag), count.toString());
  }

  async doesHeathCheckGroupHaveWarningItemsCount(healthCheckGroupName: string, count: number) {
    return this.hasText(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator(this.warningTag), count.toString());
  }

  async doesHeathCheckGroupHaveErrorItemsCount(healthCheckGroupName: string, count: number) {
    return this.hasText(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator(this.dangerTag), count.toString());
  }

  async isCheckNameVisible(name: string) {
    return await this.isVisible(this.headline.filter({hasText: name}));
  }

  async isCheckDescriptionVisible(description: string) {
    return await this.isVisible(this.healthCheckGroup.getByText(description));
  }
}
