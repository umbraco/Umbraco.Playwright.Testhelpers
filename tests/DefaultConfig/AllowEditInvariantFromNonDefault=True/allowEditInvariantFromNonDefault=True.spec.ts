import {AliasHelper, ConstantHelper, test} from '../../../lib';
import {expect} from "@playwright/test";

test.describe('Test for AllowEditInvariantFromNonDefault=False', () => {
    const rootDocTypeName = "TestDocument";
    const languageEn = 'en-US';
    const languageDa = 'da';
    
    test.beforeEach(async ({page, umbracoApi}) => {
        await umbracoApi.login();
        await umbracoApi.content.deleteAllContent();
        await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
        await umbracoApi.languages.ensureCultureNotExists(languageDa);
        await umbracoApi.templates.ensureNameNotExists(rootDocTypeName);
    });

    test.afterEach(async ({page, umbracoApi}) => {
        await umbracoApi.content.deleteAllContent();
        await umbracoApi.documentTypes.ensureNameNotExists(rootDocTypeName);
        await umbracoApi.languages.ensureCultureNotExists(languageDa);
        await umbracoApi.templates.ensureNameNotExists(rootDocTypeName);
    })
    
    test('Has edit button for content when language changed', async ({page, umbracoApi, umbracoUi}) => {
        const alias = AliasHelper.toAlias(rootDocTypeName);
        
        await umbracoApi.languages.createLanguage(languageDa, false, 1);
        await umbracoApi.content.createDocWithCultureVariationWithContent(rootDocTypeName, alias, languageEn, languageDa, "" ,false);

        await umbracoUi.refreshContentTree();
        await page.locator('[data-element="tree-item-' + languageEn + '"]').click();
        await page.locator('.umb-variant-switcher__toggle').click();
        await page.locator('.umb-variant-switcher__name-wrapper', {hasText: "Danish"}).click();

        // Assert
        await expect(await page.locator('.umb-property-editor__lock-overlay')).toBeVisible();

        // Cleaned
    });
    
    test('Update text for both languages in content', async ({page, umbracoApi, umbracoUi}) => {
        const text = "Test"
        const alias = AliasHelper.toAlias(rootDocTypeName);

        await umbracoApi.languages.createLanguage(languageDa, false, 1);
        await umbracoApi.content.createDocWithCultureVariationWithContent(rootDocTypeName, alias, languageEn, languageDa, "", false);

        await umbracoUi.refreshContentTree();
        await page.locator('[data-element="tree-item-' + languageEn + '"]').click();
        await page.locator('[label-key="general_edit"]').click();
        await page.locator('[name="textbox"]').type(text);
        await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.save));
        await page.locator('[alias="overlaySubmit"]').click();

        // Assert
        await expect(await page.locator('[name="textbox"]')).toHaveValue(text);
        await page.locator('.umb-variant-switcher__toggle').click();
        await page.locator('.umb-variant-switcher__name-wrapper', {hasText: "Danish"}).click();
        await expect(await page.locator('[name="textbox"]')).toHaveValue(text);

        // Cleaned
    });

    test('publish two languages with the same content', async ({page, umbracoApi, umbracoUi}) => {
        const text = "Test";
        const alias = AliasHelper.toAlias(rootDocTypeName);

        await umbracoApi.languages.createLanguage(languageDa, false, 1);
        await umbracoApi.content.createDocWithCultureVariationWithContent(rootDocTypeName, alias, languageEn, languageDa, text, false);

        await umbracoUi.refreshContentTree();
        await page.locator('[data-element="tree-item-' + languageEn + '"]').click();
        await page.locator('[label-key="buttons_morePublishingOptions"]').click();
        await page.locator('.umb-list-item', {hasText: "Danish"}).locator('.umb-form-check__check').click();
        await page.locator('[alias="overlaySubmit"]').click();

        // Assert
        await expect(page.locator('.umb-notifications__notifications > .alert-success', {hasText: "English"})).toBeVisible();
        await expect(page.locator('.umb-notifications__notifications > .alert-success', {hasText: "Danish"})).toBeVisible();

        // Cleaned
    });

    test('Check if content is published on domain', async ({page, umbracoApi, umbracoUi}) => {
        const text = "USA"
        const updatedText = "DENMARK";
        const alias = AliasHelper.toAlias(rootDocTypeName);

        await umbracoApi.languages.createLanguage(languageDa, false, 1);
        await umbracoApi.content.createDocWithCultureVariationWithContent(rootDocTypeName, alias, languageEn, languageDa, text, true);
        await umbracoApi.templates.edit(rootDocTypeName, `@inherits Umbraco.Cms.Web.Common.Views.UmbracoViewPage
        @{
            Layout = null;
        }
        @{
            if (Model.HasValue("title")){
                @(Model.Value("title"))
            }
        } `
        );
        const contentId = await umbracoApi.content.getContentId(languageEn);
        const langId = await umbracoApi.languages.getLanguageId(languageDa);
        await umbracoApi.domain.createDomain(contentId,langId);

        await umbracoUi.refreshContentTree();
        await page.locator('[data-element="tree-item-' + languageEn + '"]').click();
        await page.locator('[data-element="tree-item-' + languageEn + '"]').click();
        await page.locator('.umb-variant-switcher__toggle').click();
        await page.locator('.umb-variant-switcher__name-wrapper', {hasText: "Danish"}).click();
        await page.locator('[label-key="general_edit"]').click();
        await page.locator('[name="textbox"]').fill(updatedText);
        await page.locator('[label-key="buttons_morePublishingOptions"]').click();
        await page.locator('[alias="overlaySubmit"]').click();

        // Assert
        await page.waitForTimeout(500);
        await expect(await umbracoApi.content.verifyRenderedContent('/', updatedText, true)).toBeTruthy();

        // Cleaned
    });
});