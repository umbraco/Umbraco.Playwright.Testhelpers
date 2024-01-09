import {Page,} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class PackageUiHelper extends UiBaseLocators{

  constructor(page: Page) {
    super(page);
    
  }
  
}