import {Page, Locator} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {umbracoConfig} from "../../umbraco.config";

export class ContentRenderUiHelper extends UiBaseLocators {
  private readonly contentRenderValue: Locator;

  constructor(page: Page) {
    super(page);
    this.contentRenderValue = page.getByTestId('content-render-value');
  }

  async navigateToRenderedContentPage(contentURL: string) {
    await this.page.goto(umbracoConfig.environment.baseUrl + contentURL);
  }

  async doesContentRenderValueContainText(text: string, isEqual: boolean = false) {
    if (isEqual) {
      return await this.hasText(this.contentRenderValue, text);
    } else {
      return await this.containsText(this.contentRenderValue, text);
    }
  }

  async doesContentRenderValueHaveImage(src: string, width: number, height: number) {
    const imageSrc = src + '?width=' + width.toString() + '&height=' + height.toString();
    return await this.hasAttribute(this.contentRenderValue.locator('img'), 'src', imageSrc);
  }

  async doesContentRenderValueHaveLink(linkSrc: string) {
    return await this.hasAttribute(this.contentRenderValue.locator('a'), 'href', linkSrc);
  }
}