import CommandBase from './commandBase';

export default class SaveUserGroup extends CommandBase {
  commandName = 'saveUserGroup';

  method(userGroup) {
    const cy = this.cy;

    if (userGroup == null) {
      return;
    }

    return cy.umbracoApiRequest(
      this.relativeBackOfficePath + '/backoffice/umbracoapi/usergroups/PostSaveUserGroup',
      'POST',
      userGroup,
    );
  }
}
