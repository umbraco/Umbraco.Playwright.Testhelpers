﻿import {expect, Locator, Page,} from "@playwright/test"
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

  constructor(page: Page) {
    super(page);
    // Packages
    this.packagesTabBtn = page.locator('#views').getByRole("tab", {name: 'Packages'});
    this.marketPlaceIFrame = page.frameLocator('iframe[title="Umbraco Marketplace"]').locator('umb-market-app');
    // Installed
    this.installedTabBtn = page.getByRole("tab", {name: 'Installed'});
    // Created
    this.propertyLayout = page.locator('umb-property-layout');
    this.createdTabBtn = page.getByRole("tab", {name: 'Created'});
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
  }

  async isUmbracoBackofficePackageVisible(isVisible = true) {
    return await expect(this.page.locator('uui-ref-node-package', {hasText: '@umbraco-cms/backoffice'})).toBeVisible({visible: isVisible});
  }

  async clickCreatedTab() {
    await this.page.waitForTimeout(500);
    await this.createdTabBtn.click({force: true});
    await this.page.waitForTimeout(500);
  }

  async clickInstalledTab() {
    await this.installedTabBtn.click({force: true});
  }

  async clickPackagesTab() {
    await this.packagesTabBtn.click({force: true});
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
    await this.page.locator('uui-ref-node-package', {hasText: packageName}).getByLabel('Delete').click({force: true});
  }

  async clickSaveChangesToPackageButton() {
    await this.saveChangesToPackageBtn.click();
  }

  async clickAddContentToPackageButton() {
    await this.addContentToPackageBtn.click();
  }

  async clickAddMediaToPackageButton() {
    await this.addMediaToPackageBtn.click({force: true});
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