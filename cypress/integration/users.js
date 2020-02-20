/// <reference types="Cypress" />
context('Dummy', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  it('Create user', () => {
    const name = "Alice Bobson";
    const email = "alice-bobson@acceptancetest.umbraco";

    cy.umbracoEnsureUserEmailNotExists(email);
    cy.umbracoSection('users');
    cy.umbracoButtonByLabelKey("user_createUser").click();


    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);

    cy.get('.umb-node-preview-add').click();
    cy.get('.umb-user-group-picker-list-item:nth-child(1) > .umb-user-group-picker__action').click();
    cy.get('.umb-user-group-picker-list-item:nth-child(2) > .umb-user-group-picker__action').click();
    cy.get('.btn-success').click();

    cy.get('.umb-button > .btn > .umb-button__content').click();


    cy.umbracoButtonByLabelKey("user_goToProfile").should('be.visible');

    //Clean up
    cy.umbracoEnsureUserEmailNotExists(email);

  });

  it('Create user group', () => {
    const name = "Test Group";

    cy.umbracoEnsureUserGroupNameNotExists(name);

    cy.umbracoSection('users');
    cy.get('[data-element="sub-view-userGroups"]').click();

    cy.umbracoButtonByLabelKey("actions_createGroup").click();

    //Type name
    cy.umbracoEditorHeaderName().type(name);

    // Assign sections
    cy.get('.umb-box:nth-child(1) .umb-property:nth-child(1) localize').click();
    cy.get('.umb-tree-item span').click({multiple:true});
    cy.get('.btn-success').last().click();

    // Save
    cy.get('.btn-success').click();

    //Assert
    cy.get('.umb-notifications__notifications > .alert-success').should('be.visible');

    //Clean up
    cy.umbracoEnsureUserGroupNameNotExists(name);
   });

});
