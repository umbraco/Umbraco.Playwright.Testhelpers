import {test as base, Page, Locator} from "@playwright/test"

class ApiHelpers {
    page;
    constructor (page : Page){
        this.page = page;
    }

    async getCsrfToken() {
        return (await this.page.context().cookies).filter(x => x.name === 'UMB-XSRF-TOKEN')[0].value;
    }

    async get(url: string) {
        const csrf = await this.getCsrfToken();
        const options = {
            headers: {
                'X-UMB-XSRF-TOKEN': csrf
            }
        }
        return this.page.request.get(url, options);
    }

    async post(url: string, data?: object) {
        const csrf = await this.getCsrfToken();
        const options = {
            headers: {
                'X-UMB-XSRF-TOKEN': csrf
            },
            data : data
        }
        return this.page.request.post(url, options);
    }

    async login(username : string, password: string){
        let response = await this.page.request.post('https://localhost:44331/umbraco/backoffice/UmbracoApi/Authentication/PostLogin', {
            headers: {
              contentType: 'application/json'
            },
            data: {
              username : username,
              password : password,
            },
            ignoreHTTPSErrors: true
        });
    }
}

const test = base.extend<{umbracoApi: ApiHelpers}>({
    umbracoApi : async ({ page }, use) => {
        const umbracoApi = new ApiHelpers(page);
        await use(umbracoApi)
    }
})

export {test, ApiHelpers};