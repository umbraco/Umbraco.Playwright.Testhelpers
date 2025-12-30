import {Page, Locator} from "@playwright/test";
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
  private readonly loadingSpinner: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBtn = page.locator('uui-tab').filter({hasText: 'Search'}).locator('svg');
    this.searchLogsTxt = page.getByPlaceholder('Search logs...');
    this.selectLogLevelBtn = page.getByLabel('Select log levels');
    this.saveSearchHeartIcon = page.getByLabel("Save search");
    this.searchNameTxt = page.getByLabel("Search name");
    this.saveSearchBtn = page.locator('uui-dialog-layout').getByLabel("Save search");
    this.overviewBtn = page.getByRole('tab', {name: 'Overview'});
    this.sortLogByTimestampBtn = page.getByLabel('Sort logs');
    this.firstLogLevelTimestamp = page.locator('umb-log-viewer-message #timestamp').first();
    this.firstLogLevelMessage = page.locator('umb-log-viewer-message #message').first();
    this.firstLogSearchResult = page.getByRole('group').locator('#message').first();
    this.savedSearchesBtn = page.getByLabel('Saved searches');
    this.loadingSpinner = page.locator('#empty uui-loader-circle');
  }

  async clickSearchButton() {
    await this.click(this.searchBtn);
    await this.isVisible(this.searchLogsTxt);
  }

  async clickOverviewButton() {
    await this.click(this.overviewBtn);
  }

  async enterSearchKeyword(keyword: string) {
    await this.enterText(this.searchLogsTxt, keyword);
  }

  async selectLogLevel(level: string) {
    await this.isVisible(this.selectLogLevelBtn);
    // The force click is necessary.
    await this.selectLogLevelBtn.click({force: true});
    const logLevelLocator = this.page.locator('.log-level-menu-item').getByText(level);
    await this.isVisible(logLevelLocator);
    await logLevelLocator.click({force: true});
  }

  async doesLogLevelIndicatorDisplay(level: string) {
    return await this.isVisible(this.page.locator('.log-level-button-indicator', {hasText: level}));
  }

  async doesLogLevelCountMatch(level: string, expectedNumber: number) {
    return await this.hasCount(this.page.locator('umb-log-viewer-message').locator('umb-log-viewer-level-tag', {hasText: level}), expectedNumber);
  }

  async saveSearch(searchName: string) {
    await this.isVisible(this.saveSearchHeartIcon);
    // The force click is necessary.
    await this.saveSearchHeartIcon.click({force: true});
    await this.enterText(this.searchNameTxt, searchName);
    await this.saveSearchBtn.click();
  }

  checkSavedSearch(searchName: string) {
    return this.page.locator('#saved-searches').getByLabel(searchName, {exact: true});
  }

  async clickSortLogByTimestampButton() {
    await this.sortLogByTimestampBtn.click();
  }

  async doesFirstLogHaveTimestamp(timestamp: string) {
    return await this.containsText(this.firstLogLevelTimestamp, timestamp);
  }

  async clickPageNumber(pageNumber: number) {
    await this.page.getByLabel('Go to page ' + pageNumber, {exact: true}).click();
  }

  async doesFirstLogHaveMessage(message: string) {
    await this.containsText(this.firstLogLevelMessage, message, 10000);
  }

  async clickSavedSearchByName(name: string) {
    await this.click(this.page.locator('#saved-searches').getByLabel(name));
  }

  async doesSearchBoxHaveValue(searchValue: string) {
    await this.hasValue(this.page.getByPlaceholder('Search logs...'), searchValue);
  }

  async clickFirstLogSearchResult() {
    await this.firstLogSearchResult.click();
  }

  async doesDetailedLogHaveText(text: string) {
    await this.isVisible(this.page.locator('details[open] .property-value').getByText(text));
  }

  async clickSavedSearchesButton() {
    await this.isVisible(this.savedSearchesBtn);
    // The force click is necessary.
    await this.savedSearchesBtn.click({force: true});
  }

  async removeSavedSearchByName(name: string) {
    const removedSavedSearchWithNameLocator = this.page.locator('li').filter({hasText: name}).getByLabel('Remove saved search');
    await this.isVisible(removedSavedSearchWithNameLocator);
    // The force click is necessary.
    await removedSavedSearchWithNameLocator.click({force: true});
  }

  async waitUntilLoadingSpinnerInvisible() {
    await this.hasCount(this.loadingSpinner, 0);
  }
}
