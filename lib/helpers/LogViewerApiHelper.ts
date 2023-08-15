import {ApiHelpers} from "./ApiHelpers";

export class LogViewerApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async getLevel() {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/log-viewer/level?skip=0&take=1000');
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getLevelCount(startDate, endDate) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/log-viewer/level-count?startDate=' + startDate + '&endDate=' + endDate);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  // Is it possible to use enums for orderDirection and logLevel
  async getLog(skip = 0, take = 100, orderDirection: string, filterExpression, logLevel: string, startDate, endDate) {
    const response = await this.api.get(this.api.baseUrl + `/umbraco/management/api/v1/log-viewer/log?skip=${skip}&take=${take}&orderDirection=${orderDirection}&filterExpression=${filterExpression}&logLevel=${logLevel}&startDate=${startDate}&endDate=${endDate}`);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getMessageTemplate(skip = 0, take = 100, startDate, endDate) {
    const response = await this.api.get(this.api.baseUrl + `/umbraco/management/api/v1/log-viewer/message-template?skip=${skip}&take=${take}&startDate=${startDate}&endDate=${endDate}`);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async getSavedSearches(skip = 0, take = 100) {
    const response = await this.api.get(this.api.baseUrl + `/umbraco/management/api/v1/log-viewer/saved-search?skip=${skip}&take=${take}`);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async createSavedSearch(name: string, query: string) {
    const searchData = {
      "name": name,
      "query": query
    }
    
    const response = await this.api.post(this.api.baseUrl + `/umbraco/management/api/v1/log-viewer/saved-search`, searchData);
    return response.headers().location.split("/").pop();
  }

  async getSavedSearch(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/log-viewer/saved-search/' + name);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async deleteSavedSearch(name: string) {
    const response = await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/log-viewer/saved-search/' + name);
    return response.status();
  }

  async validateLogSize(startDate, endDate) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/log-viewer/validate-logs-size?startDate=' + startDate + '&endDate=' + endDate);
    const json = await response.json();

    if (json !== null) {
      return json;
    }
    return null;
  }

  async doesSavedSearchExist(name: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/log-viewer/saved-search/' + name);
    const json = await response.json();

    return json != null;
  }
}
