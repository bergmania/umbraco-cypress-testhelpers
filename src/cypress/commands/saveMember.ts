import CommandBase from './commandBase';

export default class SaveMember extends CommandBase {
  _commandName = 'saveMember';

  method(member) {
    const cy = this.cy;

    if (member == null) {
      return;
    }

    return cy.umbracoApiRequest(this.relativeBackOfficePath + '/backoffice/UmbracoApi/Member/PostSave', 'POST', member);
  }
}
