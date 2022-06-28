import {test, UiHelpers} from '../../umbraco/helpers';
import {expect, Page} from "@playwright/test";

test.describe('System Information', () => {
  const enCulture = "en-US";

  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
    await umbracoApi.users.setCurrentLanguage(enCulture);
  });

  test.afterEach(async ({page, umbracoApi}) => {
    await umbracoApi.users.setCurrentLanguage(enCulture);
  });

  async function openSystemInformation(page: Page, umbracoUi : UiHelpers) {
    //We have to wait for page to load, if the site is slow
    await umbracoUi.clickElement(umbracoUi.getGlobalHelp());
    await expect(page.locator('.umb-help-list-item').last()).toBeVisible();
    await umbracoUi.clickElement(page.locator('.umb-help-list-item').last());
    await page.locator('.umb-drawer-content').scrollIntoViewIfNeeded();
  }

  test('Check System Info Displays', async ({page, umbracoApi, umbracoUi}) => {
    await openSystemInformation(page, umbracoUi);
    await expect(page.locator('.table').locator('tr')).toHaveCount(13);
    await expect(await page.locator("tr", {hasText: "Current Culture"})).toContainText(enCulture);
    await expect(await page.locator("tr", {hasText: "Current UI Culture"})).toContainText(enCulture);
  });
});
