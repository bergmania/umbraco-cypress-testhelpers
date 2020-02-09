import CommandBase from "./commandBase";

export default class UmbracoSection extends CommandBase {
  _commandName = 'umbracoSection';

  method(sectionAlias) {
    const cy = this.cy;

    cy.get('[data-element="section-'+ sectionAlias +'"]').click();
  }
}


