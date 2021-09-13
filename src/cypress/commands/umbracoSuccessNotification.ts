import CommandBase from './commandBase';

export default class UmbracoSuccessNotification extends CommandBase {
  _commandName = 'umbracoSuccessNotification';

  method() {
    const cy = this.cy;
    const cypress = this.cypress;

    cy.get('.umb-notifications__notifications > .alert-success', {
      log: false,
      timeout: 60000, // This is often tested after a long running operation
    });

    cypress.log({
      displayName: 'Umbraco Notification Success ',
    });
  }
}
