import { test as base, Page, Locator, expect } from "@playwright/test"

export class UiHelpers {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async goToSection(sectionAlias: string) {
    await this.page.click('[data-element="section-' + sectionAlias + '"]');
  }
}

const test = base.extend<{umbracoUi: UiHelpers}>({
  umbracoUi : async ({ page }, use) => {
    const umbracoUi = new UiHelpers(page);
    await use(umbracoUi)
  }
})

export {test};