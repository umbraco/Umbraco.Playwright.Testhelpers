import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {umbracoConfig} from "../../umbraco.config";

export class ContentRenderUiHelper extends UiBaseLocators {
  private readonly contentRenderValue: Locator;

  constructor(page: Page) {
    super(page);
    this.contentRenderValue = page.locator('[data-mark="content-render-value"]');
  }

  async navigateToRenderedContentPage(contentURL: string) {
    await this.page.goto(umbracoConfig.environment.baseUrl + contentURL);
  }

  async doesContentRenderValueContainText(text: string, isEqual: boolean = false) {
    if (isEqual) {
      return await expect(this.contentRenderValue).toHaveText(text);
    } else {
      return await expect(this.contentRenderValue).toContainText(text);
    }
  }
}