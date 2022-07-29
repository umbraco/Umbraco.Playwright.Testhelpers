import faker from 'faker';
import camelize from 'camelize';
import { PermissionsBuilder } from './permissionsBuilder';
import {NodePermissionCollectionBuilder} from "./nodePermissionCollectionBuilder";

export class UserGroupBuilder {
  alias: string;
  icon: string;
  id: number;
  name: string;
  parentId: number;
  sections: string[];
  startContentId: number;
  startMediaId: number;
  users: number[];
  action: string;
  defaultPermissionsBuilder : PermissionsBuilder;
  assignedPermissionsBuilder: NodePermissionCollectionBuilder;

  constructor() {
    this.sections = [];
    this.users = [];
  }

  withAlias(alias) {
    this.alias = alias;
    return this;
  }
  
  getAlias() {
    return this.alias || 'a' + camelize(this.name)
  }
  
  addNodePermissions(nodePermissionsBuilder ?: NodePermissionCollectionBuilder) {
    const builder = 
      nodePermissionsBuilder === null || nodePermissionsBuilder === undefined
      ? new NodePermissionCollectionBuilder(this)
      : nodePermissionsBuilder;
    
    this.assignedPermissionsBuilder = builder;
    return builder;
  }

  addDefaultPermissions(userGroupPermissionsBuilder?: PermissionsBuilder) {
    const builder = 
      userGroupPermissionsBuilder === null || userGroupPermissionsBuilder === undefined
      ? new PermissionsBuilder(this)
      : userGroupPermissionsBuilder;

      this.defaultPermissionsBuilder = builder
      return builder;
  }

  withIcon(icon: string) {
    this.icon = icon;
    return this;
  }

  withId(id: number) {
    this.id = id;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  withParentId(parentId: number) {
    this.parentId = parentId;
    return this;
  }

  withSections(sections: string[]) {
    this.sections = sections;
    return this;
  }

  appendSections(sections: string[]) {
    sections.forEach((section) => { this.sections.push(section) });
    return this;
  }

  appendSection(section: string) {
    this.sections.push(section);
    return this;
  }

  withContentStartNode(contentStartNodeId: number) {
    this.startContentId = contentStartNodeId;
    return this;
  }

  withMediaStartNode(mediaStartNodeId: number) {
    this.startMediaId = mediaStartNodeId;
    return this;
  }

  withUsers(users: number[]) {
    this.users = users;
    return this;
  }

  appendUsers(users: number[]) {
    users.forEach((userId) => { this.users.push(userId) });
    return this;
  }

  appendUser(user: number) {
    this.users.push(user);
    return this;
  }

  withAction(action: string) {
    this.action = action;
    return this;
  }

  withSave() {
    this.action = 'save';
    return this;
  }

  withSaveNew() {
    this.action = 'saveNew';
    return this;
  }

  build() {
    if(this.name === undefined){
      this.withName(faker.random.uuid());
    }

    let defaultPermissions: any = []
    if(this.defaultPermissionsBuilder != undefined){
      defaultPermissions = this.defaultPermissionsBuilder.build();
    }

    let assignedPermissions = {}
    if(this.assignedPermissionsBuilder != undefined){
      assignedPermissions = this.assignedPermissionsBuilder.build();
    }

    return {
      action: this.action || 'saveNew',
      alias: this.getAlias(),
      assignedPermissions: assignedPermissions,
      defaultPermissions: defaultPermissions,
      icon: this.icon || 'icon-users',
      id: this.id || 0,
      name: this.name,
      parentId: this.parentId || -1,
      sections: this.sections || [],
      startContentId: this.startContentId || null,
      startMediaId: this.startMediaId || null,
      users: this.users || [],
    };
  }
}
