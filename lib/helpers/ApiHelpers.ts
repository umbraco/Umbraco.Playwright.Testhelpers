import {Page} from "@playwright/test"
import {umbracoConfig} from "../../umbraco.config";
import {ReportHelper} from "./ReportHelper";
import {TelemetryDataApiHelper} from "./TelemetryDataApiHelper";
import {LanguageApiHelper} from "./LanguageApiHelper";
import {DictionaryApiHelper} from "./DictionaryApiHelper";
import {RelationTypeApiHelper} from "./RelationTypeApiHelper";
import {UserGroupApiHelper} from "./UserGroupApiHelper";
import {TemplateApiHelper} from "./TemplateApiHelper";
import {AliasHelper} from "./AliasHelper";
import {DataTypeApiHelper} from "./DataTypeApiHelper";
import {UserApiHelper} from "./UserApiHelper";
import {TemporaryFileApiHelper} from "./TemporaryFileApiHelper";
import {PackageApiHelper} from "./PackageApiHelper";
import {ScriptApiHelper} from "./ScriptApiHelper";
import {PartialViewApiHelper} from "./PartialViewApiHelper";
import {StylesheetApiHelper} from "./StylesheetApiHelper";
import * as fs from "fs";
import {LogViewerApiHelper} from "./LogViewerApiHelper";
import {DocumentTypeApiHelper} from "./DocumentTypeApiHelper";
import {DocumentApiHelper} from "./DocumentApiHelper";
import {MediaTypeApiHelper} from "./MediaTypeApiHelper";
import {MediaApiHelper} from "./MediaApiHelper";
import {ObjectTypesApiHelper} from "./ObjectTypesApiHelper";
import {ModelsBuilderApiHelper} from "./ModelsBuilderApiHelper";
import {HealthCheckApiHelper} from "./HealthCheckApiHelper";
import {IndexerApiHelper} from "./IndexerApiHelper";
import {PublishedCacheApiHelper} from "./PublishedCacheApiHelper";
import {RedirectManagementApiHelper} from './RedirectManagementApiHelper';
import {MemberGroupApiHelper} from './MemberGroupApiHelper';
import {MemberApiHelper} from './MemberApiHelper';
import {MemberTypeApiHelper} from "./MemberTypeApiHelper";
import {DocumentBlueprintApiHelper} from "./DocumentBlueprintApiHelper";
import {LoginApiHelper} from "./LoginApiHelper";
import {WebhookApiHelper} from "./WebhookApiHelper";
import {MediaDeliveryApiHelper} from './differentAppSettingsHelpers/MediaDeliveryApiHelper';
import {ContentDeliveryApiHelper} from "./differentAppSettingsHelpers/ContentDeliveryApiHelper";

export class ApiHelpers {
  baseUrl: string = umbracoConfig.environment.baseUrl;
  page: Page;
  alias: AliasHelper;
  report: ReportHelper;
  telemetry: TelemetryDataApiHelper;
  language: LanguageApiHelper;
  dictionary: DictionaryApiHelper;
  relationType: RelationTypeApiHelper;
  userGroup: UserGroupApiHelper;
  template: TemplateApiHelper;
  dataType: DataTypeApiHelper;
  user: UserApiHelper;
  temporaryFile: TemporaryFileApiHelper;
  documentType: DocumentTypeApiHelper;
  document: DocumentApiHelper;
  package: PackageApiHelper;
  script: ScriptApiHelper;
  partialView: PartialViewApiHelper;
  stylesheet: StylesheetApiHelper;
  logViewer: LogViewerApiHelper;
  mediaType: MediaTypeApiHelper;
  media: MediaApiHelper;
  objectTypes: ObjectTypesApiHelper;
  modelsBuilder: ModelsBuilderApiHelper;
  healthCheck: HealthCheckApiHelper;
  indexer: IndexerApiHelper;
  publishedCache: PublishedCacheApiHelper;
  redirectManagement: RedirectManagementApiHelper;
  memberGroup: MemberGroupApiHelper;
  member: MemberApiHelper;
  memberType: MemberTypeApiHelper;
  documentBlueprint: DocumentBlueprintApiHelper;
  login: LoginApiHelper;
  webhook: WebhookApiHelper;
  mediaDeliveryApi: MediaDeliveryApiHelper;
  contentDeliveryApi: ContentDeliveryApiHelper;

