/// <reference types="Cypress" />
import { exists } from 'fs';
import {
    DocumentTypeBuilder,
    ContentBuilder,
    AliasHelper
} from '../../../src';

context('Url Picker', () => {

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
      });

    it('Test Url Picker', () => {

        const urlPickerDocTypeName = 'Url Picker Test';
        const pickerDocTypeAlias = AliasHelper.toAlias(urlPickerDocTypeName); 

        cy.umbracoEnsureDocumentTypeNameNotExists(urlPickerDocTypeName);
        
        const pickerDocType = new DocumentTypeBuilder()
            .withName(urlPickerDocTypeName)
            .withAlias(pickerDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(pickerDocTypeAlias)
            .addGroup()
                .withName('ContentPickerGroup')
                .addUrlPickerProperty()
                    .withAlias('picker')
                .done()
            .done()
            .build();

        cy.saveDocumentType(pickerDocType);

        // Create content with url picker
        cy.get('.umb-tree-root-link').rightclick();
        cy.get('[data-element="action-create"]').click();
        cy.get('[data-element="action-create-' + pickerDocTypeAlias + '"] > .umb-action-link').click();
        // Fill out content
        cy.umbracoEditorHeaderName('UrlPickerContent');
        cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
        cy.umbracoSuccessNotification().should('be.visible');
        cy.get('.umb-node-preview-add').click();
        // Should really try and find a better way to do this, but umbracoTreeItem tries to click the content pane in the background
        cy.get('#treePicker li:first', {timeout: 6000}).click();
        cy.get('.umb-editor-footer-content__right-side > [button-style="success"] > .umb-button > .btn > .umb-button__content').click();
        // We have to wait for the picked content to show up or it wont be added.
        cy.get('.umb-node-preview__description').should('be.visible');
        //Save and publish
        cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
        
        cy.umbracoSuccessNotification().should('be.visible');
        //Waiting to ensure we have saved properly before leaving
        cy.umbracoButtonByLabelKey('buttons_saveAndPublish').contains('Save and publish');
        //Navigate to Recycle bin and Back to Content
        cy.get('[data-element="tree-item-Recycle Bin"] > .umb-tree-item__inner > .umb-tree-item__label').click();
        cy.get('[data-element="tree-item-UrlPickerContent"] > .umb-tree-item__inner > .umb-tree-item__label').click();
        //Assert
        cy.get('.umb-notifications__notifications > .alert-error').should('not.exist');

        //clean
        cy.umbracoEnsureDocumentTypeNameNotExists(urlPickerDocTypeName);
        cy.umbracoEnsureTemplateNameNotExists(urlPickerDocTypeName);


    })

})