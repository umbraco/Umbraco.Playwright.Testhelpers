import {expect, Page} from "@playwright/test"
import {ConstantHelper} from "./ConstantHelper";
import {StylesheetUiHelper} from "./StylesheetUiHelper";
import {umbracoConfig} from "../../umbraco.config";
import {PartialViewUiHelper} from "./PartialViewUiHelper";
import {ScriptUiHelper} from "./ScriptUiHelper";
import {TemplateUiHelper} from "./TemplateUiHelper";

export class UiHelpers {

    page: Page;
    stylesheet: StylesheetUiHelper;
    partialView: PartialViewUiHelper;
    script: ScriptUiHelper;
    template: TemplateUiHelper;

    constructor(page: Page) {
        this.page = page;
        this.stylesheet = new StylesheetUiHelper(this.page);
        this.partialView = new PartialViewUiHelper(this.page);
        this.script = new ScriptUiHelper(this.page);
        this.template = new TemplateUiHelper(this.page);
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

    // Will only work for root templates
    async goToTemplate(templateName: string) {
        await this.goToSection(ConstantHelper.sections.settings);
        await this.page.locator('div').filter({hasText: 'Templates'}).locator('#caret-button').click();
        await this.page.getByLabel(templateName).click({force:true});
    }

    // Will only work for root scripts
    async goToScript(scriptName: string) {
        await this.goToSection(ConstantHelper.sections.settings);
        await this.page.locator('div').filter({hasText: 'Scripts'}).locator('#caret-button').click();
        await this.page.getByLabel(scriptName).click({force:true});
    }

    async goToBackOffice() {
        await this.page.goto(umbracoConfig.environment.baseUrl + '/umbraco');
    }

    async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }

    async isTreeItemVisible(name: string) {
        await expect(this.page.locator('umb-tree-item').locator('[label="' + name + '"] ')).toBeVisible();
    }

    async reloadPage() {
        await this.page.reload();
    }
}