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
    cy.umbracoScriptExists(fileName).then(exists => { expect(exists).to.be.true });


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
    cy.umbracoScriptExists(name).then(exists => { expect(exists).to.be.false });

    cy.umbracoEnsureScriptNameNotExists(fileName);
  });

  it('Update JavaScript file', () => {
    const name = "TestEditJavaScriptFile";
    const fileName = name + ".js";

    const originalContent = 'console.log("A script);\n';
    const edit = 'alert("content");';
    const expected = originalContent + edit;

    cy.umbracoEnsureScriptNameNotExists(fileName);
    
    const script = new ScriptBuilder()
      .withName(name)
      .withContent(originalContent)
      .build();
    cy.saveScript(script);

    navigateToSettings();
    cy.umbracoTreeItem("settings", ["Scripts", fileName]).click();
    
    cy.get('.ace_text-input').type(edit, { force: true });
    cy.get('.btn-success').click();

    cy.umbracoSuccessNotification().should('be.visible');
    cy.umbracoVerifyScriptContent(fileName, expected).then((result) => { expect(result).to.be.true });

    cy.umbracoEnsureScriptNameNotExists(fileName);
  });

});
