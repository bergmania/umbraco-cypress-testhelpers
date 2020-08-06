import CommandBase from './commandBase';

export default class UmbracoErrorNotification extends CommandBase{
  _commandName = 'umbracoErrorNotification';

  method() {
    const cy = this.cy;

    cy.get('.umb-notifications__notifications > .alert-error', {
      log: false,
      timout: 60000, // This is often tested after a long running operation
    }).click({ log: false });
  }
}   