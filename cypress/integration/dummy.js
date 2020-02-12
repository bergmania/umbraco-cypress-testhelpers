/// <reference types="Cypress" />
context('Dummy', () => {

    it('Test', () => {
      const name = "Alice Bobson";
      const email = "alice-bobson@acceptancetest.umbraco";

      cy.umbracoLogin(Cypress.env('username'), Cypress.env('password')).then(() => {

        cy.umbracoEnsureUserEmailNotExists(email).then(() => {

          cy.umbracoSection('users').then(() => {
            cy.umbracoPrimaryButton().click().then(() => {

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
          });
        });


      });


    });


});
