import { expect, request } from '@playwright/test';
import { test, ApiHelpers, UiHelpers } from '../umbraco/helpers';

test.describe('feature foo', () => {
  test.beforeEach(async ({ page, umbracoApi }) => {
    await umbracoApi.login();
  });

  test('Create document type', async ({ page, umbracoApi, umbracoUi }) => {
    const name = "Test document type";

    umbracoApi.documentTypes.EnsureNameNotExists(name);
    umbracoApi.templates.EnsureNameNotExists(name);

    await umbracoUi.goToSection('settings');
    
    await expect(page).toHaveURL('https://localhost:44331/umbraco#/content');
  });
});
