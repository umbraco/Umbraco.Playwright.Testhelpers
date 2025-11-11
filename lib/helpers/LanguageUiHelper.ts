import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class LanguageUiHelper extends UiBaseLocators {
  private readonly languagesMenu: Locator;
  private readonly languageDropdown: Locator;
  private readonly defaultLanguageToggle: Locator;
  private readonly mandatoryLanguageToggle: Locator;
  private readonly addFallbackLanguageBtn: Locator;
  private readonly languageTable: Locator;
  private readonly deleteLanguageEntityAction: Locator;
  private readonly languageCreateBtn: Locator;
  private readonly settingsSidebar: Locator;

  constructor(page: Page) {
    super(page);
    this.settingsSidebar = page.getByTestId('section-sidebar:Umb.SectionSidebarMenu.Settings');
    this.languagesMenu = this.settingsSidebar.getByRole('link', {name: 'Languages'});
    this.languageDropdown = page.locator('umb-input-culture-select #expand-symbol-wrapper');
    this.defaultLanguageToggle = page.locator('uui-toggle').filter({hasText: /Default language/}).locator('#toggle');
    this.mandatoryLanguageToggle = page.locator('uui-toggle').filter({hasText: /Mandatory language/}).locator('#toggle');
    this.addFallbackLanguageBtn = page.locator('#add-button');
    this.languageTable = page.locator('umb-language-table-collection-view');
    this.deleteLanguageEntityAction = page.getByTestId('entity-action:Umb.EntityAction.Language.Delete');
    this.languageCreateBtn = page.getByTestId('collection-action:Umb.CollectionAction.Language.Create');
  }

  async clickLanguageCreateButton() {
    await expect(this.languageCreateBtn).toBeVisible();
    await this.languageCreateBtn.click();
  }

  async clickLanguagesMenu() {
    await expect(this.languagesMenu).toBeVisible();
    await this.languagesMenu.click();
  }

  async goToLanguages() {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.clickLanguagesMenu();
  }

  async waitForLanguageToBeCreated() {
    await this.page.waitForLoadState();
  }

  async waitForLanguageToBeDeleted() {
    await this.page.waitForLoadState();
  }
  
  async removeFallbackLanguageByIsoCode(isoCode: string) {
    await this.page.locator('umb-entity-item-ref[id="' + isoCode + '"]').hover();
    await this.page.locator('umb-entity-item-ref[id="' + isoCode + '"]').getByLabel('Remove').click();
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
    await this.page.locator('uui-table-row').filter({has: this.page.getByText(name, {exact: true})}).locator(this.deleteLanguageEntityAction).click({force: true});
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