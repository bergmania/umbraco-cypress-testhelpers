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
    cy.umbracoButtonByLabel("user_createUser").click();


    cy.get('input[name="name"]').type(name);
    cy.get('input[name="email"]').type(email);

    cy.get('.umb-node-preview-add').click();
    cy.get('.umb-user-group-picker-list-item:nth-child(1) > .umb-user-group-picker__action').click();
    cy.get('.umb-user-group-picker-list-item:nth-child(2) > .umb-user-group-picker__action').click();
    cy.get('.btn-success').click();

    cy.get('.umb-button > .btn > .umb-button__content').click();

    cy.get('.umb-checkmark').should('be.visible');

    //Clean up
    cy.umbracoEnsureUserEmailNotExists(email);

  });

  it('Create user group', () => {
    const name = "Test users";

    cy.umbracoSection('users');
    cy.get('[data-element="sub-view-userGroups"]').click();

    cy.umbracoButtonByLabel("Create Group").click();
    // cy.get('input[name="name"]').type(name);
    // cy.get('input[name="email"]').type(email);
    //
    // cy.get('.umb-node-preview-add').click();
    // cy.get('.umb-user-group-picker-list-item:nth-child(1) > .umb-user-group-picker__action').click();
    // cy.get('.umb-user-group-picker-list-item:nth-child(2) > .umb-user-group-picker__action').click();
    // cy.get('.btn-success').click();
    //
    // cy.get('.umb-button > .btn > .umb-button__content').click();
    //
    // cy.get('.umb-checkmark').should('be.visible');
    //
    // //Clean up
    // cy.umbracoEnsureUserEmailNotExists(email);

  });

});
