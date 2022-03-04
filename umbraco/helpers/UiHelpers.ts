import {Page} from "@playwright/test"

export class UiHelpers {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async goToSection(sectionAlias: string) {
    await this.page.click('[data-element="section-' + sectionAlias + '"]');
  }

  async getTreeItem(treeName: string, itemNamePathArray: string[]) {

    let finalLocator = await this.page
        .locator('li > .umb-tree-root a[href*=' + treeName + ']')
        .locator("xpath=ancestor::li");
    console.log(await finalLocator.count());

    for(const index in itemNamePathArray){
      finalLocator = await finalLocator.locator('.umb-tree-item__label >> text=' + itemNamePathArray[index]);
      // TODO: Expand elements if they're closed
    }
    
    return finalLocator;
    }

}