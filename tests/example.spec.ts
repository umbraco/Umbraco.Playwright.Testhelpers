import { expect, request } from '@playwright/test';
import { test, ApiHelpers} from '../helpers/ApiHelpers';

test.describe('feature foo', () => {
  test.beforeEach(async ({ page, umbracoApi }) => {
    umbracoApi.login("nge@umbraco.dk", "1234567890")
  });

  test('my test', async ({ page }) => {
    await page.goto('https://localhost:44331/umbraco');
    await expect(page).toHaveURL('https://localhost:44331/umbraco#/content');
  });
});
