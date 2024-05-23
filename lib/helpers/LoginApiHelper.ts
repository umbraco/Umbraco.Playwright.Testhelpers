import {ApiHelpers} from "./ApiHelpers";
import {umbracoConfig} from "../../umbraco.config";
import {Page} from "@playwright/test";
import {createHash} from "crypto";

export class LoginApiHelper {
  api: ApiHelpers;
  page: Page;

  constructor(api: ApiHelpers, page: Page) {
    this.api = api;
    this.page = page;
  }

  public async login() {
    const cookie = await this.getCookie();
    const codeVerifier = "12345"; // Just a dummy value we use in tests
    const codeChallenge = await this.createCodeChallenge(codeVerifier);
    const authorizationCode = await this.getAuthorizationCode(codeChallenge, cookie);
    const token = await this.getToken(cookie, codeVerifier, authorizationCode);
    return {cookie, token};
  }

  async getCookie() {
    const response = await this.page.request.post(this.api.baseUrl + '/umbraco/management/api/v1/security/back-office/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: umbracoConfig.user.login,
        password: umbracoConfig.user.password
      },
      ignoreHTTPSErrors: true
    });

    return response.headers()['set-cookie'];
  }

  async createCodeChallenge(codeVerifier: string) {
    return createHash('sha256').update(codeVerifier, 'utf8').digest('base64').replace(/=/g, '').trim();
  }

  async getAuthorizationCode(codeChallenge: string, cookie: string) {
    const response = await this.page.request.get(this.api.baseUrl + '/umbraco/management/api/v1/security/back-office/authorize?client_id=umbraco-back-office&response_type=code&redirect_uri=' + this.api.baseUrl + '/umbraco/oauth_complete&code_challenge_method=S256&code_challenge=' + codeChallenge, {
      headers: {
        Cookie: cookie
      },
      ignoreHTTPSErrors: true,
      maxRedirects: 0
    });

    return response.headers().location.split('code=')[1].split('&')[0];
  }

  async getToken(cookie: string, codeVerifier: string, authorizationCode: string) {
    const response = await this.page.request.post(this.api.baseUrl + '/umbraco/management/api/v1/security/back-office/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookie,
        'Origin': this.api.baseUrl
      },
      form: {
        grant_type: 'authorization_code',
        client_id: 'umbraco-back-office',
        redirect_uri: this.api.baseUrl + '/umbraco/oauth_complete',
        code: authorizationCode,
        code_verifier: codeVerifier
      },
      ignoreHTTPSErrors: true
    });
    
    if (response.status() == 200) {
      console.log('Login successful');
    }
    else {
      console.error('Login failed');
    }
    console.log(await response.json());
    

    
    return await response.json();
  }
}