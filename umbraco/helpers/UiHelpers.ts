import {expect, Page} from "@playwright/test"
import {AliasHelper} from "./AliasHelper";

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
    
    async getContextMenuAction(actionName : string){
      return this.page.locator('li.umb-action[data-element="' + actionName + '"]');
    }
    
    async setEditorHeaderName(headerName : string){
      const header = await this.page.locator("#headerName")
      await header.type(headerName);
      
      // We need to wait for the alias to be generated, but only if we can find it
      const aliasField = await this.page.locator('.umb-locked-field__input');
      if(await aliasField.count() > 0){
        await expect(aliasField).toHaveValue(AliasHelper.toAlias(headerName));
      }
      
    }
}