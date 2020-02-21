import CommandBase from "./commandBase";

export default class UmbracoContextMenuAction extends CommandBase {
  _commandName = 'umbracoContextMenuAction';

  method(actionName) {
    const cy = this.cy;
    const cypress = this.cypress;

    cypress.log({
      displayName: "Umbraco Context Menu Action",
      message: actionName
    });

   return cy.get('li.umb-action[data-element="'+ actionName +'"]',{log:false});

  }
}


