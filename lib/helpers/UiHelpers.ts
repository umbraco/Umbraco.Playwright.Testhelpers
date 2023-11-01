import {expect, Page} from "@playwright/test"

export class UiHelpers {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async clickButton(buttonName: string) {
        await this.page.getByRole('button', {name: buttonName}).click();
    }

    async goToSection(sectionName: string) {
        await this.page.getByRole('tab', { name: sectionName }).click();

    }
    
    async goToSettingsTreeItem(settingsTreeItemName: string) {
        await this.goToSection('Settings');
        await this.page.getByLabel(settingsTreeItemName).click();   
    }

    async clickDataElement(elementName: string, options: any = null) {
        await this.page.click(`[data-element="${elementName}"]`, options);
    }

    async getDataElement(elementName: string) {
        return this.page.locator(`[data-element="${elementName}"]`);
    }

    async isNotificationVisible(notificationMessage: string) {
        return expect(this.page.locator('uui-toast-notification', {hasText: notificationMessage})).toBeVisible();
    }
}