import {Page, Locator, expect} from "@playwright/test"
import {AliasHelper} from "./AliasHelper";

export class UiHelpers {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getGlobalHelp() {
    return this.page.locator(`[data-element="global-help"]`);
  }

  async getGlobalUser() {
    return this.page.locator(`[data-element="global-user"]`);
  }

  async getDataElementByElementName(name:string){
    return this.page.locator(`[data-element="${name}"]`);
  } 

  async getButtonByText(text:string){
    return this.page.locator(`button:has-text("${text}")`);
  }

  async getButtonByLabelKey(label: string) {
    return this.page.locator(`umb-button[label-key="${label}"] button:enabled`);
  }

  async getSuccessNotification() {
    return this.page.locator('.umb-notifications__notifications > .alert-success');
  }

  async isSuccessNotificationVisible() {
    await expect(await this.getSuccessNotification()).toBeVisible();
  }

  async isErrorNotificationVisible() {
    await expect(await this.getErrorNotification()).toBeVisible();
  }

  async getErrorNotification() {
    return this.page.locator('.umb-notifications__notifications > .alert-error');
  }

  async clickElement(selector: Promise<Locator>, options: any = null) {
    const resolvedSelector = await selector;
    await resolvedSelector.click(options);
  }

  async clickDataElementByElementName(name:string){
    return this.page.click(`[data-element="${name}"]`);
  }

  async clickButtonByText(text:string){
    return this.page.click(`button:has-text("${text}")`);
  }

  async goToSection(sectionAlias: string) {
    await this.page.click('[data-element="section-' + sectionAlias + '"]');
  }

  async waitForTreeLoad(sectionAlias: string) {
    const tree = await this.page.locator('.umb-tree');
    await expect(await this.page.locator('.umb-tree')).toBeVisible();
    await expect(await tree.locator("a", {hasText: sectionAlias})).toBeVisible();
  }

  async getTreeItem(treeName: string, itemNamePathArray: string[]) {

    await expect((await this.page.locator('li > .umb-tree-root a[href*=' + treeName + ']').first())).toBeVisible();
    let finalLocator = await this.page
      .locator('li > .umb-tree-root a[href*=' + treeName + ']')
      .locator("xpath=ancestor::li");

    for (let i = 0; i < itemNamePathArray.length; i++) {
      // We want to find the outer li of the tree item, to be able to search deeper, there may be multiple results
      // for multiple levels of nesting, but it should be okay to pick last, since that should pick the immediate parent
      // the search goes from outer most to inner most (I think)
      finalLocator = await finalLocator
        .locator('.umb-tree-item__label >> text=' + itemNamePathArray[i])
        .locator('xpath=ancestor::li[contains(@class, "umb-tree-item")]')
        .last();

      // We don't want to click the expand option if we're on the last item, 
      // since that can cause issues when clicking the "root" items, such as Document Types.
      if (i + 1 == itemNamePathArray.length) {
        break;
      }

      // Get the UL with the collapsed state, if it exists
      const ulObject = await finalLocator.locator(".collapsed");
      const locatorIcon = await finalLocator.locator('[data-element="tree-item-expand"]', {hasText: itemNamePathArray[i]}).innerHTML();
      
      // Check if an element is actually expanded, if not expanded, it will have the "icon-navigation-right"
      if(locatorIcon.includes("icon-navigation-right")){
        if (await ulObject.count() > 0) {
          // Get the expand button
          const expandButton = finalLocator.locator('[data-element="tree-item-expand"]', {hasText: itemNamePathArray[i]});
          // Weirdly if a tree item has no children is still marked as expanded, however, the expand button is hidden
          // So we have to ensure that the button is not hidden before we click.
          if (await expandButton.isHidden() === false) {
            // Click the expand button, if its collapsed
            await finalLocator.locator('[data-element="tree-item-expand"]', {hasText: itemNamePathArray[i]}).click();
          }
        }
      }
    }

    return finalLocator;
  }

