import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class ExamineManagementUiHelper extends UiBaseLocators {
  private readonly examineManagementTab: Locator;
  private readonly indexersContent: Locator;
  private readonly indexerItems: Locator;

  constructor(page: Page) {
    super(page);
    this.examineManagementTab = page.getByRole('tab', {name: 'Examine Management'});
    this.indexersContent = page.locator('[headline="Indexers"]');
    this.indexerItems = this.indexersContent.locator('uui-table-cell a');
  }

  async clickExamineManagementTab() {
    await this.examineManagementTab.click();
  }

  async doesIndexersHaveText(text: string) {
    return await expect(this.indexersContent).toContainText(text, {timeout: 10000});
  }

  checkIndexersCount() {
    return this.indexerItems.count();
  }

  async clickIndexByName(indexName: string) {
    await this.page.getByRole('link', { name: indexName }).click();
  }

  async doesIndexPropertyHaveValue(indexProperty: string, indexValue: string) {
    return expect(this.page.locator('uui-table-row').filter({has: this.page.getByText(indexProperty)}).getByRole('cell').last()).toHaveText(indexValue, {timeout: 10000});
  }

  async doesIndexHaveHealthStatus(indexName: string, status: string) {
    return expect(this.page.locator("[headline='" + indexName + "']").getByText(status)).toBeVisible({timeout: 10000});
  }
}
