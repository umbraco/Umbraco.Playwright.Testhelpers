import {expect} from '@playwright/test';
import {test} from '../../umbraco/helpers';
import {ContentBuilder, DocumentTypeBuilder, PackageBuilder} from "../../umbraco/builders";

test.describe('Packages', () => {

  const packageName = "TestPackage";
  const rootDocTypeName = "Test document type";
  const nodeName = "1) Home";

  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
  });

  async function CreatePackage(umbracoApi, contentId) {
    const packageSave = new PackageBuilder()
      .withId(0)
      .withPackageGuid("00000000-0000-0000-0000-000000000000")
      .withContentNodeId(contentId)
      .withName(packageName)
      .build();

    await umbracoApi.packages.save(packageSave)
  }

  async function CreateSimplePackage(umbracoApi) {
    const rootDocType = new DocumentTypeBuilder()
      .withName(rootDocTypeName)
      .withAllowAsRoot(true)
      .build();

    const generatedRootDocType = await umbracoApi.documentTypes.save(rootDocType);

    const rootDocTypeAlias = generatedRootDocType["alias"];

    const rootContentNode = new ContentBuilder()
      .withContentTypeAlias(rootDocTypeAlias)
      .withAction("saveNew")
      .addVariant()
      .withName(nodeName)
      .withSave(true)
      .done()
      .build();
    const generatedContent = await umbracoApi.content.save(rootContentNode);
    await CreatePackage(umbracoApi, generatedContent.Id);

  }

  test('Creates a simple package', async ({page, umbracoApi, umbracoUi}) => {
    await umbracoApi.packages.ensureNameNotExists(packageName);
    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);

    const rootDocType = new DocumentTypeBuilder()
      .withName(rootDocTypeName)
      .withAllowAsRoot(true)
      .build();

    const generatedRootDocType = await umbracoApi.documentTypes.save(rootDocType);
    const rootDocTypeAlias = generatedRootDocType["alias"];

    const rootContentNode = new ContentBuilder()
      .withContentTypeAlias(rootDocTypeAlias)
      .withAction("saveNew")
      .addVariant()
      .withName(nodeName)
      .withSave(true)
      .done()
      .build();

    await umbracoApi.content.save(rootContentNode);
    await page.pause();

    // Navigate to create package section
    await umbracoUi.goToSection('packages');
    await page.locator("button", {hasText: "Created"}).click();
    await page.locator("button", {hasText: "Create package"}).click();

    // Fill out package creation form
    await page.waitForTimeout(1000);
    await page.locator("#headerName").type(packageName);
    await page.locator('.controls > .umb-node-preview-add').click();
    await page.locator('.umb-tree-item__label').first().click();
    await page.locator("button", {hasText: "Create"}).click();

    // Navigate pack to packages and Assert the file is created
    await umbracoUi.goToSection('packages');
    await page.locator("button", {hasText: "Created"}).click();
    await expect(await page.locator("body", {hasText: packageName})).toBeVisible();

    // Cleanup
    await umbracoApi.packages.ensureNameNotExists(packageName);
    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
  });

  test('Deletes a package', async ({page, umbracoApi, umbracoUi}) => {
    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName)
    await umbracoApi.packages.ensureNameNotExists(packageName);

    await CreateSimplePackage(umbracoApi);

    // Navigate to create package section
    await umbracoUi.goToSection('packages');
    await page.locator('[data-element="sub-view-umbCreatedPackages"]').click()
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey('general_delete'));
    await page.waitForTimeout(100);
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey('contentTypeEditor_yesDelete'));

    // Assert
    await expect(await page.locator("tr", {hasText: "TestPackage"})).not.toBeVisible();
    
    // Cleanup
    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName)
    await umbracoApi.packages.ensureNameNotExists(packageName);
  });

  test('Download package', async ({page, umbracoApi, umbracoUi}) => {
    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName)
    await umbracoApi.packages.ensureNameNotExists(packageName);

    await CreateSimplePackage(umbracoApi);

    // Navigate to package and download
    await umbracoUi.goToSection('packages');
    await page.locator('[data-element="sub-view-umbCreatedPackages"]').click();
    await page.locator("tr", {hasText: "TestPackage"}).click();
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      umbracoUi.clickElement(umbracoUi.getButtonByLabelKey('general_download'))
    ]);
    
    // Assert
    await expect(await download).not.toBeNull();
    await expect(await download.failure()).toBeNull();

    // Cleanup
    await umbracoApi.content.deleteAllContent();
    await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName)
    await umbracoApi.packages.ensureNameNotExists(packageName);
  });
});
