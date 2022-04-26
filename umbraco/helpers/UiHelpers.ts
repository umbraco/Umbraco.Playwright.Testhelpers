import { test as base, Page, Locator, expect } from "@playwright/test"
import {AliasHelper} from "./AliasHelper";

export class UiHelpers {

  page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async getButtonByLabelKey(label: string){
    return this.page.locator(`umb-button[label-key="${label}"] button:enabled`);
  }

  async getSuccessNotification(){
    return this.page.locator('.umb-notifications__notifications > .alert-success');
  }
  
  async isSuccessNotificationVisible(){
    await expect(await this.getSuccessNotification()).toBeVisible();
  }
  
  async isErrorNotificationVisible(){
    await expect(await this.getErrorNotification()).toBeVisible();
  }

  async getErrorNotification(){
    return this.page.locator('.umb-notifications__notifications > .alert-error');
  }
  
  async clickElement(selector: Promise<Locator>, options: object = null){
    const resolvedSelector = await selector;
    await resolvedSelector.click(options);
  }

  async goToSection(sectionAlias: string) {
    await this.page.click('[data-element="section-' + sectionAlias + '"]');
  }

  async getTreeItem(treeName: string, itemNamePathArray: string[]) {

    await expect((await this.page.locator('li > .umb-tree-root a[href*=' + treeName + ']').first())).toBeVisible();
    let finalLocator = await this.page
      .locator('li > .umb-tree-root a[href*=' + treeName + ']')
      .locator("xpath=ancestor::li");

    for(const index in itemNamePathArray){
      // We want to find the outer li of the tree item, to be able to search deeper, there may be multiple results
      // for multiple levels of nesting, but it should be okay to pick last, since that should pick the immediate parent
      // the search goes from outer most to inner most (I think)
      finalLocator = await finalLocator
        .locator('.umb-tree-item__label >> text=' + itemNamePathArray[index])
        .locator('xpath=ancestor::li[contains(@class, "umb-tree-item")]')
        .last();

      // Get the UL with the collapsed state, if it exists
      const ulObject = await finalLocator.locator(".collapsed");
      if(await ulObject.count() > 0){
        // Get the expand button
        const expandButton = finalLocator.locator('[data-element="tree-item-expand"]');
        // Weirdly if a tree item has no children is still marked as expanded, however, the expand button is hidden
        // So we have to ensure that the button is not hidden before we click.
        if(await expandButton.isHidden() === false){
          // Click the expand button, if its collapsed
          await finalLocator.locator('[data-element="tree-item-expand"]').click();
        }
      }
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
  
  async getEditorHeaderName(typedText : string){
    await this.page.locator('#headerName').fill(typedText, { timeout: 10000 });

    let result = await this.page.locator('.umb-editor-header__name-wrapper').locator('input[name="lockedField"]');
    const alias = AliasHelper.toAlias(typedText);
    await expect(result).toHaveValue(alias);
  }
  
  async clickMultiple(locator: Locator){
    // TODO: Remove this
    // We're calling nth.IsEnabled to initialize the array, because locator is lazy
    // and count will then always return 0, hopefully this will be fixed in a future version of playwright
    await locator.nth(0).isEnabled();
    
    if(await locator.count() > 0){
      let selects = await locator.elementHandles();
      for(const index in selects){
        await selects[index].click();
      }
    }
  }
}