  constructor(page: Page) {
    this.page = page;
    this.alias = new AliasHelper();
    this.report = new ReportHelper(this);
    this.telemetry = new TelemetryDataApiHelper(this);
    this.language = new LanguageApiHelper(this);
    this.dictionary = new DictionaryApiHelper(this);
    this.relationType = new RelationTypeApiHelper(this);
    this.userGroup = new UserGroupApiHelper(this);
    this.template = new TemplateApiHelper(this);
    this.dataType = new DataTypeApiHelper(this);
    this.user = new UserApiHelper(this, page);
    this.temporaryFile = new TemporaryFileApiHelper(this);
    this.documentType = new DocumentTypeApiHelper(this);
    this.document = new DocumentApiHelper(this);
    this.package = new PackageApiHelper(this);
    this.script = new ScriptApiHelper(this);
    this.partialView = new PartialViewApiHelper(this);
    this.stylesheet = new StylesheetApiHelper(this);
    this.logViewer = new LogViewerApiHelper(this);
    this.mediaType = new MediaTypeApiHelper(this);
    this.media = new MediaApiHelper(this);
    this.objectTypes = new ObjectTypesApiHelper(this);
    this.modelsBuilder = new ModelsBuilderApiHelper(this);
    this.healthCheck = new HealthCheckApiHelper(this);
    this.indexer = new IndexerApiHelper(this);
    this.publishedCache = new PublishedCacheApiHelper(this);
    this.redirectManagement = new RedirectManagementApiHelper(this);
    this.memberGroup = new MemberGroupApiHelper(this);
    this.member = new MemberApiHelper(this);
    this.memberType = new MemberTypeApiHelper(this);
    this.documentBlueprint = new DocumentBlueprintApiHelper(this);
    this.login = new LoginApiHelper(this, this.page);
    this.webhook = new WebhookApiHelper(this, this.page);
    this.mediaDeliveryApi = new MediaDeliveryApiHelper(this);
    this.contentDeliveryApi = new ContentDeliveryApiHelper(this);
  }

  async getAccessToken() {
    const authToken = await this.getLocalStorageAuthToken();
    return authToken.access_token;
  }

  async getBearerToken() {
    return 'Bearer ' + await this.getAccessToken();
  }

  async getCookie() {
    let someStorage = await this.page.context().storageState();
    let cookieString = "";
    for (let cookie of someStorage.cookies) {
      cookieString += cookie.name + '=' + cookie.value + ';';
    }
    return cookieString;
  }

  async getHeaders() {
    return {
      'Authorization': await this.readLocalBearerToken(),
      'Cookie': await this.readLocalCookie(),
    }
  }

  async get(url: string, params?: { [key: string]: string | number | boolean; }, extraHeaders?: { [key: string]: string; }) {
    const headers = await this.getHeaders();
    const allHeaders = {...headers, ...extraHeaders};
    const options = {
      headers: allHeaders,
      params: params,
      ignoreHTTPSErrors: true
    }
    return await this.page.request.get(url, options);
  }

  async saveCodeFile(codeFile) {
    if (codeFile == null) {
      return;
    }
    return await this.post(umbracoConfig.environment.baseUrl + '/umbraco/backoffice/UmbracoApi/CodeFile/PostSave', codeFile);
  }

  async post(url: string, data?: object) {
    const options = {
      headers: await this.getHeaders(),
      data: data,
      ignoreHTTPSErrors: true
    }
    return await this.page.request.post(url, options);
  }

