import { test as base, Page, Locator, expect } from "@playwright/test"

export class UiHelpers {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async umbracoSection(sectionAlias: string){
    await this.page.locator('[data-element="section-' + sectionAlias + '"]').click();
  }

  async umbracoButtonByLabelKey(label: string){
    return this.page.locator(`umb-button[label-key="${label}"] button:enabled`);
  }

  async umbracoSuccessNotification(){
    return this.page.locator('.umb-notifications__notifications > .alert-success');
  }

  async umbracoErrorNotification(){
    return this.page.locator('.umb-notifications__notifications > .alert-error');
  }
  
  async clickElement(selector: Locator, options: object = null){
    await selector.click(options);
  }
}

const test = base.extend<{umbracoUi: UiHelpers}>({
  umbracoUi : async ({ page }, use) => {
    const umbracoUi = new UiHelpers(page);
    await use(umbracoUi)
  }
})

export {test};