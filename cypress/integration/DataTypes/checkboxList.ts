// /// <reference types="Cypress" />
// import { exists } from 'fs';
// import {
//     AliasHelper,
//     CheckBoxListDataTypeBuilder
// } from '../../../src';


// context('Approved Colour Picker', () => {

//     beforeEach(() => {
//         cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'), false);
//       });


//       it('Tests Checkbox List', () => {
//         const name = 'CheckBox List';
//         const alias = AliasHelper.toAlias(name); 

//         cy.umbracoEnsureDocumentTypeNameNotExists(name);
//         cy.umbracoEnsureDataTypeNameNotExists(name);

//         const pickerDataType = new CheckBoxListDataTypeBuilder()
//         .withName(name)
//         .withPrevalues(['Choice 1', 'Choice 2'])
//         .build()

//         cy.umbracoCreateDocTypeWithContent(name, alias, pickerDataType);
//         // Act
//         // Enter content
//         cy.umbracoRefreshContentTree();
//         cy.umbracoTreeItem("content", [name]).click();
//         //Check box 1
//         cy.get(':nth-child(1) > umb-checkbox.ng-isolate-scope > .checkbox > .umb-form-check__symbol > .umb-form-check__state > .umb-form-check__check')
//         .click();
//         //Save
//         cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
//         cy.umbracoSuccessNotification().should('be.visible');
        
//         //Edit template with content
//         cy.editTemplate(name, '@inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.CheckboxList>' +
//         '\n@using ContentModels = Umbraco.Web.PublishedModels;' +
//         '\n@{' +
//         '\n    Layout = null;' +
//         '\n}' +
//         '\n<p>@Model.UmbracoTest</p>');
        

//     });
// });