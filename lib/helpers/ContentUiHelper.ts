import {Page, Locator} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class ContentUiHelper extends UiBaseLocators {
  private readonly contentNameTxt: Locator;
  private readonly saveAndPublishBtn: Locator;
  private readonly actionsBtn: Locator;
  private readonly publishBtn: Locator;
  private readonly unpublishBtn: Locator;
  private readonly actionMenuForContentBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.contentNameTxt = page.locator('#name-input input');
    this.saveAndPublishBtn = page.getByLabel('Save And Publish');
    this.actionsBtn = page.getByLabel('Actions', { exact: true });
    this.publishBtn = page.getByLabel('Publish', { exact: true });
    this.unpublishBtn = page.getByLabel('Unpublish', { exact: true });
    this.actionMenuForContentBtn = page.locator('#header [label="Open actions menu"]');
  }

  async enterContentName(name: string) {
    await this.contentNameTxt.clear();
    await this.contentNameTxt.fill(name);
  }

  async clickSaveAndPublishButton() {
    await this.saveAndPublishBtn.click();
  }

  async clickActionsButton() {
    await this.actionsBtn.click();
  }

  async clickPublishButton() {
    await this.publishBtn.click();
  }

  async clickUnpublishButton() {
    await this.unpublishBtn.click();
  }

  async clickActionMenuForContent() {
    await this.actionMenuForContentBtn.click();
  }
}
