import {expect, Locator, Page,} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {umbracoConfig} from "../../umbraco.config";

export class PackageUiHelper extends UiBaseLocators {
  private readonly createdTabBtn: Locator;
  private readonly marketPlaceIFrame: Locator;
  private readonly installedTabBtn: Locator;
  private readonly packagesTabBtn: Locator;
  private readonly createPackageBtn: Locator;
  private readonly packageNameTxt: Locator;
  private readonly saveChangesToPackageBtn: Locator;
  private readonly addContentToPackageBtn: Locator;
  private readonly addMediaToPackageBtn: Locator;
  private readonly addDocumentTypeToPackageBtn: Locator;
  private readonly addMediaTypeToPackageBtn: Locator;
  private readonly addLanguageToPackageBtn: Locator;
  private readonly addDictionaryToPackageBtn: Locator;
  private readonly addDataTypesToPackageBtn: Locator;
  private readonly addTemplatesToPackagesBtn: Locator;
  private readonly addPartialViewToPackageBtn: Locator;
  private readonly addScriptToPackageBtn: Locator;
  private readonly addStylesheetToPackageBtn: Locator;
  private readonly downloadPackageBtn: Locator;
  private readonly propertyLayout: Locator;
  private readonly umbracoBackofficePackage: Locator;
  private readonly viewsId: Locator;

  constructor(page: Page) {
    super(page);
    this.viewsId = page.locator('#views');
    // Packages
    this.packagesTabBtn = this.viewsId.getByRole('tab', { name: 'Packages' });
    this.marketPlaceIFrame = page.frameLocator('iframe[title="Umbraco Marketplace"]').locator('umb-market-app');
    // Installed
    this.installedTabBtn = this.viewsId.getByRole('tab', { name: 'Installed' });
    // Created
    this.propertyLayout = page.locator('umb-property-layout');
    this.createdTabBtn = this.viewsId.getByRole('tab', { name: 'Created' });
    this.createPackageBtn = page.getByLabel("Create package");
    this.packageNameTxt = page.getByLabel('Name of the package');
    this.saveChangesToPackageBtn = page.getByLabel('Save changes to package');
    this.addContentToPackageBtn = page.locator('umb-input-document').getByLabel('Choose');
    this.addMediaToPackageBtn = page.locator('umb-input-media').getByLabel('Choose');
    this.addDocumentTypeToPackageBtn = this.propertyLayout.filter({hasText: 'Document Types'}).getByLabel('Choose');
    this.addMediaTypeToPackageBtn = this.propertyLayout.filter({hasText: 'Media Types'}).getByLabel('Choose');
    this.addLanguageToPackageBtn = this.propertyLayout.filter({hasText: 'Languages'}).getByLabel('Choose');
    this.addDictionaryToPackageBtn = this.propertyLayout.filter({hasText: 'Dictionary'}).getByLabel('Choose');
    this.addDataTypesToPackageBtn = this.propertyLayout.filter({hasText: 'Data Types'}).getByLabel('Choose');
    this.addTemplatesToPackagesBtn = this.propertyLayout.filter({hasText: 'Templates'}).getByLabel('Choose');
    this.addPartialViewToPackageBtn = this.propertyLayout.filter({hasText: 'Partial Views'}).getByLabel('Choose');
    this.addScriptToPackageBtn = this.propertyLayout.filter({hasText: 'Scripts'}).getByLabel('Choose');
    this.addStylesheetToPackageBtn = this.propertyLayout.filter({hasText: 'Stylesheets'}).getByLabel('Choose');
    this.downloadPackageBtn = page.getByLabel('Download');
    this.umbracoBackofficePackage = page.locator('uui-ref-node-package', {hasText: '@umbraco-cms/backoffice'});
  }

  async isUmbracoBackofficePackageVisible(isVisible = true) {
    return await expect(this.umbracoBackofficePackage).toBeVisible({visible: isVisible});
  }

  async clickCreatedTab() {
    await this.page.waitForTimeout(500);
    await expect(this.createdTabBtn).toBeVisible();
    await this.createdTabBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickInstalledTab() {
    await expect(this.installedTabBtn).toBeVisible();
    await this.installedTabBtn.click();
  }

  async clickPackagesTab() {
    await expect(this.packagesTabBtn).toBeVisible();
    await this.packagesTabBtn.click();
  }

  async clickChooseBtn() {
    await this.chooseModalBtn.click();
  }

  async isMarketPlaceIFrameVisible(isVisible = true) {
    return await expect(this.marketPlaceIFrame).toBeVisible({visible: isVisible});
  }

  async clickCreatePackageButton() {
    await this.createPackageBtn.click();
  }

  async enterPackageName(packageName: string) {
    await this.packageNameTxt.clear();
    await this.packageNameTxt.fill(packageName);
    await this.page.waitForTimeout(500);
  }

  async isPackageNameVisible(packageName: string, isVisible = true) {
    return await expect(this.page.getByRole('button', {name: packageName})).toBeVisible({visible: isVisible});
  }

  async clickExistingPackageName(packageName: string) {
    await this.page.getByRole('button', {name: packageName}).click();
    await this.page.waitForTimeout(500);
  }

  async clickDeleteButtonForPackageName(packageName: string) {
    await expect(this.page.locator('uui-ref-node-package', {hasText: packageName}).getByLabel('Delete')).toBeVisible();
    await this.page.locator('uui-ref-node-package', {hasText: packageName}).getByLabel('Delete').click();
  }

  async clickSaveChangesToPackageButton() {
    await this.saveChangesToPackageBtn.click();
  }

  async clickAddContentToPackageButton() {
    await this.addContentToPackageBtn.click();
  }

  async clickAddMediaToPackageButton() {
    await expect(this.addMediaToPackageBtn).toBeVisible();
    await this.addMediaToPackageBtn.click();
  }

  async clickAddDocumentTypeToPackageButton() {
    await this.addDocumentTypeToPackageBtn.click();
  }

  async clickAddMediaTypeToPackageButton() {
    await this.addMediaTypeToPackageBtn.click();
  }

  async clickAddLanguageToPackageButton() {
    await this.addLanguageToPackageBtn.click();
  }

  async clickAddDictionaryToPackageButton() {
    await this.addDictionaryToPackageBtn.click();
  }

  async clickAddDataTypesToPackageButton() {
    await this.addDataTypesToPackageBtn.click();
  }

  async clickAddTemplatesToPackageButton() {
    await this.addTemplatesToPackagesBtn.click();
  }

  async clickAddPartialViewToPackageButton() {
    await this.addPartialViewToPackageBtn.click();
  }

  async clickAddScriptToPackageButton() {
    await this.addScriptToPackageBtn.click();
  }

  async clickAddStylesheetToPackageButton() {
    await this.addStylesheetToPackageBtn.click();
  }

  // Downloads the package and converts it to a string
  async downloadPackage(packageId: string) {
    const responsePromise = this.page.waitForResponse(umbracoConfig.environment.baseUrl + '/umbraco/management/api/v1/package/created/' + packageId + '/download');
    await this.downloadPackageBtn.click();
    const response = await responsePromise;
    const body = await response.body();
    return body.toString().trim();
  }
}