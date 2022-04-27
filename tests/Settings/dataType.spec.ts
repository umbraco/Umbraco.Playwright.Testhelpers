import {test} from "../../umbraco/helpers";
import {expect} from "@playwright/test";
import {LabelDataTypeBuilder} from "../../umbraco/builders";

test.describe('Data Types', () => {
  
  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
  });
  
  test('Create data type', async ({ page, umbracoApi, umbracoUi }) => {
    const name = "Test data type";

    await umbracoApi.dataTypes.ensureNameNotExists(name);

    await umbracoUi.goToSection("settings");
    await umbracoUi.waitForTreeLoad('settings');

    await umbracoUi.clickElement(umbracoUi.getTreeItem("settings", ["Data Types"]), { button: "right" });
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-create"));
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-data-type"));

    await umbracoUi.setEditorHeaderName(name);

    await page.locator('select[name="selectedEditor"]').selectOption({ label: 'Label' });
    await page.locator('.umb-property-editor select').selectOption({ label: 'Time' });

    await page.locator('.btn-success').click();

    await umbracoUi.isSuccessNotificationVisible();

    await umbracoApi.dataTypes.ensureNameNotExists(name);
  });
  
  test('Delete data type', async ({page, umbracoApi, umbracoUi}) =>  {
    const name = "Test datatype";
    
    await umbracoApi.dataTypes.ensureNameNotExists(name);
    
    const dataType = new LabelDataTypeBuilder()
      .withSaveNewAction()
      .withName(name)
      .build();
    
    await umbracoApi.dataTypes.save(dataType);
    
    await umbracoUi.goToSection("settings");
    await umbracoUi.waitForTreeLoad('settings');
    
    await umbracoUi.clickElement(umbracoUi.getTreeItem("settings", ["Data Types", name]), { button: "right" });
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-delete"));
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey("general_delete"));
    await expect(await (page.locator(`text=${name}`))).toHaveCount(0);
    
    await umbracoApi.dataTypes.ensureNameNotExists(name);
  });
});

