import { expect, request } from '@playwright/test';
import { test, ApiHelpers, UiHelpers } from '../umbraco/helpers';

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

    var locator = await umbracoUi.getTreeItem("settings", ["Document Types"]);
    console.log(await locator.count())
    await locator.click({button: "right"});

  });
});