  async delete(url: string, data?: object) {
    const options = {
      headers: await this.getHeaders(),
      data: data,
      ignoreHTTPSErrors: true
    }
    return await this.page.request.delete(url, options);
  }

  async put(url: string, data?: object) {
    const options = {
      headers: await this.getHeaders(),
      data: data,
      ignoreHTTPSErrors: true
    }
    return await this.page.request.put(url, options);
  }

  async postMultiPartForm(url: string, id, name: string, mimeType: string, filePath) {
    const options = {
      headers: await this.getHeaders(),
      multipart: {
        Id: id,
        File: {
          name: name,
          mimeType: mimeType,
          buffer: fs.readFileSync(filePath)
        }
      },
      ignoreHTTPSErrors: true
    }
    return await this.page.request.post(url, options);
  }

  // Currently not used
  // private async getTokenIssuedTime() {
  //   const authToken = await this.getLocalStorageAuthToken();
  //   return Number(authToken.issued_at);
  // }
  // private async getTokenExpireTime() {
  //   const authToken = await this.getLocalStorageAuthToken();
  //   return Number(authToken.expires_in);
  // }
  //
  // async isAccessTokenValid() {
  //   const tokenTimeIssued = await this.getTokenIssuedTime();
  //   const tokenExpireTime = await this.getTokenExpireTime();
  //   // Should use a global value
  //   const globalTestTimeout: number = 45;
  //   // We want to have the date minus the globalTimeout, the reason for this is that while a test is running, the token could expire.
  //   // The refresh token lasts for 300 seconds, while the access token lasts for 60 seconds (NOT TOTALLY SURE) this is why we add 240 seconds
  //   const tokenRefreshTime = tokenTimeIssued + tokenExpireTime - (globalTestTimeout);
  //   // We need the currentTimeInEpoch so we can check if the tokenRefreshTime is close to expiring.
  //   const currentTimeInEpoch = await this.currentDateToEpoch();
  //
  //   if (tokenRefreshTime <= currentTimeInEpoch) {
  //     return await this.refreshAccessToken(umbracoConfig.user.login, umbracoConfig.user.password);
  //   }
  // }
  async getRefreshToken() {
    const authToken = await this.getLocalStorageAuthToken();
    return authToken.refresh_token;
  }

  private async currentDateToEpoch() {
    const currentTime = new Date(Date.now());
    return await this.dateToEpoch(currentTime);
  }

  private async dateToEpoch(date: Date) {
    const dateToEpoch = date.getTime();
    // The epoch is in milliseconds, but we want it to be in seconds(Like it is in the token).
    const millisecondsToSeconds = dateToEpoch / 1000;
    // There is no need to have anything after .
    return Number(millisecondsToSeconds.toString().split('.')[0]);
  }

