import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class ModelsBuilderUiHelper extends UiBaseLocators {
  private readonly modelsBuilderTab: Locator;
  private readonly reloadBtn: Locator;
  private readonly modelsBuilderDashboardContent: Locator;

  constructor(page: Page) {
    super(page);
    this.modelsBuilderTab = page.getByRole('tab', {name: 'Models Builder'});
    this.reloadBtn = page.getByLabel('Reload');
    this.modelsBuilderDashboardContent = page.locator('umb-models-builder-dashboard');
  }

  async clickModelsBuilderTab() {
    await this.modelsBuilderTab.click();
  }

  async clickReloadButton() {
    await this.reloadBtn.click();
  }

  async doesModelsBuilderDashboardHaveText(text: string) {
    return await expect(this.modelsBuilderDashboardContent).toContainText(text, {timeout: 10000});
  }
}
