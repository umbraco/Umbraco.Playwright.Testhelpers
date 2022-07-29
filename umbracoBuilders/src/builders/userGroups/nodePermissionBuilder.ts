import {PermissionsBuilder} from "./permissionsBuilder";

export class NodePermissionBuilder extends PermissionsBuilder {
  nodeId: number;
  
  constructor(parentBuilder) {
    super(parentBuilder);
  }
  
  withNodeId(nodeId: number) {
    this.nodeId = nodeId;
    return this;
  }
  
  build(): any {
    const permissions = super.build();
    
    // Programatically assigns a property with the nodeId, I.E {123: ["S"...]} where 123 is the ID.
    // It's important that enumerable is true, otherwise the property will not be serialized in the final result.
    let result = {};
    result = Object.defineProperty(result, this.nodeId, {
      value: permissions,
      configurable: true,
      writable: true,
      enumerable: true
    });
    
    return result;
  }
}