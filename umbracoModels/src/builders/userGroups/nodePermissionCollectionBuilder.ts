import {NodePermissionBuilder} from "./nodePermissionBuilder";

export class NodePermissionCollectionBuilder{
  nodePermissionBuilders: NodePermissionBuilder[];
  parentBuilder;
  
  constructor(parentBuilder) {
    this.nodePermissionBuilders = [];
    this.parentBuilder = parentBuilder;
  }
  
  addNodePermission(nodePermissionBuilder ?: NodePermissionBuilder) {
    const builder = 
      nodePermissionBuilder === null || nodePermissionBuilder == undefined
      ? new NodePermissionBuilder(this)
      : nodePermissionBuilder;
    
    this.nodePermissionBuilders.push(builder);
    return builder;
  }
  
  done() {
    return this.parentBuilder
  }
  
  build() {
    let result = {};
    
    // Each NodePermission builder returns an object, with the node ID as property key and the permission array as value
    // we need to merge all of these to a single object the backend will accept.
    this.nodePermissionBuilders.forEach((builder) => {
      result = Object.assign(result, builder.build());
    })
    
    return result;
  }
}