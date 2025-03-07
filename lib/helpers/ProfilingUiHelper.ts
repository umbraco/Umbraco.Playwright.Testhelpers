import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class ProfilingUiHelper extends UiBaseLocators {
  private readonly profilingTab: Locator;
  private readonly activateProfilerByDefaultToggle: Locator;
  private readonly activateProfilerByDefaultCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.profilingTab = page.getByRole('tab', {name: 'Profiling'});
    this.activateProfilerByDefaultToggle = page.locator("[label='Activate the profiler by default'] #toggle");
    this.activateProfilerByDefaultCheckbox = page.getByLabel('Activate the profiler by default');
  }

  async clickProfilingTab() {
    await this.profilingTab.click();
  }

  async clickActivateProfilerByDefaultToggle() {
    await this.activateProfilerByDefaultToggle.click();
  }

  async isActivateProfilerByDefaultToggleChecked(isChecked: boolean) {
    return expect(this.activateProfilerByDefaultCheckbox).toBeChecked({checked: isChecked});
  }
}
