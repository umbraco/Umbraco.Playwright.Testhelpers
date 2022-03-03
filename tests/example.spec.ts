import { expect, request } from '@playwright/test';
import { test, ApiHelpers} from '../umbraco/helpers';

test.describe('feature foo', () => {
  test.beforeEach(async ({ page, umbracoApi }) => {
    await umbracoApi.login("nge@umbraco.dk", "1234567890")
  });

  test('my test', async ({ page }) => {
    await expect(page).toHaveURL('https://localhost:44331/umbraco#/content');
  });
});
