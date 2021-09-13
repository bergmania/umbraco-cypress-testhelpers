import CommandBase from './commandBase';

export default class UmbracoRefreshContentTree extends CommandBase {
    _commandName = 'umbracoRefreshContentTree';
    method (){
        // Refresh to update the tree
        cy.get('li .umb-tree-root:contains("Content")').should("be.visible").rightclick();
        cy.umbracoContextMenuAction("action-refreshNode").click();
        // We have to wait in case the execution is slow, otherwise we'll try and click the item before it appears in the UI
        cy.get('.umb-tree-item__inner').should('exist', {timeout: 10000});
    }
}