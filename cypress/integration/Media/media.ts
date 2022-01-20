/// <reference types="Cypress" />

context('Login', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'), false);
  });

  it('Uploads an image', () => {
    const logo = 'images/logo.png';
    const mediaName = "Logo";

    cy.umbracoEnsureMediaNameNotExists(mediaName);
    cy.umbracoSection('media');

    // Setup and intercept to wait for the upload to finish
    cy.intercept({
      method: 'POST',
      url: '/umbraco/backoffice/umbracoapi/media/PostAddFile',
    }).as('upload')

    cy.get('.dropzone').attachFile(logo, { subjectType: 'drag-n-drop' });

    // We must wait for the upload to finish
    // otherwise we run into the trouble of checking/trying to delete the media before it's uploaded
    cy.wait('@upload', {requestTimeout: 10000}).then((interception) =>{
      // Assert
      cy.contains('Logo').should('exist');

      // Clean
      cy.umbracoEnsureMediaNameNotExists(mediaName);
    });

  });
});