import {test} from "../../umbraco/helpers";
import {expect} from "@playwright/test";
import {ContentBuilder, DocumentTypeBuilder, LabelDataTypeBuilder} from "../../umbraco/builders";

test.describe('Content tests', () => {

  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
  });
  
  test('Copy content', async ({ page, umbracoApi, umbracoUi }) => {
    const rootDocTypeName = "Test document type";
    const childDocTypeName = "Child test document type";
    const firstRootNodeName = "1) Home";
    const childNodeName = "1) Child";
    const secondRootNodeName = "2) Home";

    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
    await umbracoApi.documentTypes.ensureNameNotExists(childDocTypeName);

    const childDocType = new DocumentTypeBuilder()
        .withName(childDocTypeName)
        .build()

    const createdChildDocType = await umbracoApi.documentTypes.save(childDocType);

    const rootDocType = new DocumentTypeBuilder()
      .withName(rootDocTypeName)
      .withAllowAsRoot(true)
      .withAllowedContentTypes(createdChildDocType.id)
      .build();

    const createdRootDocType = await umbracoApi.documentTypes.save(rootDocType);

    // TODO: Make some constants for actions.
    const rootContentNode = new ContentBuilder()
      .withContentTypeAlias(createdRootDocType.alias)
      .withAction("saveNew")
      .addVariant()
        .withName(firstRootNodeName)
        .withSave(true)  // We should probably just default to true...
      .done()
      .build();

    const savedRootNode = await umbracoApi.content.save(rootContentNode);

    const secondRootNode = new ContentBuilder()
      .withContentTypeAlias(createdRootDocType.alias)
      .withAction("saveNew")
      .addVariant()
        .withName(secondRootNodeName)
        .withSave(true)
      .done()
      .build();

    await umbracoApi.content.save(secondRootNode);

    const childContentNode = new ContentBuilder()
      .withContentTypeAlias(createdChildDocType.alias)
      .withAction("saveNew")
      .withParent(savedRootNode.id)
      .addVariant()
        .withName(childNodeName)
        .withSave(true)
      .done()
      .build();

    await umbracoApi.content.save(childContentNode);

    await umbracoUi.refreshContentTree();

    await umbracoUi.clickElement(umbracoUi.getTreeItem("content", [firstRootNodeName, childNodeName]), {button: "right", force: true})
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-copy"))
    await page.locator('.umb-pane [data-element="tree-item-' + secondRootNodeName + '"]').click();
    await page.locator('.umb-dialog-footer > .btn-primary').click();
    await expect(page.locator('.alert-success')).toBeVisible();

    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
    await umbracoApi.documentTypes.ensureNameNotExists(childDocTypeName);
  });

  test('Move content', async ({ page, umbracoApi, umbracoUi }) => {
    const rootDocTypeName = "Test document type";
    const childDocTypeName = "Child test document type";
    const firstRootNodeName = "1) Home";
    const childNodeName = "1) Child";
    const secondRootNodeName = "2) Home";

    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
    await umbracoApi.documentTypes.ensureNameNotExists(childDocTypeName);

    const childDocType = new DocumentTypeBuilder()
        .withName(childDocTypeName)
        .build()

    const createdChildDocType = await umbracoApi.documentTypes.save(childDocType);

    const rootDocType = new DocumentTypeBuilder()
        .withName(rootDocTypeName)
        .withAllowAsRoot(true)
        .withAllowedContentTypes(createdChildDocType.id)
        .build();

    const createdRootDocType = await umbracoApi.documentTypes.save(rootDocType);

    const rootContentNode = new ContentBuilder()
        .withContentTypeAlias(createdRootDocType.alias)
        .withAction("saveNew")
        .addVariant()
          .withName(firstRootNodeName)
          .withSave(true)  // We should probably just default to true...
        .done()
        .build();

    const savedRootNode = await umbracoApi.content.save(rootContentNode);

    const secondRootNode = new ContentBuilder()
        .withContentTypeAlias(createdRootDocType.alias)
        .withAction("saveNew")
        .addVariant()
          .withName(secondRootNodeName)
          .withSave(true)
        .done()
        .build();

    await umbracoApi.content.save(secondRootNode);

    const childContentNode = new ContentBuilder()
        .withContentTypeAlias(createdChildDocType.alias)
        .withAction("saveNew")
        .withParent(savedRootNode.id)
        .addVariant()
          .withName(childNodeName)
          .withSave(true)
        .done()
        .build();

    await umbracoApi.content.save(childContentNode);
    
    await umbracoUi.refreshContentTree();
    
    await umbracoUi.clickElement(umbracoUi.getTreeItem("content", [firstRootNodeName, childNodeName]), { button: "right", force: true });
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-move"))
    await page.locator('.umb-pane [data-element="tree-item-' + secondRootNodeName + '"]').click()
    await page.locator('[key="actions_move"]').click();

    await expect(page.locator('.alert-success')).toBeVisible();

    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
    await umbracoApi.documentTypes.ensureNameNotExists(childDocTypeName);
  });
});

