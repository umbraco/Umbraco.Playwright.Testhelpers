import {ConstantHelper, test} from '../../umbraco/helpers';

test.describe('Packages', () => {

  test.beforeEach(async ({page, umbracoApi}) => {
    await umbracoApi.login();
  });

  test('Create member group', async ({page, umbracoApi, umbracoUi}) => {
    const name = "Test Group";
    await umbracoApi.memberGroups.ensureNameNotExists(name);
    await umbracoUi.goToSection('member');

    await umbracoUi.clickElement(umbracoUi.getTreeItem("member", ["Member Groups"]), { button: "right"});
    await umbracoUi.clickElement(umbracoUi.getContextMenuAction(ConstantHelper.actions.create));
    await umbracoUi.setEditorHeaderName(name)
    await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.save));
    
    // Assert
    await umbracoUi.isSuccessNotificationVisible();
    
    // Clean up
    await umbracoApi.memberGroups.ensureNameNotExists(name);
  });
});