import {Page} from "@playwright/test"
import {StylesheetUiHelper} from "./StylesheetUiHelper";
import {umbracoConfig} from "../../umbraco.config";
import {PartialViewUiHelper} from "./PartialViewUiHelper";
import {ScriptUiHelper} from "./ScriptUiHelper";
import {TemplateUiHelper} from "./TemplateUiHelper";
import {TranslationUiHelper} from "./TranslationUiHelper";
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
import {WelcomeDashboardUiHelper} from './WelcomeDashboardUiHelper';
import {ContentUiHelper} from "./ContentUiHelper";
import {DocumentTypeUiHelper} from "./DocumentTypeUiHelper";
import {RedirectManagementUiHelper} from './RedirectManagementUiHelper';
import {MemberGroupUiHelper} from "./MemberGroupUiHelper";
import {MemberUiHelper} from "./MemberUiHelper";
import {MemberTypeUiHelper} from "./MemberTypeUiHelper";
import {MediaTypeUiHelper} from "./MediaTypeUiHelper";
import {UserUiHelper} from "./UserUiHelper";
import {UserGroupUiHelper} from "./UserGroupUiHelper";
import {MediaUiHelper} from "./MediaUiHelper";
import {DocumentBlueprintsUiHelper} from "./DocumentBlueprintsUiHelper";

export class UiHelpers {
  page: Page;
  stylesheet: StylesheetUiHelper;
  partialView: PartialViewUiHelper;
  translation: TranslationUiHelper;
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
  welcomeDashboard: WelcomeDashboardUiHelper;
  content: ContentUiHelper;
  documentType: DocumentTypeUiHelper;
  redirectManagement: RedirectManagementUiHelper;
  memberGroup: MemberGroupUiHelper;
  member: MemberUiHelper;
  memberType: MemberTypeUiHelper;
  mediaType: MediaTypeUiHelper;
  user: UserUiHelper;
  userGroup: UserGroupUiHelper;
  media: MediaUiHelper;
  documentBlueprints: DocumentBlueprintsUiHelper;

  constructor(page: Page) {
    this.page = page;
    this.stylesheet = new StylesheetUiHelper(this.page);
    this.partialView = new PartialViewUiHelper(this.page);
    this.script = new ScriptUiHelper(this.page);
    this.template = new TemplateUiHelper(this.page);
    this.translation = new TranslationUiHelper(this.page);
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
    this.welcomeDashboard = new WelcomeDashboardUiHelper(this.page);
    this.content = new ContentUiHelper(this.page);   
    this.documentType = new DocumentTypeUiHelper(this.page);
    this.redirectManagement = new RedirectManagementUiHelper(this.page);
    this.memberGroup = new MemberGroupUiHelper(this.page);
    this.member = new MemberUiHelper(this.page);
    this.memberType = new MemberTypeUiHelper(this.page);
    this.mediaType = new MediaTypeUiHelper(this.page);
    this.user = new UserUiHelper(this.page);
    this.userGroup = new UserGroupUiHelper(this.page);
    this.media = new MediaUiHelper(this.page);
    this.documentBlueprints = new DocumentBlueprintsUiHelper(this.page);
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

  async goBackPage() {
    await this.page.goBack();
  }
}