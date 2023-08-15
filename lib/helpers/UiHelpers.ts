import {Page} from "@playwright/test"

export class UiHelpers {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToSection(sectionAlias: string) {
    await this.page.click('[data-element="section-' + sectionAlias + '"]');
  }

  async clickDataElement(elementName: string, options: any = null) {
    await this.page.click(`[data-element="${elementName}"]`, options);
  }
  
  async getDataElement(elementName: string) {
    return this.page.locator(`[data-element="${elementName}"]`);
  }
}