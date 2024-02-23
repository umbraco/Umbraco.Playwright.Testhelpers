import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class ProfilingUiHelper extends UiBaseLocators {
  private readonly profilingTab: Locator;
  private readonly activateProfilerByDefaultSlider: Locator;
  private readonly activateProfilerByDefaultCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.profilingTab = page.getByRole('tab', {name: 'Profiling'});
    this.activateProfilerByDefaultSlider = page.locator("[label='Activate the profiler by default'] #slider");
    this.activateProfilerByDefaultCheckbox = page.getByLabel('Activate the profiler by default');
  }

  async clickProfilingTab() {
    await this.profilingTab.click();
  }

  async clickActivateProfilerByDefaultSlider() {
    await this.activateProfilerByDefaultSlider.click();
  }

  async isActivateProfilerByDefaultSliderChecked(isChecked: boolean) {
    return expect(this.activateProfilerByDefaultCheckbox).toBeChecked({checked: isChecked});
  }
}
