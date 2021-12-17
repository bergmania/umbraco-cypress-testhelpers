import faker from 'faker';
import camelize from 'camelize';
import { PermissionsBuilder } from './permissionsBuilder';
import {NodePermissionBuilder} from "./nodePermissionBuilder";

export class UserGroupBuilder {
  alias: string;
  icon: string;
  id: number;
  name: string;
  parentId: number;
  sections: string[];
  startContentId: number;
  startMediaId: number;
  users: string[];
  action: string;

  defaultPermissionsBuilder : PermissionsBuilder;
  assignedPermissionsBuilder: NodePermissionBuilder;

  constructor() {
    this.sections = [];
    this.users = [];
  }

  withAlias(alias) {
    this.alias = alias;
    return this;
  }
  
  getAlias(){
    return this.alias || 'a' + camelize(this.name)
  }
  
  addNodePermissions(nodePermissionsBuilder ?: NodePermissionBuilder){
    const builder = 
      nodePermissionsBuilder === null || nodePermissionsBuilder === undefined
      ? new NodePermissionBuilder(this)
      : nodePermissionsBuilder;
    
    this.assignedPermissionsBuilder = builder;
    return builder;
  }

  addDefaultPermissions(userGroupPermissionsBuilder?: PermissionsBuilder){
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

  appendSection(section: string) {
    this.sections.push(section);
    return this;
  }

  withStartContentId(startContentId: number) {
    this.startContentId = startContentId;
    return this;
  }

  withStartMediaId(startMediaId: number) {
    this.startMediaId = startMediaId;
    return this;
  }

  withUsers(users: string[]) {
    this.users = users;
    return this;
  }

  appendUser(user: string) {
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

    let defaultPermissions = []
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
