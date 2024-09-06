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
    this.addContentToPackageBtn = page.getByLabel('Add');
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
  }

  async isTextNoPackagesHaveBeenInstalledVisible(isVisible = true) {
    return await expect(this.noPackagesHaveBeenInstalledTxt).toBeVisible({visible: isVisible});
  }

  async clickCreatedTab() {
    await this.createdTabBtn.click();
  }

  async clickInstalledTab() {
    await this.installedTabBtn.click();
  }

  async clickPackagesTab() {
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
  }

  async isPackageNameVisible(packageName: string, isVisible = true) {
    return await expect(this.page.getByRole('button', {name: packageName})).toBeVisible({visible: isVisible});
  }

  async clickExistingPackageName(packageName: string) {
    await this.page.getByRole('button', {name: packageName}).click();
  }

  async clickDeleteButtonForPackageName(packageName: string) {
    await this.page.locator('uui-ref-node-package', {hasText: packageName}).getByLabel('Delete package').click();
  }

  async clickSaveChangesToPackageButton() {
    await this.saveChangesToPackageBtn.click();
  }

  async clickAddContentToPackageButton() {
    await this.addContentToPackageBtn.click();
  }

  async clickAddMediaToPackageButton() {
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