import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";
import fetch from 'node-fetch';
const FormData = require('form-data');
const XMLHttpRequest = require('xhr2');

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
    // TODO: Cleanup
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = String(0)
    const context = this.api.page.context();

    const cookies = await context.cookies();
    let cookiestring = "";

    for(var cook of cookies){
      cookiestring += cook.name + "=" + cook.value + ";"; 
    }

    const formData = new FormData();
    formData.append('contentItem', JSON.stringify(content));
    
    const url = "https://localhost:44331/umbraco/backoffice/umbracoapi/content/PostSave";
    // const url = this.api.baseUrl + "/umbraco/backoffice/UmbracoApi/Content/PostSave";
    console.log(url);

    var res = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-UMB-XSRF-TOKEN': await this.api.getCsrfToken(),
        'Cookie': cookiestring
      }
    });
    
    console.log(await res.text());
  }
}