import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";
import fetch from 'node-fetch';
const https = require('https');
const FormData = require('form-data');

export class ContentApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async deleteAllContent(){
    const response = await this.api.get(this.api.baseUrl + `/umbraco/backoffice/UmbracoTrees/ApplicationTree/GetApplicationTrees?application=content&tree=&use=main`);
    const content = await JsonHelper.getBody(response);

    if(content !== null){
      for (const child of content.children) {
        if (child.id > 0) {
          await this.deleteContentById(child.id);
        }
      }
    }
  }

  async deleteContentById(id){
      await this.api.post(this.api.baseUrl + `/umbraco/backoffice/UmbracoApi/Content/DeleteById?id=${id}`)
  }

  async save(content){
    const url = this.api.baseUrl + "/umbraco/backoffice/UmbracoApi/Content/PostSave";
    const formData = new FormData();
    formData.append('contentItem', JSON.stringify(content));
    
    // This is a bit weird, but essentially playwright doesn't handle the way we send content very well.
    // Instead we have to save the content with a normal fetch request, 
    // however this request won't be sent from the browser which is logged in,
    // it'll instead be sent from the runner controlling the browser.
    // What this all means is that we must hijack the cookies of the browser, and use that when sending the request.

    const context = this.api.page.context();
    const cookies = await context.cookies();
    let cookieHeader = "";
    for(const cook of cookies){
      cookieHeader += cook.name + "=" + cook.value + ";"; 
    }
    
    // Since this will mostly be run on local sites, there will be either no SSL certificate, or a self signed one,
    // so make fetch ignore SSL certificate verification.
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-UMB-XSRF-TOKEN': await this.api.getCsrfToken(),
        'Cookie': cookieHeader
      },
      agent: httpsAgent
    });

    let json = await response.text();
    return JsonHelper.parseString(json);
  }
}