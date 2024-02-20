import {Page} from "@playwright/test"
import {StylesheetUiHelper} from "./StylesheetUiHelper";
import {umbracoConfig} from "../../umbraco.config";
import {PartialViewUiHelper} from "./PartialViewUiHelper";
import {ScriptUiHelper} from "./ScriptUiHelper";
import {TemplateUiHelper} from "./TemplateUiHelper";
import {DictionaryUiHelper} from "./DictionaryUiHelper";
import {LoginUiHelper} from "./LoginUiHelper";
import {LogViewerUiHelper} from "./LogViewerUiHelper";
import {TelemetryDataUiHelper} from "./TelemetryDataUiHelper";
import {DataTypeUiHelper} from "./DataTypeUiHelper";
import {RelationTypeUiHelper} from "./RelationTypeUiHelper";
import {PackageUiHelper} from "./PackageUiHelper";
import {LanguageUiHelper} from "./LanguageUiHelper";
import {ModelsBuilderUiHelper} from "./ModelsBuilderUiHelper";
import {ExamineManagementUiHelper} from "./ExamineManagementUiHelper";
import {PublishedStatusUiHelper} from "./PublishedStatusUiHelper";
import {HealthCheckUiHelper} from "./HealthCheckUiHelper";
import {ProfilingUiHelper} from "./ProfilingUiHelper";

export class UiHelpers {
  page: Page;
  stylesheet: StylesheetUiHelper;
  partialView: PartialViewUiHelper;
  dictionary: DictionaryUiHelper;
  script: ScriptUiHelper;
  template: TemplateUiHelper;
  login: LoginUiHelper;
  logViewer: LogViewerUiHelper;
  telemetryData: TelemetryDataUiHelper;
  dataType: DataTypeUiHelper;
  relationType: RelationTypeUiHelper;
  package: PackageUiHelper;
  language: LanguageUiHelper;
  modelsBuilder: ModelsBuilderUiHelper;
  examineManagement: ExamineManagementUiHelper;
  publishedStatus: PublishedStatusUiHelper;
  healthCheck: HealthCheckUiHelper;
  profiling: ProfilingUiHelper;

  constructor(page: Page) {
    this.page = page;
    this.stylesheet = new StylesheetUiHelper(this.page);
    this.partialView = new PartialViewUiHelper(this.page);
    this.script = new ScriptUiHelper(this.page);
    this.template = new TemplateUiHelper(this.page);
    this.dictionary = new DictionaryUiHelper(this.page);
    this.login = new LoginUiHelper(this.page);
    this.logViewer = new LogViewerUiHelper(this.page);
    this.telemetryData = new TelemetryDataUiHelper(this.page);
    this.dataType = new DataTypeUiHelper(this.page);
    this.relationType = new RelationTypeUiHelper(this.page);
    this.package = new PackageUiHelper(this.page);
    this.language = new LanguageUiHelper(this.page);
    this.modelsBuilder = new ModelsBuilderUiHelper(this.page);
    this.examineManagement = new ExamineManagementUiHelper(this.page);
    this.publishedStatus = new PublishedStatusUiHelper(this.page);
    this.healthCheck = new HealthCheckUiHelper(this.page);
    this.profiling = new ProfilingUiHelper(this.page);
  }

  async goToBackOffice() {
    await this.page.goto(umbracoConfig.environment.baseUrl + '/umbraco');
  }

  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  async reloadPage() {
    await this.page.reload();
  }
}