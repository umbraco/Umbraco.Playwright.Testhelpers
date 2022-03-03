import { expect, request } from '@playwright/test';
import { test, ApiHelpers} from '../umbraco/helpers';

test.describe('feature foo', () => {
  test.beforeEach(async ({ page, umbracoApi }) => {
    await umbracoApi.login("nel@umbraco.dk", "testproject")
  });

  test('Create document type', async ({ page, umbracoApi }) => {
    const name = "Test document type";

    umbracoApi.documentTypes.EnsureNameNotExists(name);
    await expect(page).toHaveURL('https://localhost:44331/umbraco#/content');
  });
});
