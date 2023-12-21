import {expect, Page} from "@playwright/test"
import {StylesheetUiHelper} from "./StylesheetUiHelper";
import {umbracoConfig} from "../../umbraco.config";
import {PartialViewUiHelper} from "./PartialViewUiHelper";
import {ScriptUiHelper} from "./ScriptUiHelper";
import {TemplateUiHelper} from "./TemplateUiHelper";
import {DictionaryUiHelper} from "./DictionaryUiHelper";
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class UiHelpers {
  page: Page;
  stylesheet: StylesheetUiHelper;
  partialView: PartialViewUiHelper;
  dictionary: DictionaryUiHelper;
  script: ScriptUiHelper;
  template: TemplateUiHelper;
  uiBaseLocators: UiBaseLocators;

  constructor(page: Page) {
    this.page = page;
    this.stylesheet = new StylesheetUiHelper(this.page);
    this.partialView = new PartialViewUiHelper(this.page);
    this.script = new ScriptUiHelper(this.page);
    this.template = new TemplateUiHelper(this.page);
    this.dictionary = new DictionaryUiHelper(this.page)
    this.uiBaseLocators = new UiBaseLocators(this.page);
  }

  async goToSettingsTreeItem(settingsTreeItemName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.page.getByLabel(settingsTreeItemName).click();
  }

  async goToSection(sectionName: string) {
    for (let section in ConstantHelper.sections) {
      await expect(this.page.getByRole('tab', {name: section})).toBeVisible();
    }
    await this.page.getByRole('tab', {name: sectionName}).click();
  }

  async clickDataElement(elementName: string, options: any = null) {
    await this.page.click(`[data-element="${elementName}"]`, options);
  }

  async getDataElement(elementName: string) {
    return this.page.locator(`[data-element="${elementName}"]`);
  }

  async isSuccessNotificationVisible() {
    return await expect(this.page.locator('uui-toast-notification >> [color="positive"]')).toBeVisible();
  }

  async isErrorNotificationVisible() {
    return await expect(this.page.locator('uui-toast-notification >> [color="danger"]')).toBeVisible();
  }

  async goToBackOffice() {
    await this.page.goto(umbracoConfig.environment.baseUrl + '/umbraco');
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async reloadPage() {
    await this.page.reload();
  }
}