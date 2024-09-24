﻿import {ApiHelpers} from "./ApiHelpers";
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
    console.log('Attempting login...');
    const codeVerifier = "12345"; // A static state value for testing
    const codeChallenge = await this.createCodeChallenge(codeVerifier);
    const stateValue = 'myStateValue'; // A static state value for testing
    const cookie = await this.getCookie();
    const authorizationCode = await this.getAuthorizationCode(codeChallenge, cookie, stateValue);
    const refreshToken = await this.getRefreshToken(cookie, codeVerifier, authorizationCode);
    const accessToken = await this.getAccessToken(cookie, refreshToken.refresh_token);
    return {cookie, accessToken};
  }

  async getCookie() {
    const response = await this.page.request.post(this.api.baseUrl + '/umbraco/management/api/v1/security/back-office/login', {
      headers: {
        'Content-Type': 'application/json',
        Referer: this.api.baseUrl,
        Origin: this.api.baseUrl,
      },
      data: {
        username: umbracoConfig.user.login,
        password: umbracoConfig.user.password
      },
      ignoreHTTPSErrors: true
    });

    // Ensure the cookie is properly captured
    return response.headers()['set-cookie'];
  }

  async createCodeChallenge(codeVerifier: string) {
    return createHash('sha256').update(codeVerifier, 'utf8').digest('base64').replace(/=/g, '').trim();
  }

  async getAuthorizationCode(codeChallenge: string, cookie: string, stateValue: string) {
    const authorizationUrl = `${this.api.baseUrl}/umbraco/management/api/v1/security/back-office/authorize?client_id=umbraco-back-office&response_type=code&redirect_uri=${encodeURIComponent(this.api.baseUrl + '/umbraco/oauth_complete')}&code_challenge_method=S256&code_challenge=${codeChallenge}&state=${stateValue}&scope=offline_access&prompt=consent&access_type=offline`;
    const response = await this.page.request.get(authorizationUrl, {
      headers: {
        Cookie: cookie,
        Referer: this.api.baseUrl,
      },
      ignoreHTTPSErrors: true,
      maxRedirects: 0
    });

    // Parse the authorization code from the redirect URL
    const locationHeader = response.headers()['location'];
    if (!locationHeader) {
      throw new Error('Authorization redirect location not found');
    }
    // Extract the authorization code from the location header
    return new URLSearchParams(locationHeader.split('?')[1]).get('code');
  }

  async getRefreshToken(cookie: string, codeVerifier: string, authorizationCode) {
    const response = await this.page.request.post(this.api.baseUrl + '/umbraco/management/api/v1/security/back-office/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
        Origin: this.api.baseUrl
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

    if (response.status() !== 200) {
      console.error('Failed to retrieve refresh token');
    }
    return await response.json();
  }

  async getAccessToken(cookie: string, refreshToken: string) {
    const response = await this.page.request.post(this.api.baseUrl + '/umbraco/management/api/v1/security/back-office/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
        Origin: this.api.baseUrl
      },
      form: {
        grant_type: 'refresh_token',
        client_id: 'umbraco-back-office',
        redirect_uri: this.api.baseUrl + '/umbraco/oauth_complete',
        refresh_token: refreshToken,
      },
      ignoreHTTPSErrors: true
    });

    if (response.status() === 200) {
      console.log('Login successful');
    } else {
      console.error('Login failed');
    }
    return await response.json();
  }
}
