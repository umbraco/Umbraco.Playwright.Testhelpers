import {Locator, Page} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class UserUiHelper extends UiBaseLocators{

  private readonly usersTabBtn: Locator;
  private readonly createUserBtn: Locator;
  private readonly nameOfTheUserTxt: Locator;
  private readonly userEmailTxt: Locator;
  private readonly openUserGroupsBtn: Locator;
  private readonly updateNameOfTheUserInputTxt: Locator;
  constructor(page: Page) {
    super(page);
    this.usersTabBtn = page.locator('#views').getByRole('tab', { name: 'Users' })
    this.createUserBtn = page.getByLabel('Create user');
    this.nameOfTheUserTxt = page.getByLabel('name');
    this.userEmailTxt = page.getByLabel('email');
    this.openUserGroupsBtn =  page.locator('#userGroups').getByLabel('open', {exact: true});
    this.updateNameOfTheUserInputTxt = page.locator('#name').locator('#input');
  }

  async clickUsersTabButton() {
    await this.usersTabBtn.click({force: true});
  }
  
  
  async clickCreateUserButton() {
    await this.createUserBtn.click();
  }
  
  async enterNameOfTheUser(name: string) {
    await this.nameOfTheUserTxt.fill(name);
  }
  
  async enterUserEmail(email: string) {
    await this.userEmailTxt.fill(email);
  }
  
  async clickOpenUserGroupsButton() {
    await this.openUserGroupsBtn.click();
    // This wait is necessary to avoid the click on the user group button to be ignored
    await this.page.waitForTimeout(200);
  }
  
  async updateNameOfUser(name: string) {
    await this.updateNameOfTheUserInputTxt.fill(name);
  }
  
  
  
}