import {test as base} from "@playwright/test"
import {ApiHelpers, UiHelpers} from ".";
import {umbracoConfig} from "../../umbraco.config";

const test = base.extend<{ umbracoApi: ApiHelpers } & { umbracoUi: UiHelpers }>({
  umbracoApi: async ({page}, use) => {
    const umbracoApi = new ApiHelpers(page);
    // Runs the isAccessTokenValid before each implementation of umbracoApi in our tests (Which is every single one)
    // await umbracoApi.isAccessTokenValid();
    // TODO: use isAccessTokenValid in the tests, currently it is a bit flaky. So now we refresh the token after each test
    await umbracoApi.refreshAccessToken(umbracoConfig.user.login, umbracoConfig.user.password);
    await use(umbracoApi);
  },

  umbracoUi: async ({page}, use) => {
    const umbracoApi = new UiHelpers(page);
    await use(umbracoApi);
  }
})

test.beforeEach(async () => {
  await new Promise((res) => setTimeout(res, 300)); // Add delay before each test to avoid DB lock
});

test.afterEach(async ({ context }) => {
  // Force kill context 
  for (const page of context.pages()) {
    if (!page.isClosed()) {
      await page.close();
    }
  }
  try {
    await context.close();
  } catch (e) {
    console.warn('Context close error:', e);
  }

  await new Promise((res) => setTimeout(res, 500)); // Add delay before each test to avoid DB lock
});

export {test};