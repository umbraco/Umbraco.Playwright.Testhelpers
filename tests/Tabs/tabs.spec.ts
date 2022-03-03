import { expect, Page } from '@playwright/test';
import { test, ApiHelpers, UiHelpers, AliasHelper } from '../../umbraco/helpers';
import { DocumentTypeBuilder } from '../../umbraco/builders';

const tabsDocTypeName = 'Tabs Test Document';
const tabsDocTypeAlias = AliasHelper.toAlias(tabsDocTypeName);

test.describe('Tabs', () => {
  
  test.beforeEach(async ({ umbracoApi }) => {
    await umbracoApi.login();
  });

  test.afterEach(async ({page, umbracoApi}) => {
    await umbracoApi.documentTypes.EnsureNameNotExists(tabsDocTypeName);
  });

  async function openDocTypeFolder(uiHelper: UiHelpers, page: Page) {
    await uiHelper.umbracoSection('settings');
    await page.locator('.umb-tree-item__inner > .umb-tree-item__arrow').first().click();
    await page.locator(`a:has-text("${tabsDocTypeName}")`).click();
  }

  async function createDocTypeWithTabsAndNavigate(umbracoUi: UiHelpers, umbracoApi: ApiHelpers, page: Page){
    await umbracoApi.documentTypes.EnsureNameNotExists(tabsDocTypeName);
    await umbracoApi.content.deleteAllContent();
    const tabsDocType = new DocumentTypeBuilder()
        .withName(tabsDocTypeName)
        .withAlias(tabsDocTypeAlias)
        .withAllowAsRoot(true)
        .withDefaultTemplate(tabsDocTypeAlias)
        .addGroup()
            .withName('Tabs1Group')
            .addUrlPickerProperty()
                .withAlias('picker')
            .done()
        .done()
        .build();
    await umbracoApi.documentTypes.saveDocumentType(tabsDocType);
    await openDocTypeFolder(umbracoUi, page);
  }

  test('Create tab', async ({umbracoUi, umbracoApi, page}) => {
    await createDocTypeWithTabsAndNavigate(umbracoUi, umbracoApi, page);

    // Create a tab 
    await page.locator('.umb-group-builder__tabs__add-tab').click();
    await page.locator('ng-form.ng-invalid > .umb-group-builder__group-title-input').fill('Tab 1');
    //Create a 2nd tab manually
    await page.locator('.umb-group-builder__tabs__add-tab').click();
    await page.locator('ng-form.ng-invalid > .umb-group-builder__group-title-input').fill('Tab 2');
    //Create a textstring property
    await page.locator('[aria-hidden="false"] > .umb-box-content > .umb-group-builder__group-add-property').click();
    await page.locator('.editor-label').fill('property name');
    await page.locator('[data-element="editor-add"]').click();

    //Search for textstring
    await page.locator('#datatype-search').fill('Textstring');

    // Choose first item
    await page.locator('[title="Textstring"]').first().click();

    // Save property
    await page.locator('.btn-success').last().click();
    (await umbracoUi.umbracoButtonByLabelKey('buttons_save')).click();
    //Assert
    await expect((await umbracoUi.umbracoSuccessNotification())).toBeVisible();
    await expect(page.locator('[title="tab1"]').first()).toBeVisible();
    await expect(page.locator('[title="tab2"]').first()).toBeVisible();
  });
});