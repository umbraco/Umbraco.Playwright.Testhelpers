import {expect} from '@playwright/test';
import {test} from '../../umbraco/helpers';
import {umbracoConfig} from "../../umbraco.config";

test.describe('Tours', () => {
  const timeout = 60000;
  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
    await resetTourData(umbracoApi);
  });

  async function resetTourData(umbracoApi) {
    const tourStatus =
      {
        "alias": "umbIntroIntroduction",
        "completed": false,
        "disabled": true
      };

    await umbracoApi.post(umbracoConfig.environment.baseUrl + "/umbraco/backoffice/UmbracoApi/CurrentUser/PostSetUserTour", tourStatus)
  }

  async function runBackOfficeIntroTour(percentageComplete, buttonText, timeout, page, umbracoUi) {
    await expect(await page.locator('[data-element="help-tours"]')).toBeVisible();
    await umbracoUi.clickElement(page.locator('[data-element="help-tours"]'));
    await expect(await page.locator('.umb-progress-circle', {timeout: timeout})).toContainText(percentageComplete + '%');


    await page.locator('[data-element="help-tours"]').click();
    await expect(await page.locator('[data-element="tour-umbIntroIntroduction"] .umb-button')).toBeVisible();
    await expect(await page.locator('[data-element="tour-umbIntroIntroduction"] .umb-button')).toContainText(buttonText);
    await umbracoUi.clickElement(await page.locator('[data-element="tour-umbIntroIntroduction"] .umb-button'));

    //act
    await expect(await page.locator('.umb-tour-step', {timeout: timeout})).toBeVisible();
    await expect(await page.locator('.umb-tour-step__footer')).toBeVisible();
    await expect(await page.locator('.umb-tour-step__counter')).toBeVisible();

    for (let i = 1; i < 8; i++) {

      if (i == 4) {
        continue
      }

      await expect(await page.locator('.umb-tour-step__counter')).toContainText(i + '/13');
      await expect(await page.locator('.umb-tour-step__footer .umb-button')).toBeVisible();
      await umbracoUi.clickElement(page.locator('.umb-tour-step__footer .umb-button'));
    }
    await umbracoUi.clickElement(await umbracoUi.getGlobalUser());
    await expect(await page.locator('.umb-tour-step__counter', {timeout: timeout})).toContainText('9/13');
    await expect(await page.locator('.umb-tour-step__footer .umb-button')).toBeVisible();
    await umbracoUi.clickElement(page.locator('.umb-tour-step__footer .umb-button'));
    await expect(await page.locator('.umb-tour-step__counter', {timeout: timeout})).toContainText('10/13');
    await expect(await page.locator('[data-element~="overlay-user"] [data-element="button-overlayClose"]')).toBeVisible();
    await umbracoUi.clickElement(page.locator('[data-element~="overlay-user"] [data-element="button-overlayClose"]'));
    await expect(await page.locator('.umb-tour-step__counter', {timeout: timeout})).toContainText('11/13');
    await umbracoUi.clickElement(await umbracoUi.getGlobalHelp());

    for (let i = 12; i < 13; i++) {
      await expect(await page.locator('.umb-tour-step__counter', {timeout: timeout})).toContainText(i + '/13');
      await expect(await page.locator('.umb-tour-step__footer .umb-button')).toBeVisible();
      await umbracoUi.clickElement(page.locator('.umb-tour-step__footer .umb-button'));
    }
    await expect(await page.locator('.umb-tour-step__footer .umb-button')).toBeVisible();
    await umbracoUi.clickElement(page.locator('.umb-tour-step__footer .umb-button'));
    await expect(await umbracoUi.getGlobalHelp()).toBeVisible();

  }

  test('Backoffice introduction tour should run', async ({page, umbracoApi, umbracoUi}) => {
    await expect(await umbracoUi.getGlobalHelp()).toBeVisible();
    await umbracoUi.clickElement(umbracoUi.getGlobalHelp());
    await runBackOfficeIntroTour(0, 'Start', timeout, page, umbracoUi);
  });
});