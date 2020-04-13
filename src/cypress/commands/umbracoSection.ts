import CommandBase from './commandBase';

export default class UmbracoSection extends CommandBase {
  _commandName = 'umbracoSection';

  method(sectionAlias) {
    const cy = this.cy;
    const cypress = this.cypress;

    cy.get('[data-element="section-' + sectionAlias + '"]', {
      log: false,
    }).click({ log: false });

    cypress.log({
      displayName: 'Umbraco Section ',
    });
  }
}
