import {test as base} from "@playwright/test"
import {ApiHelpers, UiHelpers} from ".";

const test = base.extend<{ umbracoApi: ApiHelpers } & { umbracoUi: UiHelpers }>({
  umbracoApi: async ({page}, use) => {
    const umbracoApi = new ApiHelpers(page);
    // Runs the isAccessTokenValid before each implementation of umbracoApi in our tests (Which is every single one)
    // await umbracoApi.isAccessTokenValid();
    // TODO: Find a better solution, currently the refresh ends up as 'The specified refresh token is no longer valid' which resulted in failure when we were trying to refresh the token. There seems to be no issues with the refresh token in the UI. So we will need to investigate further.
    // TODO: Remove the line below when we have a better solution
    await umbracoApi.refreshAccessToken();
    await use(umbracoApi);
  },

  umbracoUi: async ({page}, use) => {
    const umbracoApi = new UiHelpers(page);
    await use(umbracoApi);
  }
})

export {test};