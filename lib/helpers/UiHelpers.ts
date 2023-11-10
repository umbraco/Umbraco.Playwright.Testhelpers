import {expect, Page} from "@playwright/test"
import {ConstantHelper} from "./ConstantHelper";

export class UiHelpers {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickButton(buttonName: string) {
        await this.page.getByRole('button', {name: buttonName}).click();
    }

    async goToSection(sectionName: string) {
        for (let section in ConstantHelper.sections) {
            await expect(this.page.getByRole('tab', {name: section})).toBeVisible();
        }
        await this.page.getByRole('tab', {name: sectionName}).click();
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

    async isSuccessNotificationVisible() {
        return await expect(this.page.locator('uui-toast-notification >> [color="positive"]')).toBeVisible();
    }

    async isErrorNotificationVisible() {
        return await expect(this.page.locator('uui-toast-notification >> [color="danger"]')).toBeVisible();
    }

    async goToTemplate(templateName: string) {
        await this.goToSection(ConstantHelper.sections.settings);
        await this.page.locator('umb-tree-item', {hasText: 'Templates'}).locator('#caret-button').click();
        await this.page.locator('umb-tree-item').getByLabel(templateName).click();
    }
}