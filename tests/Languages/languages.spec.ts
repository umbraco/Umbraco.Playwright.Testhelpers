import { test, ApiHelpers, UiHelpers } from '../../umbraco/helpers';

test.describe('feature foo', () => {
  test.beforeEach(async ({ page, umbracoApi }) => {
    await umbracoApi.login();
  });

  test('Can add language', async ({ page, umbracoApi, umbracoUi }) => {
    // For some reason the languages to chose fom seems to be translated differently than normal, as an example:
    // My system is set to EN (US), but most languages are translated into Danish for some reason
    // Aghem seems untranslated though?
    const name = "Aghem"; // Must be an option in the select box

    await umbracoApi.languages.EnsureNameNotExists(name);
    
    await umbracoUi.goToSection("settings");
    
    await umbracoUi.clickElement(umbracoUi.getTreeItem("settings", ["Languages"]));
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey("languages_addLanguage"));
    
    await page.locator('select[name="newLang"]').selectOption({label: name});
    await page.locator('.btn-success').click();
    
    await umbracoUi.isSuccessNotificationVisible();
    
    await umbracoApi.languages.EnsureNameNotExists(name);
  });
});
