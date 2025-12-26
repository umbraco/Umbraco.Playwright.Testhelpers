import {Page, Locator} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class WelcomeDashboardUiHelper extends UiBaseLocators {
  private readonly welcomeTab: Locator;
  private readonly welcomeBox: Locator;


  constructor(page: Page) {
    super(page);
    this.welcomeTab = page.getByRole('tab', {name: 'Welcome'});
    this.welcomeBox = page.locator('uui-box');
  }

  async clickWelcomeTab() {
    await this.welcomeTab.click();
  }

  async doesButtonWithLabelInBoxHaveLink(label: string, boxName: string, link: string) {
    return await this.hasAttribute(this.welcomeBox.filter({hasText: boxName}).getByLabel(label), 'href', link);
  }
}
