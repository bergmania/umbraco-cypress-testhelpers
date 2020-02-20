import CommandBase from "./commandBase";

export default class UmbracoButtonByLabelKey extends CommandBase {
  _commandName = 'umbracoButtonByLabelKey';

  method(label) {
    const cy = this.cy;
    const cypress = this.cypress;

    cypress.log({
      displayName: "Umbraco Button",
    });

    return cy.get('umb-button[label-key="'+label+'"] button:enabled', {log:false});
  }
}


