import {expect} from '@playwright/test';
import {test} from '../../../umbraco/helpers';
import {PartialViewMacroBuilder} from "../../../umbraco/builders";

test.describe('Stylesheets', () => {

    const name = "TestStylesheet";
    const fileName = name + ".css";

    test.beforeEach(async ({page, umbracoApi}) => {
        await umbracoApi.login();
    });

    test.afterEach(async ({page, umbracoApi}) => {
        await umbracoApi.stylesheets.ensureNameNotExists(name);
    });

    async function openPartialViewMacroCreatePanel(page, umbracoUi) {
        await umbracoUi.goToSection('settings');
        await umbracoUi.clickElement(umbracoUi.getTreeItem("settings", ["Partial View Macro Files"]), {button: "right"});
        await umbracoUi.clickElement(umbracoUi.getContextMenuAction("action-create"));
    }

    async function cleanup(umbracoApi, name, extension = ".cshtml") {
        const fileName = name + extension;
        await umbracoApi.macros.ensureNameNotExists(name);
        await umbracoApi.partialViews.ensureMacroFileNameNotExists(fileName);
    }

    test('Create new partial view macro', async ({page, umbracoApi, umbracoUi}) => {
        const name = "TestPartialViewMacro";

        await cleanup(umbracoApi, name);

        await openPartialViewMacroCreatePanel(page, umbracoUi);

        await page.locator('.menu-label localize[key="create_newPartialViewMacro"]').click();

        //Type name
        await umbracoUi.setEditorHeaderName(name);

        //Save
        await page.locator('.btn-success').click();

        //Assert
        await umbracoUi.isSuccessNotificationVisible();
        // cy.umbracoMacroExists(name).then(exists => { expect(exists).to.be.true; });

        //Clean up
        await cleanup(umbracoApi, name);
    });
});
