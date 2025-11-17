import {test as base} from "@playwright/test"
import {ApiHelpers, UiHelpers} from ".";
import {umbracoConfig} from "../../umbraco.config";
import {ConsoleErrorHelper} from "./ConsoleErrorHelper";

const test = base.extend<{ umbracoApi: ApiHelpers } & { umbracoUi: UiHelpers }>({
  umbracoApi: async ({page}, use) => {
    const umbracoApi = new ApiHelpers(page);
    // Runs the isAccessTokenValid before each implementation of umbracoApi in our tests (Which is every single one)
    // await umbracoApi.isAccessTokenValid();
    // TODO: use isAccessTokenValid in the tests, currently it is a bit flaky. So now we refresh the token after each test
    await umbracoApi.refreshLoginState(umbracoConfig.user.login, umbracoConfig.user.password);
    await use(umbracoApi);
  },

  umbracoUi: async ({page}, use) => {
    const umbracoUi = new UiHelpers(page);
    const consoleErrorHelper = new ConsoleErrorHelper();

    // Listen for all console events and handle errors
    page.on('console', message => {
      if (message.type() === 'error') {
        const errorMessage = message.text();
        const testTitle = test.info().title;
        const testLocation = test.info().titlePath[0];
        let errorMessageJson = consoleErrorHelper.updateConsoleErrorTextToJson(errorMessage, testTitle, testLocation);
        consoleErrorHelper.writeConsoleErrorToFile(errorMessageJson);
      }
    });

    await use(umbracoUi);
  }
})

export {test};