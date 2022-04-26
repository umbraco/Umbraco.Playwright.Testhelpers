import {expect} from '@playwright/test';
import {test} from '../../../umbraco/helpers';
import {StylesheetBuilder, TemplateBuilder} from "../../../umbraco/builders";

test.describe('Stylesheets', () => {

  const name = "TestStylesheet";
  const fileName = name + ".css";

  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
  });

  test.afterEach(async ({page, umbracoApi}) => {
    await umbracoApi.stylesheets.ensureNameNotExists(name);
  });

  // test('Create new style sheet file', async ({page, umbracoApi, umbracoUi}) => {
  //  
  //   await umbracoUi.goToSection('settings');
  //   await expect(await page.locator('.umb-tree')).toBeVisible();
  //
  //   await umbracoUi.clickElement(umbracoUi.getTreeItem("settings", ["Stylesheets"]), {button: "right"});
  //
  //   await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-create"));
  //   await page.locator('.menu-label').first().click(); // TODO: Would be better to use something like cy.umbracoContextMenuAction("action-mediaType").click();
  //   // We have to wait here till everything is loaded, or worker will throw error
  //   await page.waitForResponse('**/umbraco/lib/ace-builds/src-min-noconflict/worker-css.js');
  //
  //   // Type name
  //   await umbracoUi.setEditorHeaderName(name);
  //
  //   // Save
  //   await page.locator('.btn-success').click();
  //
  //   // Assert
  //   await umbracoUi.isSuccessNotificationVisible();
  // });  
  
  test('Deletes a stylesheet', async ({page, umbracoApi, umbracoUi}) => {

    var stylesheet = new StylesheetBuilder()
      .withVirtualPath("/css/")
      .withFileType("stylesheets")
      .withName(name);


    await umbracoApi.stylesheets.save(stylesheet);

    // Navigate to Settings section
    await umbracoUi.goToSection('settings');
    await expect(await page.locator('.umb-tree')).toBeVisible();

    // Open stylesheet tree
    await umbracoUi.clickElement(umbracoUi.getTreeItem("settings", ["Stylesheets"]), {button: "right"});

    // Delete stylesheet

    await page.locator(".umb-tree-item__inner > .umb-tree-item__label >> text=" + name).click({button: "right"});
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction('action-delete'));
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey("general_ok"));

    // Assert
    await expect(await page.locator('.umb-tree-item__inner > .umb-tree-item__label')).not.toContainText(name);
  });
});
