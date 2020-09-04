/// <reference types="Cypress" />
import{ StylesheetBuilder} from "../../../src"

context('Stylesheets', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  function navigateToSettings()
  {
    cy.umbracoSection('settings');
    cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");
  }

  it('Create new style sheet file', () => {
    const name = "TestStylesheet";
    const fileName = name + ".css";

    cy.umbracoEnsureStylesheetNameNotExists(fileName);

    navigateToSettings();

    cy.umbracoTreeItem("settings", ["Stylesheets"]).rightclick();

    cy.umbracoContextMenuAction("action-create").click();
    cy.get('.menu-label').first().click(); // TODO: Fucked we cant use something like cy.umbracoContextMenuAction("action-mediaType").click();

    //Type name
    cy.umbracoEditorHeaderName(name);

    //Save
    cy.get('.btn-success').click();

    //Assert
    cy.umbracoSuccessNotification().should('be.visible');
    cy.umbracoStylesheetExists(fileName).should('be.true');

    //Clean up
    cy.umbracoEnsureStylesheetNameNotExists(fileName);
   });

   it('Can delete style sheet', () => {
    const name = "CanDeleteStylesheet";
    const fileName = name + ".css";

    cy.umbracoEnsureStylesheetNameNotExists(fileName);

    const stylesheet = new StylesheetBuilder()
      .withName(name)
      .withContent('')
      .build();

     cy.saveStylesheet(stylesheet);
 
     navigateToSettings();

     cy.umbracoTreeItem("settings", ["Stylesheets", fileName]).rightclick();
     cy.umbracoContextMenuAction("action-delete").click();
     cy.umbracoButtonByLabelKey("general_ok").click();

     cy.contains(fileName).should('not.exist');
     cy.umbracoStylesheetExists(fileName).should('be.false');
   });

});
