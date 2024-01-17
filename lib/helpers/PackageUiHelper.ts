import {expect, Locator, Page,} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {umbracoConfig} from "../../umbraco.config";

export class PackageUiHelper extends UiBaseLocators {
  private readonly createdTabBtn: Locator;
  private readonly marketPlaceIFrame: Locator;
  private readonly installedTabBtn: Locator;
  private readonly noPackagesHaveBeenInstalledTxt: Locator;
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
  private readonly chooseBtn: Locator;

  constructor(page: Page) {
    super(page);
    // Packages
    this.packagesTabBtn = page.locator('#views').getByRole("tab", {name: 'Packages'});
    this.marketPlaceIFrame = page.frameLocator('iframe[title="Umbraco Marketplace"]').locator('umb-market-app');
    // Installed
    this.installedTabBtn = page.getByRole("tab", {name: 'Installed'});
    this.noPackagesHaveBeenInstalledTxt = page.getByText('No packages have been installed');
    // Created
    this.createdTabBtn = page.getByRole("tab", {name: 'Created'});
    this.createPackageBtn = page.getByLabel("Create package");
    this.packageNameTxt = page.getByLabel('Name of the package');
    this.saveChangesToPackageBtn = page.getByLabel('Save changes to package');
    this.addContentToPackageBtn = page.locator('button').filter({hasText: 'Choose'});
    this.addMediaToPackageBtn = page.locator('umb-input-media').getByLabel('open');
    this.addDocumentTypeToPackageBtn = page.locator('umb-input-document-types-picker').getByLabel('open');
    this.addMediaTypeToPackageBtn = page.locator('umb-input-media-types-picker').getByLabel('open');
    this.addLanguageToPackageBtn = page.locator('umb-input-language-picker').getByLabel('open');
    this.addDictionaryToPackageBtn = page.locator('umb-input-dictionary-picker').getByLabel('open');
    this.addDataTypesToPackageBtn = page.locator('umb-data-type-picker').getByLabel('open');
    this.addTemplatesToPackagesBtn = page.locator('umb-template-picker').getByLabel('open');
    this.addPartialViewToPackageBtn = page.locator('umb-partial-views-picker').getByLabel('open');
    this.addScriptToPackageBtn = page.locator('umb-script-picker').getByLabel('open');
    this.addStylesheetToPackageBtn = page.locator('umb-stylesheet-picker').getByLabel('open');
    this.downloadPackageBtn = page.getByLabel('Download package');
    this.chooseBtn = page.locator('umb-tree-picker-modal').getByLabel('Choose');
  }

  async isTextNoPackagesHaveBeenInstalledVisible() {
    return await expect(this.noPackagesHaveBeenInstalledTxt).toBeVisible();
  }

  async clickCreatedTab() {
    await this.createdTabBtn.click({force: true});
  }

  async clickInstalledTab() {
    await this.installedTabBtn.click({force: true});
  }

  async clickPackagesTab() {
    await this.packagesTabBtn.click({force: true});
  }

  async clickChooseBtn() {
    await this.chooseBtn.click();
  }

  async isMarketPlaceIFrameVisible() {
    return await expect(this.marketPlaceIFrame).toBeVisible();
  }

  async clickCreatePackageButton() {
    await this.createPackageBtn.click();
  }

  async enterPackageName(packageName: string) {
    await this.packageNameTxt.clear();
    await this.packageNameTxt.fill(packageName);
  }

  async doesPackageNameExist(packageName: string) {
    return this.page.getByRole('button', {name: packageName});
  }

  async clickExistingPackageName(packageName: string) {
    await this.page.getByRole('button', {name: packageName}).click();
  }

  async clickDeleteButtonForPackageName(packageName: string) {
    await this.page.locator('uui-ref-node-package', {hasText: packageName}).getByLabel('Delete package').click({force: true});
  }

  async clickSaveChangesToPackageButton() {
    await this.saveChangesToPackageBtn.click();
  }

  async clickAddContentToPackageButton() {
    await this.addContentToPackageBtn.click({force: true});
  }

  async clickAddMediaToPackageButton() {
    await this.addMediaToPackageBtn.click({force: true});
  }

  async clickAddDocumentTypeToPackageButton() {
    await this.addDocumentTypeToPackageBtn.click({force: true});
  }

  async clickAddMediaTypeToPackageButton() {
    await this.addMediaTypeToPackageBtn.click({force: true});
  }

  async clickAddLanguageToPackageButton() {
    await this.addLanguageToPackageBtn.click({force: true});
  }

  async clickAddDictionaryToPackageButton() {
    await this.addDictionaryToPackageBtn.click({force: true});
  }

  async clickAddDataTypesToPackageButton() {
    await this.addDataTypesToPackageBtn.click({force: true});
  }

  async clickAddTemplatesToPackageButton() {
    await this.addTemplatesToPackagesBtn.click({force: true});
  }

  async clickAddPartialViewToPackageButton() {
    await this.addPartialViewToPackageBtn.click({force: true});
  }

  async clickAddScriptToPackageButton() {
    await this.addScriptToPackageBtn.click({force: true});
  }

  async clickAddStylesheetToPackageButton() {
    await this.addStylesheetToPackageBtn.click({force: true});
  }

  // Downloads the package and converts it to a string
  async downloadPackage(packageId: string) {
    const responsePromise = this.page.waitForResponse(umbracoConfig.environment.baseUrl + '/umbraco/management/api/v1/package/created/' + packageId + '/download');
    await this.downloadPackageBtn.click({force: true});
    const response = await responsePromise;
    const body = await response.body();
    return body.toString().trim();
  }
}