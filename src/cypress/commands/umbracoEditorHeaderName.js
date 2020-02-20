import CommandBase from "./commandBase";

export default class UmbracoEditorHeaderName extends CommandBase {
  _commandName = 'umbracoEditorHeaderName';

  method(label) {
    const cy = this.cy;
    const cypress = this.cypress;

    cypress.log({
      displayName: "Umbraco Editor Header Name",
    });

    return cy.get('#headerName', {log:false});
  }
}


