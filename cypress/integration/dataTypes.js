/// <reference types="Cypress" />
context('Data Types', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  it('Create data type', () => {
    const name = "Test data type";

   cy.umbracoEnsureDataTypeNameNotExists(name);

    cy.umbracoSection('settings');
    cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");

    cy.umbracoTreeItem("settings", ["Data Types"]).rightclick();

    cy.umbracoContextMenuAction("action-create").click();
    cy.umbracoContextMenuAction("action-data-type").click();

    //Type name
    cy.umbracoEditorHeaderName().type(name);


    cy.get('select[name="selectedEditor"]').select('Label');

    cy.get('.umb-property-editor select').select('Time');

    //Save
    cy.get('.btn-success').click();

    //Assert
    cy.umbracoSuccessNotification().should('be.visible');

    //Clean up
    cy.umbracoEnsureDataTypeNameNotExists(name);
   });

});
