/// <reference types="Cypress" />
import { PartialViewMacroBuilder, MacroBuilder, DocumentTypeBuilder, ContentBuilder, AliasHelper, GridDataTypeBuilder } from '../../../src';

context('Macros', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  function refreshContentTree(){
    // Refresh to update the tree
    cy.get('li .umb-tree-root:contains("Content")').should("be.visible").rightclick();
    cy.umbracoContextMenuAction("action-refreshNode").click();
    // We have to wait in case the execution is slow, otherwise we'll try and click the item before it appears in the UI
    cy.get('.umb-tree-item__inner').should('exist', {timeout: 10000});
  }

  it('Create macro', () => {
    const name = "Test macro";

    cy.umbracoEnsureMacroNameNotExists(name);

    cy.umbracoSection('settings');
    cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");

    cy.umbracoTreeItem("settings", ["Macros"]).rightclick();

    cy.umbracoContextMenuAction("action-create").click();

    cy.get('form[name="createMacroForm"]').within(($form) => {
      cy.get('input[name="itemKey"]').type(name);
      cy.get(".btn-primary").click();
    });

    cy.location().should((loc) => {
      expect(loc.hash).to.include('#/settings/macros/edit/')
    });

    //Clean up
    cy.umbracoEnsureMacroNameNotExists(name);
  });
});
