import CommandBase from "./commandBase";
import AliasHelper from "../../helpers/aliasHelper";

export default class UmbracoEditorHeaderName extends CommandBase {
  _commandName = 'umbracoEditorHeaderName';

  method(typedText) {
    const cy = this.cy;
    const cypress = this.cypress;

    cypress.log({
      displayName: "Umbraco Editor Header Name",
    });

    cy.get('#headerName', {log:false}).type(typedText);

    const alias = AliasHelper.toAlias(typedText);
    cy.get('input[name="lockedField"]').should('have.value', alias);
  }
}


