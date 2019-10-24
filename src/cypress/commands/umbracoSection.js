import CommandBase from "./commandBase";

export default class UmbracoSection extends CommandBase {
  commandName = 'umbracoSection';

  method(sectionAlias) {
    const cy = this.cy;

    return cy.get('[data-element="section-'+sectionAlias+'"]');
  }
}


