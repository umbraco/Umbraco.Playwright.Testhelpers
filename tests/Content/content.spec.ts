import {ConstantHelper, test} from "../../umbraco/helpers";
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
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction(ConstantHelper.actions.copy))
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
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction(ConstantHelper.actions.move))
    await page.locator('.umb-pane [data-element="tree-item-' + secondRootNodeName + '"]').click()
    await page.locator('[key="actions_move"]').click();

    await expect(page.locator('.alert-success')).toBeVisible();

    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
    await umbracoApi.documentTypes.ensureNameNotExists(childDocTypeName);
  });

  test('Sort content', async ({ page, umbracoApi, umbracoUi }) => {
    const rootDocTypeName = "Test document type";
    const childDocTypeName = "Child test document type";
    const rootNodeName = "1) Home";
    const firstChildNodeName = "1) Child";
    const secondChildNodeName = "2) Child";

    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
    await umbracoApi.documentTypes.ensureNameNotExists(childDocTypeName);

    const childDocType = new DocumentTypeBuilder()
        .withName(childDocTypeName)
        .build();
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
          .withName(rootNodeName)
          .withSave(true)
        .done()
        .build();
    const createdRootContentNode = await umbracoApi.content.save(rootContentNode);

    // Add an item under root node
    const firstChildContentNode = new ContentBuilder()
        .withContentTypeAlias(createdChildDocType.alias)
        .withAction("saveNew")
        .withParent(createdRootContentNode.id)
        .addVariant()
          .withName(firstChildNodeName)
          .withSave(true)
        .done()
        .build();
    await umbracoApi.content.save(firstChildContentNode);

    // Add a second item under root node
    const secondChildContentNode = new ContentBuilder()
        .withContentTypeAlias(createdChildDocType.alias)
        .withAction("saveNew")
        .withParent(createdRootContentNode.id)
        .addVariant()
          .withName(secondChildNodeName)
          .withSave(true)
        .done()
        .build();
    await umbracoApi.content.save(secondChildContentNode);

    await umbracoUi.refreshContentTree();
    await umbracoUi.clickElement(umbracoUi.getTreeItem("content", [rootNodeName]), { button: "right", force: true });
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction(ConstantHelper.actions.sort));
    // Drag'n'drop second child to be the first one.
    await page.locator('.ui-sortable-handle >> text=' + secondChildNodeName).hover();
    await page.mouse.down()
    await page.locator('.ui-sortable-handle >> text=' + firstChildNodeName).hover();
    await page.mouse.up();

    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.save));
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.close));

    const childNodes = await page.locator('[node="child"]');
    await expect(childNodes.first()).toContainText(secondChildNodeName);
    await expect(childNodes.nth(2)).toContainText(firstChildNodeName);

    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
    await umbracoApi.documentTypes.ensureNameNotExists(childDocTypeName);
  });

  test('Rollback content', async ({ page, umbracoApi, umbracoUi }) => {
    const rootDocTypeName = "Test document type";
    const initialNodeName = "Home node";
    const newNodeName = "Home";

    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);

    const rootDocType = new DocumentTypeBuilder()
        .withName(rootDocTypeName)
        .withAllowAsRoot(true)
        .build();
    const createdDocType = await umbracoApi.documentTypes.save(rootDocType);

    const rootContentNode = new ContentBuilder()
        .withContentTypeAlias(createdDocType.alias)
        .addVariant()
          .withName(initialNodeName)
          .withSave(true)
        .done()
        .build();
    await umbracoApi.content.save(rootContentNode);

    await umbracoUi.refreshContentTree();
    await umbracoUi.clickElement(umbracoUi.getTreeItem("content", [initialNodeName]));

    const header = await page.locator('#headerName')
    // Sadly playwright doesn't have a clear method for inputs :( 
    // so we have to triple click to select all, and then hit backspace...
    await header.click({ clickCount: 3 })
    await page.keyboard.press('Backspace');

    await umbracoUi.setEditorHeaderName(newNodeName);
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.saveAndPublish));
    await umbracoUi.isSuccessNotificationVisible();

    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.rollback));
    // Not a very nice selector, but there's sadly no alternative :(
    await page.locator('.-selectable.cursor-pointer').first().click();
    // Sadly can't use the button by label key here since there's another one in the DOM 
    await page.locator('[action="vm.rollback()"]').click();

    await umbracoUi.refreshContentTree();
    await expect(page.locator('.umb-badge >> text=Save')).toBeVisible();
    await expect(page.locator('.umb-badge >> text=RollBack')).toBeVisible();
    const node = await umbracoUi.getTreeItem("content", [initialNodeName])
    await expect(node).toBeVisible();
  });

  test('View audit trail', async ({ page, umbracoApi, umbracoUi }) => {
    const rootDocTypeName = "Test document type";
    const nodeName = "Home";
    const labelName = "Name";

    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
    await umbracoApi.content.deleteAllContent();
    
    const rootDocType = new DocumentTypeBuilder()
      .withName(rootDocTypeName)
      .withAllowAsRoot(true)
        .addGroup()
          .addTextBoxProperty()
          .withLabel(labelName)
        .done()
      .done()
      .build();
    
    const generatedRootDocType = await umbracoApi.documentTypes.save(rootDocType)
    
    const rootContentNode = new ContentBuilder()
      .withContentTypeAlias(generatedRootDocType["alias"])
      .addVariant()
      .withName(nodeName)
      .withSave(true)
      .done()
      .build();

    await umbracoApi.content.save(rootContentNode);

    // Refresh to update the tree
    await umbracoUi.refreshContentTree();

    // Access node
    await umbracoUi.clickElement(umbracoUi.getTreeItem('content', [nodeName]));

    // Navigate to Info app
    await page.locator(ConstantHelper.contentApps.info).click();

    // Assert
    await expect(await page.locator('.history')).toBeDefined();

    // Clean up (content is automatically deleted when document types are gone)
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
  });

});