  async refreshAccessToken(userEmail: string, userPassword: string) {
    const response = await this.page.request.post(this.baseUrl + '/umbraco/management/api/v1/security/back-office/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: await this.readLocalCookie(),
        Origin: this.baseUrl
      },
      form:
        {
          grant_type: 'refresh_token',
          client_id: 'umbraco-back-office',
          redirect_uri: this.baseUrl + '/umbraco/oauth_complete',
          refresh_token: await this.getRefreshToken()
        },
      ignoreHTTPSErrors: true
    });

    if (response.status() === 200) {
      const jsonStorageValue = await response.json();
      const jsonStorageCookie = response.headers()['set-cookie'];
      await this.updateLocalStorage(jsonStorageValue);
      // We get multiple cookies, so we have to split them and then update each of the cookies in our localestorage 
      let cookies = this.splitCookies(jsonStorageCookie);
      for (const cookie of cookies) {
        await this.updateCookie(cookie);
      }
      return;
    }
    console.log('Error refreshing access token.');
    return await this.updateTokenAndCookie(userEmail, userPassword);
  }

  private splitCookies(cookieString: string): string[] {
    return cookieString
      .trim()
      .split('\n')
      .filter(line => line.trim())
      .filter(line => !line.includes('expires=Thu, 01 Jan 1970'));
  }

  async updateTokenAndCookie(userEmail: string, userPassword: string) {
    const storageStateValues = await this.login.login(userEmail, userPassword);
    await this.updateCookie(storageStateValues.cookie);
    await this.updateLocalStorage(storageStateValues.accessToken);
    return {
      cookie: storageStateValues.cookie,
      accessToken: storageStateValues.accessToken,
      refreshToken: storageStateValues.refreshToken,
    };
  }

  async readFileContent(filePath) {
    try {
      const jsonString = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(jsonString);
    } catch (error) {
      console.log('Error reading file:', error);
      throw error;
    }
  }

  async readLocalBearerToken() {
    const filePath = process.env.STORAGE_STAGE_PATH;
    if (!filePath) {
      return await this.getBearerToken();
    }

    try {
      const data = await JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const localStorageItem = await this.getLocalStorageToken(data, 'umb:userAuthTokenResponse');
      const parsedValue = await JSON.parse(localStorageItem.value);
      return `Bearer ${parsedValue.access_token}`;
    } catch {
      // If the file is not found, return the current access token from the page context
      return await this.getBearerToken();
    }
  }

  async readLocalCookie() {
    const filePath = process.env.STORAGE_STAGE_PATH;
    if (!filePath) {
      return await this.getCookie();
    }

    try {
      const data = await JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return await data.cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ') + ';';
    } catch {
      // If the file is not found, return the current cookie from the page context
      return await this.getCookie();
    }
  }

  private async getLocalStorageToken(localStorage: any, tokenName: string) {
    return await localStorage.origins?.[0]?.localStorage?.find(item => item.name === tokenName);
  }

  async updateLocalStorageTokens(setCookies: string) {
    // Find AccessToken and RefreshToken in CookiesString
    const accessValue = setCookies.match(/__Host-umbAccessToken=([^;]+)/)?.[1];
    const refreshValue = setCookies.match(/__Host-umbRefreshToken=([^;]+)/)?.[1];
    const accessToken = accessValue && {value: accessValue};
    const refreshToken = refreshValue && {value: refreshValue};

    let currentLocalStorageValue = await this.getLocalStorageAuthToken();
    const newIssuedTime = await this.currentDateToEpoch();

    currentLocalStorageValue.access_token = accessToken;
    currentLocalStorageValue.refresh_token = refreshToken;
    currentLocalStorageValue.issued_at = newIssuedTime;

    const filePath = process.env.STORAGE_STAGE_PATH;
    // Updates the user.json file in our CMS project
    if (filePath) {
      try {
        const data = await this.readFileContent(filePath);
        const fileLocalStorageToken = await this.getLocalStorageToken(data, 'umb:userAuthTokenResponse');
        fileLocalStorageToken.value = JSON.stringify(currentLocalStorageValue);
        // Converts the object to JSON string
        const updatedJsonString = JSON.stringify(data, null, 2);
        // Writes the updated JSON content to the file
        fs.writeFileSync(filePath, updatedJsonString, 'utf-8');
      } catch (error) {
        console.error('Error updating token:', error);
      }
    }
    return {accessToken: accessToken, refreshToken: refreshToken};
  }

  private async getLocalStorageAuthToken() {
    const currentStorageState = await this.page.context().storageState();
    const currentStorageToken = await this.getLocalStorageToken(currentStorageState, 'umb:userAuthTokenResponse');
    return JSON.parse(currentStorageToken.value);
  }

  private async updateLocalStorage(localStorageValue) {
    // Parse the existing token value and update its fields
    let currentLocalStorageValue = await this.getLocalStorageAuthToken();
    const newIssuedTime = await this.currentDateToEpoch();

    currentLocalStorageValue.access_token = localStorageValue.access_token;
    currentLocalStorageValue.refresh_token = localStorageValue.refresh_token;
    currentLocalStorageValue.issued_at = newIssuedTime;
    currentLocalStorageValue.scope = localStorageValue.scope;
    currentLocalStorageValue.token_type = localStorageValue.token_type;
    currentLocalStorageValue.expires_in = localStorageValue.expires_in.toString();

    const filePath = process.env.STORAGE_STAGE_PATH;
    // Updates the user.json file in our CMS project
    if (filePath) {
      try {
        const data = await this.readFileContent(filePath);
        const fileLocalStorageToken = await this.getLocalStorageToken(data, 'umb:userAuthTokenResponse');
        fileLocalStorageToken.value = JSON.stringify(currentLocalStorageValue);
        // Converts the object to JSON string
        const updatedJsonString = JSON.stringify(data, null, 2);
        // Writes the updated JSON content to the file
        fs.writeFileSync(filePath, updatedJsonString, 'utf-8');
      } catch (error) {
        console.error('Error updating token:', error);
      }
    }
  }

  private async updateCookie(cookieString: string) {
    try {
      // Parse cookie string
      const parts = cookieString.split(';').map(p => p.trim());
      const [nameValue, ...attributes] = parts;
      const [name, value] = nameValue.split('=');
      const cookieName = name.trim();

      // Get current state
      const storageState = await this.page.context().storageState();
      const cookieIndex = storageState.cookies.findIndex(c => c.name === cookieName);

      if (cookieIndex === -1) {
        console.log(`Cookie "${cookieName}" not found`);
        return;
      }

      // Update cookie value
      storageState.cookies[cookieIndex].value = value;

      // Update expires if present
      for (const attr of attributes) {
        if (attr.toLowerCase().startsWith('expires=')) {
          const expiresDate = attr.split('=')[1];
          storageState.cookies[cookieIndex].expires = Date.parse(expiresDate) / 1000;
        }
      }

      // Write to file if path exists
      const filePath = process.env.STORAGE_STAGE_PATH;
      if (filePath) {
        const fs = require('fs');
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        const fileCookieIndex = fileData.cookies.findIndex(c => c.name === cookieName);

        if (fileCookieIndex !== -1) {
          fileData.cookies[fileCookieIndex] = storageState.cookies[cookieIndex];
          fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
        } else {
          console.log(`Cookie "${cookieName}" not found in file`);
        }
      }
    } catch (error) {
      console.error('Error updating cookie:', error);
    }
  }

  async revokeAccessToken(cookie: string, accessToken: string) {
    return await this.page.request.post(this.baseUrl + '/umbraco/management/api/v1/security/back-office/revoke', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
        Origin: this.baseUrl
      },
      form:
        {
          token: accessToken,
          token_type_hint: 'access_token',
          client_id: 'umbraco-back-office'
        },
      ignoreHTTPSErrors: true
    });
  }

  async revokeRefreshToken(cookie: string, refreshToken: string) {
    return await this.page.request.post(this.baseUrl + '/umbraco/management/api/v1/security/back-office/revoke', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
        Origin: this.baseUrl
      },
      form:
        {
          token: refreshToken,
          token_type_hint: 'refresh_token',
          client_id: 'umbraco-back-office'
        },
      ignoreHTTPSErrors: true
    });
  }

  async loginToAdminUser(testUserCookie: string, testUserAccessToken: string, testUserRefreshToken: string) {
    await this.revokeAccessToken(testUserCookie, testUserAccessToken);
    await this.revokeRefreshToken(testUserCookie, testUserRefreshToken);
    await this.updateTokenAndCookie(umbracoConfig.user.login, umbracoConfig.user.password);
  }

  async getCurrentTimePlusMinute(minute: number = 1) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minute); // Add one minute

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  async convertDateFormat(dateString: string) {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  }
}