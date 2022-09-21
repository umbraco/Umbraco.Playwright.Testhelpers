// import {ConstantHelper, test} from "../../umbraco/helpers";
// import {expect} from "@playwright/test";
// import {ContentBuilder, DocumentTypeBuilder} from "../../umbraco/builders";
//
// // To test, you need to run a smtp4dev server
// test.describe('Smtp', () => {
//
//     test.beforeEach(async ({page, umbracoApi}) => {
//         await umbracoApi.login();
//     });
//
//     test('Invite User', async ({page, umbracoApi, umbracoUi}) => {
//         const name = "John";
//         const email = "JohnDoe@email.com";
//         const message = "You are invited for a test";
//
//         await umbracoApi.users.ensureEmailNotExits(email)
//
//         await umbracoUi.goToSection(ConstantHelper.sections.users);
//
//         await page.locator('.umb-button__content').click();
//
//         await page.locator('[label="@general_name"]').type(name);
//         await page.locator('[type="email"]').type(email);
//         await page.locator('[key="general_add"]').click();
//         await page.locator('.umb-user-group-picker-list-item', {hasText: "Writers"}).click();
//         await page.locator('[label-key="general_submit"]').click();
//        
//         await page.locator('[name="message"]').type(message);
//         await page.locator('[label-key="user_sendInvite"]').click();
//
//         // Needs to wait for a user to be invited while it's loading
//         await page.waitForTimeout(2000);
//
//         // Assert
//         await expect(page.locator('.alert-success')).toBeVisible();
//         await expect(page.locator('.umb-box-content', {hasText: name})).toBeVisible();
//
//         // Clean
//         await umbracoApi.users.ensureEmailNotExits(email);
//     });
// });
