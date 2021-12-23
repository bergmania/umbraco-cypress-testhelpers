/// <reference types="Cypress" />
import {
    ContentBuilder,
    DocumentTypeBuilder
  } from '../../../src';

context('Languages', () => {
    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'), false);
      });

      
    function DeleteAllPackages(){
        const url = 'https://localhost:44331/umbraco/backoffice/umbracoapi/package/GetCreatedPackages'
        cy.umbracoApiRequest(url, 'GET', null).then((response) => {
            response.forEach(function (value){
                const requestUrl = 'https://localhost:44331/umbraco/backoffice/umbracoapi/package/DeleteCreatedPackage?packageId=' + value.id 
                cy.umbracoApiRequest(requestUrl, 'POST', null)
            });
        });
    }
    function CreatePackage(contentId){
        const newPackage = {
            id: 0,
            packageGuid: "00000000-0000-0000-0000-000000000000",
            name: "TestPackage",
            packagePath: "",
            contentLoadChildNodes: false,
            contentNodeId: contentId,
            macros: [],
            languages: [],
            dictionaryItems: [],
            templates: [],
            partialViews: [],
            documentTypes: [],
            mediaTypes: [],
            stylesheets: [],
            scripts: [],
            dataTypes: [],
            mediaUdis: [],
            mediaLoadChildNodes: false
        }
        const url = "https://localhost:44331/umbraco/backoffice/umbracoapi/package/PostSavePackage";
        cy.umbracoApiRequest(url, 'POST', newPackage);
    }
      it('Creates a simple package', () => {
        const rootDocTypeName = "Test document type";
        const nodeName = "1) Home";
        const packageName = "TestPackage";

        cy.deleteAllContent();
        cy.umbracoEnsureDocumentTypeNameNotExists(rootDocTypeName);

        const rootDocType = new DocumentTypeBuilder()
            .withName(rootDocTypeName)
            .withAllowAsRoot(true)
            .build();
        
        cy.saveDocumentType(rootDocType).then((generatedRootDocType) => {
            const rootDocTypeAlias = generatedRootDocType["alias"];

            const rootContentNode = new ContentBuilder()
                .withContentTypeAlias(rootDocTypeAlias)
                .withAction("saveNew")
                .addVariant()
                    .withName(nodeName)
                    .withSave(true)
                .done()
                .build();
            cy.saveContent(rootContentNode);
        });
        
        // Navigate to create package section
        cy.umbracoSection('packages');
        cy.contains('Created').click();
        cy.contains('Create package').click();

        // Fill out package creation form

        cy.get('#headerName').should('be.visible');
        cy.wait(1000);
        cy.get('#headerName').type(packageName);
        cy.get('.controls > .umb-node-preview-add').click();
        cy.get('.umb-tree-item__label').first().click();
        cy.get('.btn').click();

        // Navigate pack to packages and Assert the file is created
        cy.umbracoSection('packages');
        cy.contains('Created').click();
        cy.contains(packageName).should('be.visible');

        // Cleanup
        DeleteAllPackages();
        cy.deleteAllContent();
        cy.umbracoEnsureDocumentTypeNameNotExists(rootDocTypeName);
      });

      it('Delete package', () => {
        const rootDocTypeName = "Test document type";
        const nodeName = "1) Home";

        cy.deleteAllContent();
        cy.umbracoEnsureDocumentTypeNameNotExists(rootDocTypeName);
        DeleteAllPackages();
        
        // Create package with content
        const rootDocType = new DocumentTypeBuilder()
            .withName(rootDocTypeName)
            .withAllowAsRoot(true)
            .build();
        
        cy.saveDocumentType(rootDocType).then((generatedRootDocType) => {
            const rootDocTypeAlias = generatedRootDocType["alias"];

            const rootContentNode = new ContentBuilder()
                .withContentTypeAlias(rootDocTypeAlias)
                .withAction("saveNew")
                .addVariant()
                    .withName(nodeName)
                    .withSave(true)
                .done()
                .build();
            cy.saveContent(rootContentNode).then((generatedContent) => {
                CreatePackage(generatedContent.Id);
            });
        });
        // Navigate to create package section
        cy.umbracoSection('packages');
        cy.contains('Created').click();
        cy.contains('Delete').click();
        cy.contains('Yes, delete').click();

        cy.contains('TestPackage').should('not.exist');

        // Cleanup
        cy.deleteAllContent();
        cy.umbracoEnsureDocumentTypeNameNotExists(rootDocTypeName);
        DeleteAllPackages();
      });
      it('Can download package', () => {
        const rootDocTypeName = "Test document type";
        const nodeName = "1) Home";

        cy.deleteAllContent();
        cy.umbracoEnsureDocumentTypeNameNotExists(rootDocTypeName);
        DeleteAllPackages();
        
        // Create package with content
        const rootDocType = new DocumentTypeBuilder()
            .withName(rootDocTypeName)
            .withAllowAsRoot(true)
            .build();
        
        cy.saveDocumentType(rootDocType).then((generatedRootDocType) => {
            const rootDocTypeAlias = generatedRootDocType["alias"];

            const rootContentNode = new ContentBuilder()
                .withContentTypeAlias(rootDocTypeAlias)
                .withAction("saveNew")
                .addVariant()
                    .withName(nodeName)
                    .withSave(true)
                .done()
                .build();
            cy.saveContent(rootContentNode).then((generatedContent) => {
                CreatePackage(generatedContent.Id);
            });
        });

        cy.umbracoSection('packages');
        cy.contains('Created').click();
        cy.contains('TestPackage').click();
        cy.contains('Download').click();

        // Cleanup
        cy.deleteAllContent();
        cy.umbracoEnsureDocumentTypeNameNotExists(rootDocTypeName);
        DeleteAllPackages();
      });
});