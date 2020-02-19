import CommandBase from "./commandBase";

export default class UmbracoButtonByLabel extends CommandBase {
  _commandName = 'umbracoButtonByLabel';

  method(label) {
    const cy = this.cy;
    const cypress = this.cypress;

    cypress.log({
      displayName: "Umbraco Button",
    });

    return cy.get('umb-button[label="'+label+'"] button:enabled', {log:false});
  }
}


