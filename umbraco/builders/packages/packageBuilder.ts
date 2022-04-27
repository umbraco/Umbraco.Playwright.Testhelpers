export class PackageBuilder {
  id;
  name;
  packageGuid;
  contentLoadChildNodes;
  mediaLoadChildNodes;
  contentNodeId;

  withId(id){
    this.id = id;
    return this;
  }
  
  withName(name) {
    this.name = name;
    return this;
  }

  withPackageGuid(packageGuid) {
    this.packageGuid = packageGuid;
    return this;
  }
  
  withLoadContentChildNodes(contentLoadChildNodes){
    this.contentLoadChildNodes = contentLoadChildNodes;
    return this;
  }
  
  withLoadMediaChildNodes(mediaLoadChildNodes){
    this.mediaLoadChildNodes = mediaLoadChildNodes;
    return this;
  }
  
  withContentNodeId(contentNodeId){
    this.contentNodeId = contentNodeId;
    return this;
  }

  build() {
    return {
      id: this.id,
      name: this.name,
      packageGuid: this.packageGuid,
      contentLoadChildNodes: this.contentLoadChildNodes || false,
      mediaLoadChildNodes: this.mediaLoadChildNodes || false,
      contentNodeId: this.contentNodeId,
      
    };
  }
}
