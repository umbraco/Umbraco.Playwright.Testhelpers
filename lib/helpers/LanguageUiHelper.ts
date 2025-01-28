import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import { ConstantHelper } from "./ConstantHelper";

export class LanguageUiHelper extends UiBaseLocators{
  private readonly languagesMenu: Locator;
  private readonly languageDropdown: Locator;
  private readonly defaultLanguageToggle: Locator;
  private readonly mandatoryLanguageToggle: Locator;
  private readonly addFallbackLanguageBtn: Locator;
  private readonly languageTable: Locator;

  constructor(page: Page) {
    super(page);
    this.languagesMenu = page.locator('umb-menu').getByLabel('Languages');
    this.languageDropdown = page.locator('umb-input-culture-select #expand-symbol-wrapper');
    this.defaultLanguageToggle = page.locator('uui-toggle').filter({ hasText: /Default language/ }).locator('#slider');
    this.mandatoryLanguageToggle = page.locator('uui-toggle').filter({ hasText: /Mandatory language/ }).locator('#slider');
    this.addFallbackLanguageBtn = page.locator('#add-button');
    this.languageTable = page.locator('umb-language-table-collection-view');
  }

  async clickLanguagesMenu() {
    await expect(this.languagesMenu).toBeVisible();
    await this.languagesMenu.click();
  }

  async goToLanguages() {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.clickLanguagesMenu();
    await expect(this.createLink).toBeVisible();
  }

  async removeFallbackLanguageByName(name: string) {
    await this.page.locator('uui-ref-node[name="' + name + '"]').getByLabel('Remove').click();
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

  async switchMandatoryLanguageOption() {
    await this.mandatoryLanguageToggle.click();
  }

  async clickAddFallbackLanguageButton() {
    await this.addFallbackLanguageBtn.click();
  }

  async clickRemoveLanguageByName(name: string) {
    await this.page.locator('uui-table-row').filter({has: this.page.getByText(name, {exact: true})}).getByLabel('#actions_delete').click({force:true});
  }

  async removeLanguageByName(name: string) {
    await this.clickRemoveLanguageByName(name);
    await this.clickConfirmToDeleteButton();
  }

  async selectFallbackLanguageByName(name: string) {
    await this.page.locator('umb-language-picker-modal').getByLabel(name).click();
    await this.clickSubmitButton();
  }
}