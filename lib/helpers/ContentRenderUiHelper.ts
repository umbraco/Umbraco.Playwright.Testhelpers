import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {umbracoConfig} from "../../umbraco.config";

export class ContentRenderUiHelper extends UiBaseLocators {
  private readonly contentRenderValue: Locator;

  constructor(page: Page) {
    super(page);
    this.contentRenderValue = page.locator('[data-mark="content-render-value"]');
  }

  async goToContentRenderPage(contentURL: string) {
    await this.page.goto(umbracoConfig.environment.baseUrl + contentURL);
  }

  async doesContentRenderValueHaveText(text: string) {
    return await expect(this.contentRenderValue).toHaveText(text);
  }
}