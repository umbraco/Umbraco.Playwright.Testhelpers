import {Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class UserUiHelper extends UiBaseLocators{

  private readonly usersTabBtn: Locator;
  constructor(page: Page) {
    super(page);
    this.usersTabBtn = page.locator('#views').getByRole('tab', { name: 'Users' })
  }

  async clickUsersTabButton() {
    await this.usersTabBtn.click({force: true});
  }
  
  
}