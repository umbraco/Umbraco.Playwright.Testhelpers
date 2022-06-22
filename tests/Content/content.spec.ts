import {test} from "../../umbraco/helpers";
import {expect} from "@playwright/test";
import {ContentBuilder, DocumentTypeBuilder, LabelDataTypeBuilder} from "../../umbraco/builders";

test.describe('Content tests', () => {

  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
  });

  test('Create data type', async ({ page, umbracoApi, umbracoUi }) => {
    const name = "Test";

    await umbracoApi.documentTypes.ensureNameNotExists(name);

    const tabsDocType = new DocumentTypeBuilder()
      .withName(name)
      .withAlias("aTest")
      .withAllowAsRoot(true)
      .withDefaultTemplate("aTest")
      .build();

    const response = await umbracoApi.documentTypes.save(tabsDocType);
    
    const content = new ContentBuilder()
      .withContentTypeAlias(response.alias)
      .withAction("saveNew")
      .addVariant()
        .withName("SomeContent")
        .withSave(true)
      .done()
      .build();
    
    await umbracoApi.content.save(content);
    await page.pause();
  });
});

