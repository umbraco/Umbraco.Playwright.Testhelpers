import {Page} from "@playwright/test"
import {umbracoConfig} from "../../umbraco.config";
import {ReportHelper} from "./ReportHelper";
import {TelemetryDataApiHelper} from "./TelemetryDataApiHelper";
import {LanguagesApiHelper} from "./LanguageApiHelper";
import {DictionaryApiHelper} from "./DictionaryApiHelper";
import {RelationTypeApiHelper} from "./RelationType";
import {UserGroupApiHelper} from "./UserGroupApiHelper";
import {TemplateApiHelper} from "./TemplateApiHelper";
import {AliasHelper} from "./AliasHelper";
import {DataTypeApiHelper} from "./DataTypeApiHelper";
import {UserApiHelper} from "./UserApiHelper";
import {TemporaryFileApiHelper} from "./TemporaryFileApiHelper";
import {DocumentApiHelper} from "./DocumentApiHelper";
import {PackageApiHelper} from "./PackageApiHelper";
import {ScriptApiHelper} from "./ScriptApiHelper";
import {PartialViewApiHelper} from "./PartialViewApiHelper";
import {StylesheetApiHelper} from "./StylesheetApiHelper";

export class ApiHelpers {
  baseUrl: string = umbracoConfig.environment.baseUrl;
  page: Page;
  alias: AliasHelper;
  report: ReportHelper;
  telemetry: TelemetryDataApiHelper;
  language: LanguagesApiHelper;
  dictionary: DictionaryApiHelper;
  relationType: RelationTypeApiHelper;
  userGroup: UserGroupApiHelper;
  template: TemplateApiHelper;
  dataType: DataTypeApiHelper;
  user: UserApiHelper;
  temporaryFile: TemporaryFileApiHelper;
  document: DocumentApiHelper;
  package: PackageApiHelper;
  script: ScriptApiHelper;
  partialView: PartialViewApiHelper;
  stylesheet: StylesheetApiHelper;

  constructor(page: Page) {
    this.page = page;
    this.alias = new AliasHelper();
    this.report = new ReportHelper(this);
    this.telemetry = new TelemetryDataApiHelper(this);
    this.language = new LanguagesApiHelper(this);
    this.dictionary = new DictionaryApiHelper(this);
    this.relationType = new RelationTypeApiHelper(this);
    this.userGroup = new UserGroupApiHelper(this);
    this.template = new TemplateApiHelper(this);
    this.dataType = new DataTypeApiHelper(this);
    this.user = new UserApiHelper(this);
    this.temporaryFile = new TemporaryFileApiHelper(this);
    this.document = new DocumentApiHelper(this);
    this.package = new PackageApiHelper(this);
    this.script = new ScriptApiHelper(this);
    this.partialView = new PartialViewApiHelper(this);
    this.stylesheet = new StylesheetApiHelper(this);
  }

  async getCsrfToken() {
    return (await this.page.context().cookies()).filter(x => x.name === 'UMB-XSRF-TOKEN')[0].value;
  }

  async get(url: string, params?: { [key: string]: string | number | boolean; }) {
    const options = {
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
      data: data,
      ignoreHTTPSErrors: true
    }
    return await this.page.request.post(url, options);
  }

  async delete(url: string, data?: object) {
    const options = {
      data: data,
      ignoreHTTPSErrors: true
    }
    return await this.page.request.delete(url, options);
  }

  async put(url: string, data?: object) {
    const options = {
      data: data,
      ignoreHTTPSErrors: true
    }
    return await this.page.request.put(url, options);
  }
}

