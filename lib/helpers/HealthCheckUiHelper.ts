import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class HealthCheckUiHelper extends UiBaseLocators {
  private readonly healthCheckTab: Locator;
  private readonly healthCheckGroupBox: Locator;
  private readonly performanceAllChecksBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.healthCheckTab = page.getByRole('tab', {name: 'Health Check'});
    this.healthCheckGroupBox = page.locator('umb-health-check-group-box-overview');
    this.healthCheckGroupBox = page.locator('umb-health-check-group-box-overview');
    this.performanceAllChecksBtn = page.getByLabel('Perform all checks');
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
    return await expect(this.page.locator('umb-health-check-group-box-overview').getByText(groupName)).toBeVisible({timeout: 10000});
  }

  async doesHeathCheckGroupHaveSuccessItemsCount(healthCheckGroupName: string, count: number) {
    return expect(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator('uui-tag[color="positive"]')).toHaveText(count.toString(), {timeout: 10000});
  }

  async doesHeathCheckGroupHaveWarningItemsCount(healthCheckGroupName: string, count: number) {
    return expect(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator('uui-tag[color="warning"]')).toHaveText(count.toString(), {timeout: 10000});
  }

  async doesHeathCheckGroupHaveErrorItemsCount(healthCheckGroupName: string, count: number) {
    return expect(this.healthCheckGroupBox.filter({has: this.page.getByText(healthCheckGroupName)}).locator('uui-tag[color="danger"]')).toHaveText(count.toString(), {timeout: 10000});
  }

  async isCheckNameVisible(name: string) {
    return await expect(this.page.locator('#headline').filter({hasText: name})).toBeVisible({timeout: 10000});
  }

  async isCheckDescriptionVisible(description: string) {
    return await expect(this.page.locator('umb-dashboard-health-check-group').getByText(description)).toBeVisible({timeout: 10000});
  }
 
}
