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