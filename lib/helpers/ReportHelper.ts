import {ApiHelpers} from "./ApiHelpers";
import {TestInfo} from "@playwright/test";

export class ReportHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async report(testInfo: TestInfo) {
    console.log("Trying to report......")
    console.log("Retry: " + testInfo.retry)
    console.log("Is ci: " + process.env.CI)
    if(testInfo.retry && testInfo.retry === 0 && process.env.CI){
      await this.api.post("https://functionapp-221110123128.azurewebsites.net/api/PlaywrightTableData", { "TestName": testInfo.title, "CommitId": process.env.CommitId, "RetryNumber": testInfo.retry});
    }
  }
}