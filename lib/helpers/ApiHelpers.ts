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
import {MemberGroupApiHelper} from './MemberGroupApiHelper';
import {MemberApiHelper} from './MemberApiHelper';
import {MemberTypeApiHelper} from "./MemberTypeApiHelper";

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
  memberGroup: MemberGroupApiHelper;
  member: MemberApiHelper;
  memberType: MemberTypeApiHelper;

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
    this.user = new UserApiHelper(this);
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
    this.memberGroup = new MemberGroupApiHelper(this);
    this.member = new MemberApiHelper(this);
    this.memberType = new MemberTypeApiHelper(this);
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
      'Authorization': await this.getBearerToken(),
      'Cookie': await this.getCookie(),
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
    const globalTestTimeout: number = 40;
    // We want to have the date minus the globalTimeout, the reason for this is that while a test is running, the token could expire.
    const tokenRefreshTime = tokenTimeIssued + tokenExpireTime - globalTestTimeout;
    // We need the currentTimeInEpoch so we can check if the tokenRefreshTime is close to expiring.
    const currentTimeInEpoch = await this.currentDateToEpoch();
    
    if (tokenRefreshTime <= currentTimeInEpoch) {
      const localStorageValue = await this.refreshAccessToken();
      return this.updateLocalStorage(localStorageValue);
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

  private async refreshAccessToken() {
    const response = await this.page.context().request.post(umbracoConfig.environment.baseUrl + '/umbraco/management/api/v1/security/back-office/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: await this.getCookie()
      },
      form:
        {
          grant_type: 'refresh_token',
          client_id: 'umbraco-back-office',
          redirect_uri: umbracoConfig.environment.baseUrl + '/umbraco',
          refresh_token: await this.getRefreshToken()
        }
    });
    
    const newIssuedTime = await this.currentDateToEpoch();
    const jsonStorageValue = await response.json();
    // We need to define a new issued_at time.
    jsonStorageValue.issued_at = newIssuedTime;

    return jsonStorageValue;
  }

  private async updateLocalStorage(localStorageValue) {
    const currentStorageState = await this.page.context().storageState();
    let currentLocalStorageValue = JSON.parse(currentStorageState.origins[0].localStorage[0].value);

    
    console.log('Old Values')
    console.log(currentLocalStorageValue)
    console.log('New Values')
    console.log(localStorageValue)
    
    currentLocalStorageValue.access_token = localStorageValue.access_token;
    currentLocalStorageValue.refresh_token = localStorageValue.refresh_token;
    currentLocalStorageValue.issued_at = localStorageValue.issued_at;
    currentLocalStorageValue.expires_in = localStorageValue.expires_in.toString();

    const filePath = process.env.STORAGE_STAGE_PATH;
    console.log(filePath);
    // Updates the user.json file in our CMS project
    if (filePath) {
      const jsonString = fs.readFileSync(filePath, 'utf-8');
      
      try {
        const data = JSON.parse(jsonString);
        const localStorage = data.origins[0].localStorage[0];
        if (localStorage.name === 'umb:userAuthTokenResponse') {
          localStorage.value = JSON.stringify(currentLocalStorageValue);
        }

        // Converts the object to JSON string
        const updatedJsonString = JSON.stringify(data, null, 2);

        // Writes the updated JSON content to the file
        fs.writeFileSync(filePath, updatedJsonString, 'utf-8');
        
        console.log('Access token updated successfully.');
      } catch (error) {
        console.error('Error updating access token:', error);
      }
    }
  }
  // TODO: Maybe we need to do the same for the cookie? As the cookie expires after some time as well
}