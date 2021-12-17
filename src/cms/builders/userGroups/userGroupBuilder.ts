import faker from 'faker';
import { AliasHelper } from '../../../helpers/aliasHelper';
import { PermissionsBuilder } from './permissionsBuilder';

export class UserGroupBuilder {
  alias: string;
  assignedPermissions: string[];
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

  constructor() {
    this.assignedPermissions = [];
    this.sections = [];
    this.users = [];
  }

  withAlias(alias) {
    this.alias = alias;
    return this;
  }

  withAssignedPermissions(assignedPermissions: string[]) {
    this.assignedPermissions = assignedPermissions;
    return this;
  }

  appendAssignedPermission(permission: string) {
    this.assignedPermissions.push(permission);
    return this;
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
    const name = this.name || faker.random.word;
    const alias = this.alias || AliasHelper.toSafeAlias(name);

    let defaultpermissions = []
    if(this.defaultPermissionsBuilder != undefined && this.defaultPermissionsBuilder != null){
      defaultpermissions = this.defaultPermissionsBuilder.build();
    } 

    return {
      action: this.action || 'saveNew',
      alias: alias,
      assignedPermissions: {},
      defaultPermissions: defaultpermissions,
      icon: this.icon || 'icon-users',
      id: this.id || 0,
      name: name,
      parnetId: this.parentId || -1,
      sections: this.sections || [],
      startContentId: this.startContentId || null,
      startMediaId: this.startMediaId || null,
      users: this.users || [],
    };
  }
}
