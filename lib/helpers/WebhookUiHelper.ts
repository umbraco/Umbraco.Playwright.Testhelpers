import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class WebhookUiHelper extends UiBaseLocators {
  private readonly webhookCreateBtn: Locator;
  private readonly webhookNameTxt: Locator;
  private readonly urlTxt: Locator;
  private readonly chooseEventBtn: Locator;
  private readonly chooseContentTypeBtn: Locator;
  private readonly enabledToggle: Locator;
  private readonly addHeadersBtn: Locator;
  private readonly headerNameTxt: Locator;
  private readonly headerValueTxt: Locator;
  private readonly deleteWebhookEntityAction: Locator;
  private readonly headerRemoveBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.webhookCreateBtn = page.getByTestId('collection-action:Umb.CollectionAction.Webhook.Create');
    this.webhookNameTxt = page.locator('#name #input');
    this.urlTxt = page.locator('umb-property-layout[label="URL"] #input');
    this.chooseEventBtn = page.locator('umb-property-layout[label="Events"]').getByLabel('Choose');
    this.chooseContentTypeBtn = page.locator('umb-property-layout[label="Content Type"]').getByLabel('Choose');
    this.enabledToggle = page.locator('umb-property-layout[label="Enabled"] #toggle');
    this.addHeadersBtn = page.locator('umb-property-layout[label="Headers"] #add');
    this.headerNameTxt = page.locator('umb-input-webhook-headers').locator('[list="nameList"]');
    this.headerValueTxt = page.locator('umb-input-webhook-headers').locator('[list="valueList"]');
    this.deleteWebhookEntityAction = page.getByTestId('entity-action:Umb.EntityAction.Webhook.Delete');
    this.headerRemoveBtn = page.locator('umb-input-webhook-headers').locator('[label="Remove"]');
  }

  async goToWebhooks() {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.goToSettingsTreeItem('Webhooks');
  }

  async goToWebhookWithName(name: string) {
    await this.goToWebhooks();
    await this.clickTextButtonWithName(name);
  }

  async clickWebhookCreateButton() {
    await expect(this.webhookCreateBtn).toBeVisible();
    await this.webhookCreateBtn.click();
  }

  async enterWebhookName(name: string) {
    await expect(this.webhookNameTxt).toBeVisible();
    await this.webhookNameTxt.clear();
    await this.webhookNameTxt.fill(name)
  }

  async enterUrl(url: string) {
    await expect(this.urlTxt).toBeVisible();
    await this.urlTxt.clear();
    await this.urlTxt.fill(url);
  }

  async clickChooseEventButton() {
    await expect(this.chooseEventBtn).toBeVisible();
    await this.chooseEventBtn.click();
  }

  async clickChooseContentTypeButton() {
    await expect(this.chooseContentTypeBtn).toBeVisible();
    await this.chooseContentTypeBtn.click();
  }

  async clickEnabledToggleButton() {
    await expect(this.enabledToggle).toBeVisible();
    await this.enabledToggle.click();
  }

  async clickAddHeadersButton() {
    await expect(this.addHeadersBtn).toBeVisible();
    await this.addHeadersBtn.click();
  }

  async enterHeaderName(name: string) {
    await expect(this.headerNameTxt).toBeVisible();
    await this.headerNameTxt.clear();
    await this.headerNameTxt.fill(name);
  }

  async enterHeaderValue(value: string) {
    await expect(this.headerValueTxt).toBeVisible();
    await this.headerValueTxt.clear();
    await this.headerValueTxt.fill(value);
  }

  async clickDeleteWebhookWithName(name: string) {
    const deleteLocator = this.page.locator('uui-table-row').filter({has: this.page.getByText(name, {exact: true})}).locator(this.deleteWebhookEntityAction);
    await expect(deleteLocator).toBeVisible();
    await deleteLocator.click();
  }

  async clickHeaderRemoveButton() {
    await expect(this.headerRemoveBtn).toBeVisible();
    await this.headerRemoveBtn.click();
  }
}