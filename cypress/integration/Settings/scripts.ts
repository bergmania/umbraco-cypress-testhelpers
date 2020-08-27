/// <reference types="Cypress" />
import{ ScriptBuilder } from "../../../src"

context('Scripts', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  }); 
  
  function navigateToSettings() {
    cy.umbracoSection('settings');
    cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");
  }

  it('Create new JavaScript file', () => {
    const name = "TestScript";
    const fileName = name + ".js";

   cy.umbracoEnsureScriptNameNotExists(fileName);

    navigateToSettings()

    cy.umbracoTreeItem("settings", ["Scripts"]).rightclick();

    cy.umbracoContextMenuAction("action-create").click();
    cy.get('.menu-label').first().click(); // TODO: Fucked we cant use something like cy.umbracoContextMenuAction("action-mediaType").click();

    //Type name
    cy.umbracoEditorHeaderName(name);

    //Save
    cy.get('.btn-success').click();

    //Assert
    cy.umbracoSuccessNotification().should('be.visible');

    //Clean up
    cy.umbracoEnsureScriptNameNotExists(fileName);
  });
  
  it('Delete a JavaScript file', () => {
    const name = "TestDeleteScriptFile";
    const fileName = name + ".js";

    cy.umbracoEnsureScriptNameNotExists(fileName);

    const script = new ScriptBuilder()
      .withName(name)
      .withContent('alert("this is content");')
      .build();
    
    cy.saveScript(script);
    
    navigateToSettings()

    cy.umbracoTreeItem("settings", ["Scripts", fileName]).rightclick();
    cy.umbracoContextMenuAction("action-delete").click();
    cy.umbracoButtonByLabelKey("general_ok").click();

    cy.contains(fileName).should('not.exist');
    // TODO: assert with db call that script has actually been deleted

    cy.umbracoEnsureScriptNameNotExists(fileName);
  });

});
