import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class LanguageUiHelper extends UiBaseLocators{
  private readonly languageRoot: Locator;
  private readonly languageDropdown: Locator;
  private readonly defaultLanguageToggle: Locator;
  private readonly manatoryLanguageToggle: Locator;
  private readonly addFallbackLanguageBtn: Locator;
  private readonly confirmToRemoveBtn: Locator;
  private readonly languageTable: Locator;

  constructor(page: Page) {
    super(page);
    this.languageRoot = page.locator('umb-menu').getByLabel('Language');
    this.languageDropdown = page.locator('umb-input-culture-select #expand-symbol-wrapper');
    this.defaultLanguageToggle = page.locator('uui-toggle').filter({ hasText: /Default language/ }).locator('#slider');
    this.manatoryLanguageToggle = page.locator('uui-toggle').filter({ hasText: /Mandatory language/ }).locator('#slider');
    this.addFallbackLanguageBtn = page.locator('#add-button');
    this.confirmToRemoveBtn = page.locator("#confirm").getByLabel("Remove");
    this.languageTable = page.locator('umb-language-table-collection-view');
  }

  async clickLanguageRoot() {
    await this.languageRoot.click();
  }

  async removeFallbackLanguageByName(name: string) {
    await this.page.locator('uui-ref-list').getByLabel('Remove ' + name, {exact: true}).click();
    await this.confirmToRemoveBtn.click();
  }

  async chooseLanguageByName(name: string) {
    await this.languageDropdown.click();
    await this.page.locator('umb-input-culture-select').getByText(name, {exact: true}).click();
  }

  async clickLanguageByName(name: string) {
    await this.languageTable.getByText(name, {exact: true}).click();
  }

  async isLanguageNameVisible(name: string, isVisible = true) {
    return await expect(this.languageTable.getByText(name, {exact: true})).toBeVisible({visible: isVisible});
  }
  
  async switchDefaultLanguageOption() {
    await this.defaultLanguageToggle.click();
  }

  async switchManatoryLanguageOption() {
    await this.manatoryLanguageToggle.click();
  }

  async clickAddFallbackLanguageButton() {
    await this.addFallbackLanguageBtn.click();
  }

  async clickRemoveLanguageByName(name: string) {
    await this.page.locator('uui-table-row').filter({has: this.page.getByText(name, {exact: true})}).locator('uui-symbol-more').click();
  }

  async removeLanguageByName(name: string) {
    await this.clickRemoveLanguageByName(name);
    await this.deleteBtn.click();
    await this.confirmToDeleteBtn.click();
  }

  async selectFallbackLanguageByName(name: string) {
    await this.page.locator('umb-language-picker-modal').getByLabel(name).click();
    await this.clickSubmitButton();
  }
}