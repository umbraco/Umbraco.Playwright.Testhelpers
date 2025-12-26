import {Page, Locator} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class ModelsBuilderUiHelper extends UiBaseLocators {
  private readonly modelsBuilderTab: Locator;
  private readonly modelsBuilderDashboardContent: Locator;

  constructor(page: Page) {
    super(page);
    this.modelsBuilderTab = page.getByRole('tab', {name: 'Models Builder'});
    this.modelsBuilderDashboardContent = page.locator('umb-models-builder-dashboard');
  }

  async clickModelsBuilderTab() {
    await this.modelsBuilderTab.click();
  }

  async doesModelsBuilderDashboardHaveText(text: string) {
    return await this.containsText(this.modelsBuilderDashboardContent, text, 10000);
  }
}
