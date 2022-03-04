import { expect, request } from '@playwright/test';
import { test, ApiHelpers, UiHelpers } from '../../umbraco/helpers';

test.describe('feature foo', () => {
  test.beforeEach(async ({ page, umbracoApi }) => {
    await umbracoApi.login();
  });

  test('Create document type', async ({ page, umbracoApi, umbracoUi }) => {
    const name = "Test document type";

    await umbracoApi.documentTypes.EnsureNameNotExists(name);
    await umbracoApi.templates.EnsureNameNotExists(name);

    await umbracoUi.goToSection('settings');

    await expect((await page.locator('li .umb-tree-root:has-text("Settings")'))).toBeVisible();

    const documentTypeElement = await umbracoUi.getTreeItem("settings", ["Document Types"]);
    await documentTypeElement.click({button: "right"});

    await (await umbracoUi.getContextMenuAction("action-create")).click();
    await (await umbracoUi.getContextMenuAction("action-documentType")).click();
    
    await umbracoUi.setEditorHeaderName(name);
    
    // TODO: Create an GetButtonByDataElement? seems like it could be useful
    // Add a property group
    await page.locator('[data-element="group-add"]').click();
    await page.locator('.umb-group-builder__group-title-input').type('Group name');
    // Add a property
    await page.locator('[data-element="property-add"]').click();
    await page.locator('.editor-label').type('property name');
    await page.locator('[data-element="editor-add"]').click();

    // Search for textstring
    await page.locator('#datatype-search').type('Textstring');

    await page
      .locator('ul.umb-card-grid li [title="Textstring"]')
      .locator("xpath=ancestor::li")
      .click();
    
    await page.locator(".btn-success").last().click();
    await page.locator(".btn-success").click();
    
    const successNotification = await umbracoUi.getSuccessNotification();
    await expect(successNotification).toBeVisible();

    await umbracoApi.documentTypes.EnsureNameNotExists(name);
    await umbracoApi.templates.EnsureNameNotExists(name);

  });
});
