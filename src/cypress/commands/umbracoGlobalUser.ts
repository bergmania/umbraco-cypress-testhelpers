import CommandBase from './commandBase';

export default class UmbracoGlobalUser extends CommandBase {
  commandName = 'umbracoGlobalUser';

  method() {
    const cy = this.cy;

    return cy.get('[data-element="global-user"]');
  }
}
