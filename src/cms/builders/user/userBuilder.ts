import faker from 'faker';

export class UserBuilder {
  email: string;
  id: number;
  message: string;
  name: string;
  parentId: number;
  userGroups: string[];


  constructor() {
    this.userGroups = [];
  }

  withEmail(email: string) {
    this.email = email;
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

  appendUserGroup(userGroup: string) {
    this.userGroups.push(userGroup);
    return this;
  }

  withUserGroups(userGroups: string[]) {
    this.userGroups = userGroups;
    return this;
  }

  build() {
    const email = this.email || 'test@test.com';
    return {
      email: email,
      id: this.id || -1,
      message: this.message || "",
      name: this.name || email,
      parentId: this.parentId || -1,
      userGroups: this.userGroups || []
    };
  }
}
