import faker from 'faker';
import { AliasHelper } from '../../../helpers/aliasHelper';

export class UserGroupBuilder {
  alias: string;
  assignedPermissions: string[];
  defaultPermissions: string[];
  icon: string;
  id: number;
  name: string;
  parentId: number;
  sections: string[];
  startContentId: number;
  startMediaId: number;
  users: string[];
  action: string;

  constructor() {
    this.assignedPermissions = [];
    this.defaultPermissions = [];
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

  withDefaultPermissions(defaultPermissions: string[]) {
    this.defaultPermissions = defaultPermissions;
    return this;
  }

  appendDefaultPermission(defaultPermission: string) {
    this.defaultPermissions.push(defaultPermission);
    return this;
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

    return {
      action: this.action || 'saveNew',
      alias: alias,
      assignedPermissions: {},
      defaultPermissions: this.defaultPermissions || [],
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
