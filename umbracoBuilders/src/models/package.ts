export class Package{
  public id: number = 0;
  public packageGuid: string = "";
  name: string = "";
  packagePath: string = "";
  contentLoadChildNodes: boolean = false;
  contentNodeId: number =  0;
  macros: [];
  languages: [];
  dictionaryItems: [];
  templates: [];
  partialViews: [];
  documentTypes: [];
  mediaTypes: [];
  stylesheets: [];
  scripts: [];
  dataTypes: [];
  mediaUdis: [];
  mediaLoadChildNodes: boolean = false;
}