import { test } from "../../umbraco/helpers";
import {expect} from "@playwright/test";

test.describe('Scripts', () => {
  test.beforeEach(async ({ page, umbracoApi }) => {
    await umbracoApi.login();
  });

  test('Create new Javascript file', async ({ page, umbracoApi, umbracoUi }) => {
    const name = "CreateNewScript";
    const fileName = name + ".js";
    
    await umbracoApi.scripts.ensureNameNotExists(fileName);
    
    await umbracoUi.goToSection("settings");
    
    await umbracoUi.clickElement(umbracoUi.getTreeItem("settings", ["Scripts"]), { button: "right"});
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-create"));
    await page.locator('.menu-label localize[key="create_newJavascriptFile"]').click();
    await page.waitForResponse('**/umbraco/lib/ace-builds/src-min-noconflict/worker-javascript.js');
    
    await umbracoUi.setEditorHeaderName(name);
    await page.locator('.btn-success').click();
    
    await umbracoUi.isSuccessNotificationVisible();
    
    await expect(await umbracoApi.scripts.exists(fileName)).toBeTruthy();
    
    await umbracoApi.scripts.ensureNameNotExists(fileName);
  })
});