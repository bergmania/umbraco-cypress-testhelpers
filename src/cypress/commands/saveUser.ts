import CommandBase from './commandBase';

export default class SaveUser extends CommandBase {
  commandName = 'saveUser';

  method(user) {
    const cy = this.cy;

    if (user == null) {
      return;
    }

    return cy.umbracoApiRequest(
      this.relativeBackOfficePath + '/backoffice/umbracoapi/users/PostCreateUser',
      'POST',
      user,
    );
  }
}
