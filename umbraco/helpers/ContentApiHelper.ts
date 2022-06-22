import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";
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
    const formData = new FormData();
    formData.append('contentItem', JSON.stringify(content));
    const xhr = new XMLHttpRequest();
    await xhr.open("POST", this.api.baseUrl + "/umbraco/backoffice/UmbracoApi/Content/PostSave");
    await xhr.setRequestHeader('X-UMB-XSRF-TOKEN', await this.api.getCsrfToken());
    await xhr.send(formData);
    console.log("logging formdata: ", formData);
  }
}