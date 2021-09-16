import { Member } from '../../models/members/member';

export class MemberBuilder {
  constructor(public member: Member) {}
  public withSaveAction() {
    this.member.action = 'save';
    return this;
  }
  public withSaveNewAction() {
    this.member.action = 'saveNew';
    return this;
  }
  public withId(id) {
    this.member.id = id;
    return this;
  }
  public withName(name) {
    this.member.name = name;
    return this;
  }
  public withUsername(username) {
    this.member.username = username;
    return this;
  }
  public withPassword(password) {
    this.member.password = {
        newPassword: password,
        reset: false,
        answer: null
    };
    return this;
  }
  public withEmail(email) {
    this.member.email = email;
    return this;
  }

  public build(): Member {
    return this.member;
  }
  
}
