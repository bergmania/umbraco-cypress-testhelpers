/// <reference types="Cypress" />
import { DocumentTypeBuilder, ContentBuilder, DocumentTypeGroupBuilder } from '../../../src';
context('Content', () => {

    function refreshContentTree(){
        // Refresh to update the tree
        cy.get('li .umb-tree-root:contains("Content")').should("be.visible").rightclick();
        cy.umbracoContextMenuAction("action-refreshNode").click();
        // We have to wait in case the execution is slow, otherwise we'll try and click the item before it appears in the UI
        cy.get('.has-children > .umb-tree-item__inner > .umb-tree-item__label').should('exist', {timeout: 10000});
    }

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
    });
    
    it('Content with contentpicker', () => {
        const docTypeName = "ContentPickerType";
        const groupName = 'ContentPickerGroup';

        cy.umbracoEnsureDocumentTypeNameNotExists(docTypeName);

        const docType = new DocumentTypeBuilder()
            .withName(docTypeName)
            .withAllowAsRoot(true)
            .addGroup()
            .withName(groupName)
            .addContentPickerProperty()
            .done()
            .done()
            .build();

        cy.saveDocumentType(docType);

        cy.get('.umb-tree-root-link').rightclick();
        cy.get('.-opens-dialog > .umb-action-link').click();
        cy.get('.menu-label').click();
        cy.umbracoEditorHeaderName('ContentPickerContent');
        cy.get('.umb-node-preview-add').click();

    });
});
