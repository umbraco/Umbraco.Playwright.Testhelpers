import {test} from "../../umbraco/helpers";
import {expect} from "@playwright/test";

test.describe('Data Types', () => {
  
  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
  });
  
  test('Create data type', async ({ page, umbracoApi, umbracoUi }) => {
    const name = "Test data type";
    
    await umbracoApi.dataTypes.EnsureNameNotExists(name);
    
    await umbracoUi.goToSection("settings");
    
    await expect(await (page.locator('li > .umb-tree-root a[href*=settings]'))).toBeVisible();
    
    await umbracoUi.clickElement(umbracoUi.getTreeItem("settings", ["Data Types"]), { button: "right" })
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-create"))
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-data-type"))
    
    await umbracoUi.setEditorHeaderName(name);
    
    await page.locator('select[name="selectedEditor"]').selectOption({ label: 'Label' });
    await page.locator('.umb-property-editor select').selectOption({ label: 'Time' });
    
    await page.locator('.btn-success').click();
    
    await umbracoUi.isSuccessNotificationVisible();
    
    await umbracoApi.dataTypes.EnsureNameNotExists(name);
  });
});

