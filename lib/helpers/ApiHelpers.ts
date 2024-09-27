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
  }

  async getBearerToken() {
    let someStorage = await this.page.context().storageState();
    let someObject = JSON.parse(someStorage.origins[0].localStorage[0].value);
    return 'Bearer ' + someObject.access_token;
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

  async get(url: string, params?: { [key: string]: string | number | boolean; }) {
    const options = {
      headers: await this.getHeaders(),
      params: params,
      ignoreHTTPSErrors: true
    }
    return this.page.request.get(url, options);
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

  private async getTokenIssuedTime() {
    let someStorage = await this.page.context().storageState();
    let someObject = JSON.parse(someStorage.origins[0].localStorage[0].value);
    return Number(someObject.issued_at);
  }

  private async getTokenExpireTime() {
    let someStorage = await this.page.context().storageState();
    let someObject = JSON.parse(someStorage.origins[0].localStorage[0].value);
    return Number(someObject.expires_in);
  }

  private async getRefreshToken() {
    let someStorage = await this.page.context().storageState();
    let someObject = JSON.parse(someStorage.origins[0].localStorage[0].value);
    return someObject.refresh_token;
  }

  async isAccessTokenValid() {
    const tokenTimeIssued = await this.getTokenIssuedTime();
    const tokenExpireTime = await this.getTokenExpireTime();
    // Should use a global value
    const globalTestTimeout: number = 45;
    // We want to have the date minus the globalTimeout, the reason for this is that while a test is running, the token could expire.
    // The refresh token lasts for 300 seconds, while the access token lasts for 60 seconds (NOT TOTALLY SURE) this is why we add 240 seconds
    const tokenRefreshTime = tokenTimeIssued + tokenExpireTime - (globalTestTimeout);
    // We need the currentTimeInEpoch so we can check if the tokenRefreshTime is close to expiring.
    const currentTimeInEpoch = await this.currentDateToEpoch();

    if (tokenRefreshTime <= currentTimeInEpoch) {
      return await this.refreshAccessToken();
    }
  }

  private async currentDateToEpoch() {
    const currentTime = new Date(Date.now());
    return this.dateToEpoch(currentTime);
  }

  private async dateToEpoch(date: Date) {
    const dateToEpoch = date.getTime();
    // The epoch is in milliseconds, but we want it to be in seconds(Like it is in the token).
    const millisecondsToSeconds = dateToEpoch / 1000;
    // There is no need to have anything after .
    return Number(millisecondsToSeconds.toString().split('.')[0]);
  }

  async refreshAccessToken() {
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
      return this.updateLocalStorage(jsonStorageValue);
    }
    console.log('Error refreshing access token.');
    const storageStateValues = await this.login.login();
    await this.updateCookie(storageStateValues.cookie);
    await this.updateLocalStorage(storageStateValues.accessToken);
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
      const localStorageItem = data.origins[0]?.localStorage?.find(item => item.name === 'umb:userAuthTokenResponse');
      const parsedValue = JSON.parse(localStorageItem.value);
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
      return data.cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ') + ';';
    } catch {
      // If the file is not found, return the current cookie from the page context
      return await this.getCookie();
    }
  }

  private async updateLocalStorage(localStorageValue) {
    const currentStorageState = await this.page.context().storageState();
    let currentLocalStorageValue = JSON.parse(currentStorageState.origins[0].localStorage[0].value);
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
        const localStorage = data.origins[0].localStorage[0];
        if (localStorage.name === 'umb:userAuthTokenResponse') {
          localStorage.value = JSON.stringify(currentLocalStorageValue);
        }

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
    const currentStorageState = await this.page.context().storageState();
    let currentCookie = currentStorageState.cookies[0];

    const parts = cookieString.split(';').map(part => part.trim());
    // Extract the main key-value pair
    const [nameValue, ...attributes] = parts;
    const [, value] = nameValue.split('=');
    // Updates the cookie value
    currentCookie.value = value;
    // Process each attribute
    for (const attr of attributes) {
      const [key, val] = attr.split('=');
      if (key.trim().toLowerCase() === 'expires') {
        // Updates the expires value and converts it to Epoch
        currentCookie.expires = await this.dateToEpoch(new Date(val));
      }
    }

    const filePath = process.env.STORAGE_STAGE_PATH;

    if (filePath) {
      try {
        const data = await this.readFileContent(filePath);
        data.cookies[0] = currentCookie;
        const updatedJsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, updatedJsonString, 'utf-8');
      } catch (error) {
        console.error('Error updating cookie:', error);
      }
    }
  }
}