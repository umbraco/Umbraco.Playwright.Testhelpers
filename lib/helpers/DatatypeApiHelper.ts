import {ApiHelpers} from "./ApiHelpers";
import {umbracoConfig} from "../../umbraco.config";
import {JsonHelper} from "./JsonHelper";
import {BlockGridDataTypeBuilder, SliderDataTypeBuilder} from "@umbraco/json-models-builders/dist/lib/builders/dataTypes";
export class DatatypeApiHelper {
  api: ApiHelpers
  
  constructor(api: ApiHelpers) {
    this.api = api;
  }
  
  async ensureNameNotExists(name: string){
    const response = await this.api.get(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/DataType/GetByName?name=${name}`);
    const content = await JsonHelper.getBody(response);
    
    if(content != null){
      const dataTypeId = content.id;
      
      if(dataTypeId !== null){
        await this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/DataType/DeleteById?id=${dataTypeId}`);
      }
    }
  }
  
  async save(dataType: any){
    if(dataType == null){
      return;
    }
    
    const datatype = await this.api.post(`${umbracoConfig.environment.baseUrl}/umbraco/backoffice/UmbracoApi/DataType/PostSave`, dataType);
    return await JsonHelper.getBody(datatype);
  }

  async exists(name){
    const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/umbracotrees/datatypetree/GetNodes?id=-1');
    const searchBody = await JsonHelper.getBody(response);
    if (searchBody.length > 0) {
      for (const sb of searchBody) {
        if (sb.name === name) {
          return true;
        }
      }
    }
    return false;
  }

  async createDefaultBlockGrid(blockGridName, element, label = "") {
    const dataTypeBlockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .addBlock()
        .withContentElementTypeKey(element['key'])
        .withSettingsElementTypeKey(element['key'])
        .withLabel(label)
      .done()
      .build();
    return await this.api.dataTypes.save(dataTypeBlockGrid);
  }

  async createBlockGridDataTypeWithArea(elementParent, elementChild, blockGridName, blockArea){
    const dataTypeBlockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .addBlock()
        .withContentElementTypeKey(elementChild['key'])
      .done()
      .addBlock()
        .withContentElementTypeKey(elementParent['key'])
        .addArea()
          .withAlias(blockArea)
        .done()
      .done()
      .build();
    return await this.api.dataTypes.save(dataTypeBlockGrid);
  }

  async createSliderWithDefaultValue(sliderName: string, defaultValue: number) {
    const slider = new SliderDataTypeBuilder()
      .withName(sliderName)
      .withInitialLowerValue(defaultValue)
      .build();
    return await this.api.dataTypes.save(slider);
  }
}