/// <reference types="Cypress" />

import { MediaBuilder } from '../../../src';

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

  it('Can delete media', () => {
    const fileName = 'images/h5yr.png';
    const mediaName = 'H5yr';

    cy.umbracoEnsureMediaNameNotExists(mediaName);

    let logo = new MediaBuilder()
      .withPath(fileName)
      .build();
    cy.saveMedia(logo);

    cy.umbracoSection('media');
    
    // Delete the media
    // Wait for the dropzone to appear, so we know the media is loaded 
    cy.get('[data-element="dropzone"]').should('be.visible', {timeout: 5000});
    cy.umbracoTreeItem('media', [mediaName]).rightclick();
    cy.umbracoContextMenuAction('action-delete').click();
    cy.umbracoButtonByLabelKey("general_ok").click();
    cy.get('.alert-success').should('be.visible');
    
    // Empty recycle bin
    cy.umbracoTreeItem('media', ['Recycle Bin']).rightclick();
    cy.umbracoContextMenuAction("action-emptyRecycleBin").click();
    cy.umbracoButtonByLabelKey("general_ok").click();
    cy.umbracoSuccessNotification().should('be.visible');

    cy.umbracoEnsureMediaNameNotExists(mediaName);
  });
});