import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

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
          this.deleteContentById(child.id);
        }
      }
    }
  }

  async deleteContentById(id){
      await this.api.post(this.api.baseUrl + `/umbraco/backoffice/UmbracoApi/Content/DeleteById?id=${id}`)
  }
  
  async save(content){
    await this.api.post(this.api.baseUrl + `/umbraco/backoffice/UmbracoApi/Content/PostSave`, content)
  }
}