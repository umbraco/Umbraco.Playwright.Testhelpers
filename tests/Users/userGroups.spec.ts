import { expect, Page } from '@playwright/test';
import { test, ApiHelpers, UiHelpers, AliasHelper } from '../../umbraco/helpers';
import { UserGroupBuilder } from '../../umbraco/builders/'

test.describe('Tabs', () => {
  
  async function navigateToUserGroups(umbracoUi : UiHelpers, page : Page) {
    await umbracoUi.goToSection('users');
    await page.locator('[data-element="sub-view-userGroups"]').click();
  }

  test.beforeEach(async ({ umbracoApi }) => {
    await umbracoApi.login();
  });

  test('Create user group', async ({umbracoUi, umbracoApi, page}) => {
    const name = "Test Group";

    umbracoApi.umbracoEnsureUserGroupNameNotExists(name);

    await navigateToUserGroups(umbracoUi, page);
    await umbracoUi.getButtonByLabelKey("actions_createGroup").click();

    //Type name
    cy.umbracoEditorHeaderName(name);

    // Assign sections
    cy.get('.umb-box:nth-child(1) .umb-property:nth-child(1) localize').click();
    cy.get('.umb-tree-item__inner').click({multiple:true, timeout: 10000});
    cy.get('.btn-success').last().click();

    // Save
    cy.get('.btn-success').click();

    //Assert
    cy.umbracoSuccessNotification().should('be.visible');

    //Clean up
    cy.umbracoEnsureUserGroupNameNotExists(name);
  });
});