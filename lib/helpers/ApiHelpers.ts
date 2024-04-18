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

    console.log(tokenTimeIssued);
    console.log(tokenExpireTime);
    console.log(tokenRefreshTime)

    const currentTimeInEpoch = await this.currentDateToEpoch();
    let someStorage1 = await this.page.context().storageState();
    let someObject1 = JSON.parse(someStorage1.origins[0].localStorage[0].value);
    console.log(someObject1);
    
    console.log('CurrentTime:');
    console.log(currentTimeInEpoch);
    // CHANGE TO <=
    if (tokenRefreshTime >= currentTimeInEpoch) {
  
      const localStorageValue = await this.refreshAccessToken();
      return this.updateLocalStorage(localStorageValue);
      
    }

  }

  private async updateLocalStorage(){

  }

  private async currentDateToEpoch() {
    const currentTime = new Date(Date.now());
    // Converts the date to Epoch
    const dateToEpoch = currentTime.getTime();
    // The epoch is in milliseconds, but we want it to be in seconds(Like it is in the token).
    const millisecondsToSeconds = dateToEpoch / 1000;
    // There is no need to have anything after .
    return Number(millisecondsToSeconds.toString().split('.')[0]);
  }

  private async refreshAccessToken() {

    const response = await this.page.request.post(umbracoConfig.environment.baseUrl + '/umbraco/management/api/v1/security/back-office/token', {
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
    })

    const json = await response.json();
    console.log(response.headers())
    
    console.log(process.env.STORAGE_STAGE_PATH)
    
    return JSON.stringify(json);
    
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
}