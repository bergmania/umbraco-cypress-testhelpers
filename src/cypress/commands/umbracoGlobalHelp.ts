import CommandBase from './commandBase';

export default class UmbracoGlobalHelp extends CommandBase {
  commandName = 'umbracoGlobalHelp';

  method() {
    const cy = this.cy;

    return cy.get('[data-element="global-help"]');
  }
}
