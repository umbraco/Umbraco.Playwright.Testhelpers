import {ApiHelpers} from "./ApiHelpers";
import {TestInfo} from "@playwright/test";

export class ReportHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async report(testInfo: TestInfo) {
    if(testInfo.retry === 1 && process.env.CI){
      await this.api.post("https://functionapp-221110123128.azurewebsites.net/api/PlaywrightTableData", { "TestName": testInfo.title, "CommitId": process.env.CommitId})
    }
  }
}