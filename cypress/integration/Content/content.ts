/// <reference types="Cypress" />
import { DocumentTypeBuilder, ContentBuilder, AliasHelper } from '../../../src';
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
        const pickerDocTypeName = 'Content Picker Type';
        const groupName = 'ContentPickerGroup';
        const alias = AliasHelper.toAlias(pickerDocTypeName);
        const pickedDocTypeName = 'Picked Content Type';
        const pickedNodeName = 'Content to pick';

        cy.umbracoEnsureDocumentTypeNameNotExists(pickerDocTypeName);
        cy.umbracoEnsureTemplateNameNotExists(pickerDocTypeName);
        cy.umbracoEnsureDocumentTypeNameNotExists(pickedDocTypeName);

        // Create the content type and content we'll be picking from.
        const pickedDocType = new DocumentTypeBuilder()
            .withName(pickedDocTypeName)
            .withAllowAsRoot(true)
            .addGroup()
            .addTextBoxProperty()
            .withAlias('text')
            .done()
            .done()
            .build();
            
        cy.saveDocumentType(pickedDocType).then((generatedType) => {
            const pickedContentNode = new ContentBuilder()
                .withContentTypeAlias(generatedType["alias"])
                .withAction("publishNew")
                .addVariant()
                .withName(pickedNodeName)
                .withSave(true)
                .withPublish(true)
                .addProperty()
                .withAlias('text')
                .withValue('Acceptance test')
                .done()
                .withSave(true)
                .withPublish(true)
                .done()
                .build();
            cy.saveContent(pickedContentNode);
        });

        // Create the doctype with a the picker
        const pickerDocType = new DocumentTypeBuilder()
            .withName(pickerDocTypeName)
            .withAlias(alias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(alias)
            .addGroup()
            .withName(groupName)
            .addContentPickerProperty()
            .withAlias('picker')
            .done()
            .done()
            .build();

        cy.saveDocumentType(pickerDocType);

        // Edit it the template to allow us to verify the rendered view.
        cy.editTemplate(pickerDocTypeName, `@inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.ContentPickerType>
        @using ContentModels = Umbraco.Web.PublishedModels;
        @{
            Layout = null;
        }
        
        @{
            IPublishedContent typedContentPicker = Model.Value<IPublishedContent>("picker");
            if (typedContentPicker != null)
            {
                <p>@typedContentPicker.Value("text")</p>
            }
        }`);

        // Create content with content picker
        cy.get('.umb-tree-root-link').rightclick();
        cy.get('.-opens-dialog > .umb-action-link').click();
        cy.get('[data-element="action-create-contentPickerType"] > .umb-action-link').click();
        // Fill out content
        cy.umbracoEditorHeaderName('ContentPickerContent');
        cy.get('.umb-node-preview-add').click();
        // Should really try and find a better way to do this, but umbracoTreeItem tries to click the content pane in the background
        cy.get('[ng-if="vm.treeReady"] > .umb-tree > [ng-if="!tree.root.containsGroups"] > .umb-animated > .umb-tree-item__inner').click();
        // We have to wait for the picked content to show up or it wont be added.
        cy.get('.umb-node-preview__description').should('be.visible');
        //save and publish
        cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
        cy.umbracoSuccessNotification().should('be.visible');

        // Assert
        const expectedContent = '<p>Acceptance test</p>'
        cy.umbracoVerifyRenderedViewContent('contentpickercontent', expectedContent, true).should('be.true');
        // clean
        cy.umbracoEnsureDocumentTypeNameNotExists(pickerDocTypeName);
        cy.umbracoEnsureTemplateNameNotExists(pickerDocTypeName);
        cy.umbracoEnsureDocumentTypeNameNotExists(pickedDocTypeName);
    });
});
