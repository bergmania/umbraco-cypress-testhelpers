/// <reference types="Cypress" />
import { gzipSync } from 'zlib';
import {
    DocumentTypeBuilder,
    AliasHelper,
} from '../../../src';

context('Tabs', () => { 

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'), false);
      });
    function OpenDocTypeFolder(){
        cy.umbracoSection('settings');
        cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");
        cy.get('[data-element="tree-item-documentTypes"] > .umb-tree-item__inner > .umb-tree-item__arrow > .umb-icon > .umb-icon__inner > ng-transclude > .ng-binding > svg').click();
    }
      // it('Tests the Tabs feature', () => { 

      //   const tabsDocTypeName = 'Tabs Test Document';
      //   const tabsDocTypeAlias = AliasHelper.toAlias(tabsDocTypeName); 

      //   cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        
      //   const tabsDocType = new DocumentTypeBuilder()
      //       .withName(tabsDocTypeName)
      //       .withAlias(tabsDocTypeAlias)
      //       .withAllowAsRoot(true)
      //       .withDefaultTemplate(tabsDocTypeAlias)
      //       .addGroup()
      //           .withName('Tabs1Group')
      //           .addUrlPickerProperty()
      //               .withAlias('picker')
      //           .done()
      //       .done()
      //       .build();

      //   cy.deleteAllContent();
      //   cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      //   cy.saveDocumentType(tabsDocType);
      //   OpenDocTypeFolder();
      //   cy.get('[data-element="tree-item-documentTypes"] > :nth-child(2) > .umb-animated > .umb-tree-item__inner > .umb-tree-item__label').click();
      //   cy.get('.umb-group-builder__tabs__add-tab > .umb-button > .btn').click();
      //   cy.get('ng-form.ng-invalid > .umb-group-builder__group-title-input').type('Tab 1');
        
      //   //Create a 2nd tab manually
      //   cy.get('.umb-group-builder__tabs__add-tab > .umb-button > .btn').click();
      //   cy.get('ng-form.ng-invalid > .umb-group-builder__group-title-input').type('Tab 2');
      //   //Create a textarea property
      //   cy.get('[ng-transclude=""][aria-hidden="false"] > .umb-box-content > .umb-group-builder__group-add-property').click();
      //   cy.get('.editor-label').type('TextProperty')
      //   cy.get('.editor-wrapper > .btn-reset').click();
      //   cy.get('[data-element="datatype-Textarea"] > .btn-reset > :nth-child(1) > .umb-icon > .umb-icon__inner > ng-transclude > .ng-binding > svg').click();
      //   cy.get(':nth-child(1) > li.ng-scope > .btn-reset').click();
      //   cy.get('[alias="submit"] > .umb-button > .btn > .umb-button__content').click();
      //   cy.umbracoButtonByLabelKey('buttons_save').click();
      //   cy.reload();
      //   //Assert
      //   cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').eq(0).should('be.visible');
      //   cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').eq(1).should('be.visible');
      //   //Clean
      //   cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      // });

      // it('Delete tabs', () => { 
      //   const tabsDocTypeName = 'Tabs Test Document';
      //   const tabsDocTypeAlias = AliasHelper.toAlias(tabsDocTypeName); 
      //   cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      //   const tabsDocType = new DocumentTypeBuilder()
      //       .withName(tabsDocTypeName)
      //       .withAlias(tabsDocTypeAlias)
      //       .withAllowAsRoot(true)
      //       .withDefaultTemplate(tabsDocTypeAlias)
      //       .addTab()
      //           .withName('Tab 1')
      //           .addGroup()
      //             .withName('Tab group')
      //             .addUrlPickerProperty()
      //               .withAlias("urlPicker")
      //             .done()
      //           .done()
      //         .addUrlPickerProperty()
      //           .withAlias('picker')
      //         .done()
      //       .done()
      //       .build();
      //   cy.saveDocumentType(tabsDocType);
      //   OpenDocTypeFolder();
      //   cy.get('[data-element="tree-item-documentTypes"] > :nth-child(2) > .umb-animated > .umb-tree-item__inner > .umb-tree-item__label').click();
      //   //Check if there are tabs
      //   cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').should('be.visible');
      //   //Delete a tab
      //   cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab > .umb-group-builder__tab-remove > .btn-reset > .icon-trash').eq(0).click();
      //   cy.get('.umb-overlay-drawer__align-right > .ng-scope.ng-isolate-scope > .umb-button > .btn').click();
      //   cy.umbracoButtonByLabelKey('buttons_save').click();
      //   //Assert
      //   cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').should('not.exist');
      //   //Clean
      //   cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      // });
      it('Orders tab', () => {

        const tabsDocTypeName = 'Tabs Test Document';
        const tabsDocTypeAlias = AliasHelper.toAlias(tabsDocTypeName); 
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group 1')
                  .addUrlPickerProperty()
                    .withLabel('Url picker 1')
                    .withAlias("urlPicker")
                  .done()
                .done()
            .done()
            .addTab()
                .withName('Tab 2')
                .addGroup()
                  .withName('Tab group 2')
                  .addUrlPickerProperty()
                    .withLabel('Url picker 2')
                    .withAlias("pickerTab 2")
                  .done()
                .done()
            .done()
            .addTab()
                .withName('Tab 3')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withLabel('Url picker 3')
                    .withAlias('pickerTab3')
                  .done()
                .done()
            .done()
            .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('[data-element="tree-item-documentTypes"] > :nth-child(2) > .umb-animated > .umb-tree-item__inner > .umb-tree-item__label').click();
        //Check if there are any tabs
        cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').should('be.visible');
        cy.get('[alias="reorder"] > .umb-button > .btn').click();
        //Drag and drop
        cy.get('.umb-group-builder__tab-title-icon').eq(1).trigger('mousedown', { which: 1 });
        cy.get('.umb-group-builder__tab-title-icon').eq(0).trigger("mousemove").trigger("mouseup",{force: true});
        cy.umbracoButtonByLabelKey('buttons_save').click();
      });

})