/// <reference types="Cypress" />
import {
    DocumentTypeBuilder,
    AliasHelper,
    ApprovedColorPickerDataTypeBuilder,
    ContentBuilder
} from '../../../src';

context('Approved Colour Picker', () => {

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'), false);
      });

    it('Tests Approved Colors', () => {
        cy.deleteAllContent();
        const name = 'Approved Colour Test';
        const alias = AliasHelper.toAlias(name);

        cy.umbracoEnsureDocumentTypeNameNotExists(name);
        cy.umbracoEnsureDataTypeNameNotExists(name);

        const pickerDataType = new ApprovedColorPickerDataTypeBuilder()
            .withName(name)
            .withPrevalues(['000000', 'FF0000'])
            .build()

        //umbracoMakeDocTypeWithDataTypeAndContent(name, alias, pickerDataType);
        cy.umbracoCreateDocTypeWithContent(name, alias, pickerDataType);

        // Act
        // Enter content
        cy.umbracoRefreshContentTree();
        cy.umbracoTreeItem("content", [name]).click();
        //Pick a colour
        cy.get('.btn-000000').click();
        //Save 
        cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
        cy.umbracoSuccessNotification().should('be.visible');
        //Editing template with some content
        cy.editTemplate(name, '@inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.ApprovedColourTest>' +
            '\n@using ContentModels = Umbraco.Web.PublishedModels;' +
            '\n@{' +
            '\n    Layout = null;' +
            '\n}' +
            '\n<p style="color:@Model.UmbracoTest">Lorem ipsum dolor sit amet</p>');
        //Assert
        const expected = `<p style="color:000000" > Lorem ipsum dolor sit amet </p>`;
        cy.umbracoVerifyRenderedViewContent('/', expected, true).should('be.true');

        //Pick another colour to verify both work
        cy.get('.btn-FF0000').click();
        //Save 
        cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
        cy.umbracoSuccessNotification().should('be.visible');
        //Assert
        const expected2 = '<p style="color:FF0000">Lorem ipsum dolor sit amet</p>';
        cy.umbracoVerifyRenderedViewContent('/', expected2, true).should('be.true');

        //Clean
        cy.umbracoEnsureDataTypeNameNotExists(name);
        cy.umbracoEnsureDocumentTypeNameNotExists(name);
        cy.umbracoEnsureTemplateNameNotExists(name);

      });
})