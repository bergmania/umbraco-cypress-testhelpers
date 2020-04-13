/// <reference types="Cypress" />
context('Document Types', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  it('Create document type', () => {
    const name = "Test document type";

    cy.umbracoEnsureDocumentTypeNameNotExists(name);

    cy.umbracoSection('settings');
    cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");

    cy.umbracoTreeItem("settings", ["Document Types"]).rightclick();

    cy.umbracoContextMenuAction("action-create").click();
    cy.umbracoContextMenuAction("action-documentType").click();
    //Type name
    cy.umbracoEditorHeaderName(name);


    cy.get('[data-element="group-add"]').click();


    cy.get('.umb-group-builder__group-title-input').type('Group name');
    cy.get('[data-element="property-add"]').click();
    cy.get('.editor-label').type('property name');
    cy.get('[data-element="editor-add"]').click();

    //Search for textstring
    cy.get('.umb-search-field').type('Textstring');

    // Choose first item
    cy.get('ul.umb-card-grid li span[title="Textstring"]').closest("li").click();

    // Save property
    cy.get('.btn-success').last().click();

    //Save
    cy.get('.btn-success').click();

    //Assert
    cy.umbracoSuccessNotification().should('be.visible');

    //Clean up
    cy.umbracoEnsureDocumentTypeNameNotExists(name);
   });

});
