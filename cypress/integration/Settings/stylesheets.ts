/// <reference types="Cypress" />
import{ StylesheetBuilder } from '../../../src';

context('Stylesheets', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  function navigateToSettings()
  {
    cy.umbracoSection('settings');
    cy.get('li .umb-tree-root:contains("Settings")').should('be.visible');
  }

  it('Create new style sheet file', () => {
    const name = 'TestStylesheet';
    const fileName = name + '.css';

    cy.umbracoEnsureStylesheetNameNotExists(fileName);

    navigateToSettings();

    cy.umbracoTreeItem('settings', ['Stylesheets']).rightclick();

    cy.umbracoContextMenuAction('action-create').click();
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
    const name = 'CanDeleteStylesheet';
    const fileName = name + '.css';

    cy.umbracoEnsureStylesheetNameNotExists(fileName);

    const stylesheet = new StylesheetBuilder()
      .withName(name)
      .withContent('')
      .build();

     cy.saveStylesheet(stylesheet);
 
     navigateToSettings();

     cy.umbracoTreeItem('settings', ['Stylesheets', fileName]).rightclick();
     cy.umbracoContextMenuAction('action-delete').click();
     cy.umbracoButtonByLabelKey('general_ok').click();

     cy.contains(fileName).should('not.exist');
     cy.umbracoStylesheetExists(fileName).should('be.false');
   });

   it('Can update style sheet', () => {
     const name = 'CanUpdateStylesheet';
     const nameEdit = 'Edited';
     let fileName = name + '.css';

     cy.umbracoEnsureStylesheetNameNotExists(fileName);

     const originalContent = '.h1{ color: red;}\n';
     const edit = '.h2{{} color: purple;{}}';
     const expected = originalContent + '.h2{ color: purple;}';

     const style = new StylesheetBuilder()
       .withName(name)
       .withContent(originalContent)
       .build();
     cy.saveStylesheet(style);

     navigateToSettings();
     cy.umbracoTreeItem('settings', ['Stylesheets', fileName]).click();
     
     cy.get('.ace_text-input').type(edit, { force: true });

     // Since scripts has no alias it should be safe to not use umbracoEditorHeaderName
     // umbracoEditorHeaderName does not like {backspace}
     cy.get('#headerName').type('{backspace}{backspace}{backspace}{backspace}' + nameEdit).should('have.value', name+nameEdit);
     fileName = name + nameEdit + '.css';
     cy.get('.btn-success').click()
     
     cy.umbracoSuccessNotification().should('be.visible');
     cy.umbracoVerifyStylesheetContent(fileName, expected).should('be.true');

     cy.umbracoEnsureStylesheetNameNotExists(fileName);
   });
  
   it('Can Delete folder', () => {
    const folderName = "TestFolder";

    // The way scripts and folders are fetched and deleted are identical
    cy.umbracoEnsureScriptNameNotExists(folderName);
    cy.saveFolder('stylesheets', folderName);

    navigateToSettings()

    cy.umbracoTreeItem("settings", ["Stylesheets", folderName]).rightclick();
    cy.umbracoContextMenuAction("action-delete").click();
    cy.umbracoButtonByLabelKey("general_ok").click();

    cy.contains(folderName).should('not.exist');
    cy.umbracoStylesheetExists(folderName).should('be.false')

    cy.umbracoEnsureScriptNameNotExists(folderName);
  });

});
