import {AliasHelper, ConstantHelper, test} from '../../umbraco/helpers';
import {expect} from "@playwright/test";
import {
  ApprovedColorPickerDataTypeBuilder
} from "../../umbraco/builders/dataTypes/approvedColorPickerTypeDataTypeBuilder";
import {TextBoxDataTypeBuilder} from "../../umbraco/builders";

test.describe('DataTypes', () => {

  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
  });

  test('Tests Approved Colors', async ({page, umbracoApi, umbracoUi}) => {
    const name = 'Approved Colour Test';
    const alias = AliasHelper.toAlias(name);

    await umbracoApi.documentTypes.ensureNameNotExists(name);
    await umbracoApi.dataTypes.ensureNameNotExists(name);
    await umbracoApi.templates.ensureNameNotExists(name);

    const pickerDataType = new ApprovedColorPickerDataTypeBuilder()
      .withName(name)
      .withPrevalues(['000000', 'FF0000'])
      .build()

    //umbracoMakeDocTypeWithDataTypeAndContent(name, alias, pickerDataType);
    await umbracoApi.content.createDocTypeWithContent(name, alias, pickerDataType);

    // This is an ugly wait, but we have to wait for cache to rebuild
    await page.waitForTimeout(1000);

    //Editing template with some content
    await umbracoApi.templates.editTemplate(name,
      '@inherits Umbraco.Cms.Web.Common.Views.UmbracoViewPage<ApprovedColourTest>' +
      '\n@{' +
      '\n    Layout = null;' +
      '\n}' +
      '\n<p style="color:@Model.UmbracoTest">Lorem ipsum dolor sit amet</p>');


    // Act
    // Enter content
    await umbracoUi.refreshContentTree();
    await umbracoUi.clickElement(umbracoUi.getTreeItem("content", [name]));

    //Pick a colour
    await page.locator('.btn-000000').click()

    //Save
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.saveAndPublish));
    await umbracoUi.isSuccessNotificationVisible();

    //Assert
    const expected = `<p style="color:000000" > Lorem ipsum dolor sit amet </p>`;
    await expect(umbracoApi.content.verifyRenderedContent('/', expected, true)).toBeTruthy();
    await expect(await page.locator('.umb-button__overlay')).not.toBeVisible();

    //Pick another colour to verify both work
    await page.locator('.btn-FF0000').click()

    //Save
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.saveAndPublish));
    await umbracoUi.isSuccessNotificationVisible();
    await expect(await umbracoUi.getSuccessNotification()).toBeVisible();
    await expect(await page.locator('.umb-button__overlay')).not.toBeVisible();

    //Assert
    const expected2 = '<p style="color:FF0000">Lorem ipsum dolor sit amet</p>';
    await expect(await umbracoApi.content.verifyRenderedContent('/', expected2, true)).toBeTruthy();

    //Clean
    await umbracoApi.documentTypes.ensureNameNotExists(name);
    await umbracoApi.dataTypes.ensureNameNotExists(name);
    await umbracoApi.templates.ensureNameNotExists(name);
  });

  test('Tests Textbox Maxlength', async ({page, umbracoApi, umbracoUi}) => {
    const name = 'Textbox Maxlength Test';
    const alias = AliasHelper.toAlias(name);

    await umbracoApi.documentTypes.ensureNameNotExists(name);
    await umbracoApi.dataTypes.ensureNameNotExists(name);
    await umbracoApi.templates.ensureNameNotExists(name);

    const textBoxDataType = new TextBoxDataTypeBuilder()
      .withName(name)
      .withMaxChars(10)
      .build()

    await umbracoApi.content.createDocTypeWithContent(name, alias, textBoxDataType);

    // Act
    // Enter content
    // Assert no helptext with (max-2) chars & can save
    await umbracoUi.refreshContentTree();
    await umbracoUi.clickElement(umbracoUi.getTreeItem('content', [name]));
    await page.locator('input[name="textbox"]').type('12345678');
    await expect(await page.locator('localize[key="textbox_characters_left"]')).not.toBeVisible()
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.saveAndPublish));
    await umbracoUi.isSuccessNotificationVisible();

    // Add char and assert helptext appears - no publish to save time & has been asserted above & below
    await page.locator('input[name="textbox"]').type('9'); 
    await expect(page.locator('localize[key="textbox_characters_left"]', {hasText: "characters left"}).first()).toBeVisible();
    await expect(await umbracoUi.getErrorNotification()).not.toBeVisible();

    // Add char and assert errortext appears and can't save
    await page.locator('input[name="textbox"]').type('10'); // 1 char over max
    await expect(page.locator('localize[key="textbox_characters_exceed"]', {hasText: 'too many'}).first()).toBeVisible();
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.saveAndPublish));
    await expect(await page.locator('.property-error')).toBeVisible();

    // Clean
    await umbracoApi.documentTypes.ensureNameNotExists(name);
    await umbracoApi.dataTypes.ensureNameNotExists(name);
    await umbracoApi.templates.ensureNameNotExists(name);
  });
});
