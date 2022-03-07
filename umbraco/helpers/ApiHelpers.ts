import {test as base, Page, Locator, expect} from "@playwright/test"
import { DocumentTypeApiHelper } from "./DocumentTypeApiHelper";
import {JsonHelper} from './JsonHelper';
import { TemplatesApiHelper } from "./TemplatesApiHelper";
import { umbracoConfig } from "../../umbraco.config";
import { ContentApiHelper } from "./ContentApiHelper";
import { LanguagesApiHelper } from "./LanguagesApiHelper";
import {UserApiHelper} from "./UserApiHelper";
import {UserGroupApiHelper} from "./UserGroupApiHelper";

export class ApiHelpers {
  baseUrl: string = umbracoConfig.environment.baseUrl;
  page: Page;
  documentTypes: DocumentTypeApiHelper;
  templates : TemplatesApiHelper;
  content : ContentApiHelper;
  languages : LanguagesApiHelper;
  users: UserApiHelper;
  userGroups : UserGroupApiHelper

  constructor(page: Page) {
    this.page = page;
    this.documentTypes = new DocumentTypeApiHelper(this);
    this.templates = new TemplatesApiHelper(this);
    this.content = new ContentApiHelper(this);
    this.languages = new LanguagesApiHelper(this);
    this.users = new UserApiHelper(this);
    this.userGroups = new UserGroupApiHelper(this);
  }

  async getCsrfToken() {
    return (await this.page.context().cookies()).filter(x => x.name === 'UMB-XSRF-TOKEN')[0].value;
  }

  async get(url: string) {
    const csrf = await this.getCsrfToken();
    const options = {
      headers: {
          'X-UMB-XSRF-TOKEN': csrf
      },
      ignoreHTTPSErrors: true
    }
    return this.page.request.get(url, options);
  }

  async post(url: string, data?: object) {
    const csrf = await this.getCsrfToken();
    const options = {
      headers: {
          'X-UMB-XSRF-TOKEN': csrf
      },
      data : data,
      ignoreHTTPSErrors: true
    }
    return this.page.request.post(url, options);
  }

    async login(skipCheckTours: boolean = false){
        await this.page.request.post('https://localhost:44331/umbraco/backoffice/UmbracoApi/Authentication/PostLogin', {
            headers: {
              contentType: 'application/json'
            },
            data: {
              username : umbracoConfig.user.login,
              password : umbracoConfig.user.password,
            },
            ignoreHTTPSErrors: true
        });

      if(!skipCheckTours)
      {
        await this.page.goto('https://localhost:44331/umbraco');
        let toursClosed = false;
        let response = await this.get("https://localhost:44331/umbraco/backoffice/UmbracoApi/CurrentUser/GetUserTours");
        const getUserToursBody = await JsonHelper.getBody(response);
        let umbEmailMarketingDisabled = false;
        if (getUserToursBody == null || getUserToursBody.length === 0) {
          // If length == 0, then the user has not disabled any tours => Tours will be shown
          toursClosed = true;
        } else {
          for (const userTourBody of getUserToursBody) {
            if (userTourBody.alias === 'umbEmailMarketing') {
              umbEmailMarketingDisabled = userTourBody.disabled;
            }
            if (userTourBody.disabled !== true) {
              toursClosed = true;
            }
          }
          }
          if (toursClosed || umbEmailMarketingDisabled === false) {
            let tourSteps = await this.page.locator('.umb-tour-step', { timeout: 60000 }); // We now due to the api calls this will be shown, but slow computers can take a while
            await expect(tourSteps).toBeVisible();
            await this.page.click('.umb-tour-step__close');
          }
      }

  }

}