  async getContextMenuAction(actionName: string) {
    return this.page.locator('li.umb-action[data-element="' + actionName + '"]');
  }

  async setEditorHeaderName(headerName: string) {
    const header = await this.page.locator("#headerName")
    await header.type(headerName);

    // We need to wait for the alias to be generated, but only if we can find it
    const aliasField = await this.page.locator('.umb-locked-field__input');
    if (await aliasField.count() > 0) {
      await expect(aliasField).toHaveValue(AliasHelper.toAlias(headerName));
    }

  }

  async getEditorHeaderName(typedText: string) {
    await this.page.locator('#headerName').fill(typedText, {timeout: 10000});

    let result = await this.page.locator('.umb-editor-header__name-wrapper').locator('input[name="lockedField"]');
    const alias = AliasHelper.toAlias(typedText);
    await expect(result).toHaveValue(alias);
  }

  async clickMultiple(locator: Locator) {
    // TODO: Remove this
    // We're calling nth.IsEnabled to initialize the array, because locator is lazy
    // and count will then always return 0, hopefully this will be fixed in a future version of playwright
    await locator.nth(0).isEnabled();

    if (await locator.count() > 0) {
      let selects = await locator.elementHandles();
      for (const index in selects) {
        await selects[index].click();
      }
    }
  }

  async refreshContentTree() {
    const contentHeader = await this.page.locator('li .umb-tree-root >> text="Content"');
    await expect(contentHeader).toBeVisible();
    await contentHeader.click({button: "right"});

    await this.clickElement(this.getContextMenuAction("action-refreshNode"))

    await expect(await this.page.locator('.umb-tree-item__inner').first()).toBeVisible();
  }
  
  async refreshMediaTree() {
    const mediaHeader = await this.page.locator('li .umb-tree-root >> text="Media"');
    await expect(mediaHeader).toBeVisible();
    await mediaHeader.click({button: "right"});
    await this.clickElement(this.getContextMenuAction("action-refreshNode"));
    await expect(await this.page.locator('.umb-tree-item__inner').first()).toBeVisible();
  }
  
  async fileUploader(path){
    this.page.on("filechooser", async (fileChooser) => {
      await fileChooser.setFiles(path);
    });
    await this.page.locator('[property-alias="umbracoFile"]').click();
    await this.page.locator('[alias="save"]').click();
  }
  
  async switchCultureInContent(languageName)
  {
    await this.page.locator('.umb-variant-switcher__toggle').click();
    await this.page.locator('.umb-variant-switcher__name-wrapper', {hasText: languageName}).click();
  }
  
  async updateDocumentPermissionsToAllowCultureVariant(){
    await this.page.locator('[data-element="sub-view-permissions"]').click();
    await this.page.locator('[data-element="permissions-allow-as-root"]').click();
    await this.page.locator('[data-element="permissions-allow-culture-variant"]').click();
    await this.page.locator('[data-element="sub-view-design"]').click();
  }
  
  async goToAddEditor(groupName, propertyName){
    await this.page.locator('[data-element="group-add"]').click();
    await this.page.locator('[data-element="group-name"]').type(groupName);
    await this.page.locator('[key="contentTypeEditor_addProperty"]').click();
    await this.page.locator('[data-element="property-name"]').type(propertyName);
    await this.page.locator('[data-element="editor-add"]').click();
  }
  
  async createNewDocumentTypeWithTemplate(){
    await this.page.locator('[data-element="tree-item-options"]',{hasText: "Open context menu for Document Types"}).click();
    await this.page.locator('[data-element="action-documentType"]').click();
  }

  async createContentWithDocumentType(documentName){
    await this.page.locator('[element="tree-item-options"]', {hasText: "Open context node for Content"}).click();
    await this.page.locator('.umb-action-link', {hasText: documentName}).click();
  }
  
}
