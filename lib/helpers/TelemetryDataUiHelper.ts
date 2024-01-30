import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class TelemetryDataUiHelper extends UiBaseLocators {
  private readonly telemetryDataTab: Locator;
  private readonly telemetryDataLevelSlider: Locator;

  constructor(page: Page) {
    super(page);
    this.telemetryDataTab = page.getByRole('tab', {name: 'Telemetry Data'});
    this.telemetryDataLevelSlider = page.locator('[name="telemetryLevel"] >> input[id=input]');
  }

  async clickTelemetryDataTab() {
    await this.telemetryDataTab.click();
  }

  async changeTelemetryDataLevelValue(value: string) {
    await this.telemetryDataLevelSlider.fill(value);
  }

<<<<<<< HEAD
  async doesTelemetryDataLevelHasValue(value: string) {
=======
  async doesTelemetryDataLevelHaveValue(value: string) {
>>>>>>> v2/dev
    return await expect(this.telemetryDataLevelSlider).toHaveValue(value);
  }
}
