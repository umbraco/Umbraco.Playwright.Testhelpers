import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class LogViewerUiHelper extends UiBaseLocators {
  private readonly searchBtn: Locator;
  private readonly searchLogsTxt: Locator;
  private readonly selectLogLevelBtn: Locator;
  private readonly saveSearchHeartIcon: Locator;
  private readonly searchNameTxt: Locator;
  private readonly saveSearchBtn: Locator;
  private readonly overviewBtn: Locator;
  private readonly sortLogByTimestampBtn: Locator;
  private readonly firstLogLevelTimestamp: Locator;
  private readonly firstLogLevelMessage: Locator;
  private readonly firstLogSearchResult: Locator;
  private readonly savedSearchesBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBtn = page.getByRole('tab', {name: 'Search'});
    this.searchLogsTxt = page.getByPlaceholder('Search logs...');
    this.selectLogLevelBtn = page.getByLabel('Select log levels');
    this.saveSearchHeartIcon = page.getByLabel("Save search");
    this.searchNameTxt = page.getByLabel("Search name");
    this.saveSearchBtn = page.locator('uui-dialog-layout').getByLabel("Save search");
    this.overviewBtn = page.getByRole('tab', {name: 'Overview'});
    this.sortLogByTimestampBtn = page.getByLabel('Sort logs');
    this.firstLogLevelTimestamp = page.locator('umb-log-viewer-message').locator('[id="timestamp"]').first();
    this.firstLogLevelMessage = page.locator('umb-log-viewer-message').locator('[id="message"]').first();
    this.firstLogSearchResult =  page.getByRole('group').locator('#message').first();
    this.savedSearchesBtn = page.getByLabel('Saved searches');
  }

  async clickSearchButton() {
    await this.searchBtn.click({force: true});
  }

  async clickOverviewButton() {
    await this.overviewBtn.click({force: true});
  }

  async enterSearchKeyword(keyword: string) {
    await this.searchLogsTxt.clear();
    await this.searchLogsTxt.fill(keyword);
  }

  async selectLogLevel(level: string) {
    await this.selectLogLevelBtn.click({force: true});
    await this.page.locator('.log-level-menu-item').getByText(level).click({force: true});
  }

  async doesLogLevelIndicatorDisplay(level: string) {
    return await expect(this.page.locator('.log-level-button-indicator', {hasText: level})).toBeVisible();
  }

  async doesLogLevelCountMatch(level: string, expectedNumber: number) {
    return await expect(this.page.locator('umb-log-viewer-message').locator('umb-log-viewer-level-tag', {hasText: level})).toHaveCount(expectedNumber);
  }

  async saveSearch(searchName: string) {
    await this.saveSearchHeartIcon.click({force: true});
    await this.searchNameTxt.clear();
    await this.searchNameTxt.fill(searchName);
    await this.saveSearchBtn.click();
  }

  checkSavedSearch(searchName: string) {
    return this.page.locator('#saved-searches').getByLabel(searchName, {exact: true});
  }

  async clickSortLogByTimestampButton() {
    await this.sortLogByTimestampBtn.click();
  }

  async doesFirstLogHaveTimestamp(timestamp: string) {
    return await expect(this.firstLogLevelTimestamp).toContainText(timestamp);
  }

  async clickPageNumber(pageNumber: number) {
    await this.page.getByLabel('Go to page ' + pageNumber, {exact: true}).click();
  }

  async doesFirstLogHaveMessage(message: string) {
    return await expect(this.firstLogLevelMessage).toContainText(message);
  }

  async clickSavedSearchByName(name: string) {
    await this.page.locator('#saved-searches').getByLabel(name).click();
  }

  async doesSearchBoxHaveValue(searchValue: string) {
    await expect(this.page.getByPlaceholder('Search logs...')).toHaveValue(searchValue);
  }

  async clickFirstLogSearchResult() {
    await this.firstLogSearchResult.click();
  }

  async doesDetailedLogHaveText(text: string) {
    return await expect(this.page.locator('details[open] .property-value').getByText(text)).toBeVisible();
  }

  async clickSavedSearchesButton() {
    await this.savedSearchesBtn.click({force: true});
  }

  async removeSavedSearchByName(name: string) {
    await this.page.locator('li').filter({hasText: name}).getByLabel('Remove saved search').click({force: true});
  }
}
