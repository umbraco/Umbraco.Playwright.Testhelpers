import { ApiHelpers } from "./ApiHelpers";
import { JsonHelper } from "./JsonHelper";

export class RelationTypeApiHelper{
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const response = await this.api.get(this.api.baseUrl + "/umbraco/backoffice/UmbracoTrees/RelationTypeTree/GetNodes?id=-1");
    const content = await JsonHelper.getBody(response);

    if(content.length > 0){
      let relationTypeId = null;

      for(const node of content){
        if(node.name === name){
          relationTypeId = node.id;
        }
      }

      if(relationTypeId !== null){
        return this.api.post(this.api.baseUrl + "/umbraco/backoffice/UmbracoApi/RelationType/DeleteById?id=" + relationTypeId);
      }
    }
    
    return null;
  }
}