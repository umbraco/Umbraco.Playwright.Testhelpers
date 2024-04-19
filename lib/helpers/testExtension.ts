import {test as base} from "@playwright/test"
import {ApiHelpers, UiHelpers} from ".";

const test = base.extend<{ umbracoApi: ApiHelpers } & { umbracoUi: UiHelpers }>({
  umbracoApi: async ({page}, use) => {
    const umbracoApi = new ApiHelpers(page);
    // Runs the isAccessTokenValid before each implementation of umbracoApi in our tests (Which is every single one)
    await umbracoApi.isAccessTokenValid();
    await use(umbracoApi);
  },

  umbracoUi: async ({page}, use) => {
    const umbracoApi = new UiHelpers(page);
    await use(umbracoApi);
  }
})

export {test};