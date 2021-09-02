/// <reference types="Cypress" />
import { triggerAsyncId } from 'async_hooks';
import { createPublicKey } from 'crypto';
import { TIMEOUT } from 'dns';
import { gzipSync } from 'zlib';
import {
    DocumentTypeBuilder,
    AliasHelper,
} from '../../../src';
const tabsDocTypeName = 'Tabs Test Document';
const tabsDocTypeAlias = AliasHelper.toAlias(tabsDocTypeName); 
context('Tabs', () => { 

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'), false);
      });
    function OpenDocTypeFolder(){
        cy.umbracoSection('settings');
        cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");
        cy.get('.umb-tree-item__inner > .umb-tree-item__arrow').eq(0).click();
        cy.wait(1000);
    }
    function CreateDocWithTabAndNavigate(){
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withAlias("urlPicker")
                  .done()
                .done()
            .done()
          .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        // cy.umbracoTreeItem("settings", [tabsDocTypeName]).click(); should work on a faster computer
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
    }
      it('Create tab', () => { 
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addGroup()
                .withName('Tabs1Group')
                .addUrlPickerProperty()
                    .withAlias('picker')
                .done()
            .done()
            .build();

        cy.deleteAllContent();
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        // cy.umbracoTreeItem("settings", [tabsDocTypeName]).click(); should work on a faster computer
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        cy.get('.umb-group-builder__tabs__add-tab > .umb-button > .btn').click();
        cy.get('ng-form.ng-invalid > .umb-group-builder__group-title-input').type('Tab 1');
        //Create a 2nd tab manually
        cy.get('.umb-group-builder__tabs__add-tab > .umb-button > .btn').click();
        cy.get('ng-form.ng-invalid > .umb-group-builder__group-title-input').type('Tab 2');
        //Create a textstring property
        cy.get('[aria-hidden="false"] > .umb-box-content > .umb-group-builder__group-add-property').click();
        // This is how we do it in doctypetest, but doesn't work in tabs cause we have multiple buttons that are inactive cy.get('[data-element="property-add"]').last().click();
        cy.get('.editor-label').type('property name');
        cy.get('[data-element="editor-add"]').click();

        //Search for textstring
        cy.get('#datatype-search').type('Textstring');

        // Choose first item
        cy.get('ul.umb-card-grid li [title="Textstring"]').closest("li").click();

        // Save property
        cy.get('.btn-success').last().click();
        cy.umbracoButtonByLabelKey('buttons_save').click();
        //Reload page to make sure tabs are saved
        cy.reload();
        //Assert
        cy.get('.umb-group-builder__group-title-input').eq(0).invoke('attr', 'title').should('eq', 'tab1');
        cy.get('.umb-group-builder__group-title-input').eq(1).invoke('attr', 'title').should('eq', 'tab2');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });

      it('Delete tabs', () => { 
        CreateDocWithTabAndNavigate();
        //Check if there are tabs
        cy.get('.umb-group-builder__group-title-input').should('be.visible');
        //Delete a tab
        cy.get('.btn-reset > .icon-trash').click();
        cy.get('.umb-button > .btn').last().click();
        cy.umbracoButtonByLabelKey('buttons_save').click();
        //Assert
        cy.get('.umb-group-builder__group-title-input').should('not.exist');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Delete property in tab', () => {
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withAlias("urlPicker")
                  .done()
                  .addContentPickerProperty()
                    .withAlias('picker')
                  .done()
                .done()
            .done()
            .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('.umb-tree-item__label').contains(tabsDocTypeName).click();
        cy.get('.umb-group-builder__property-action.ng-scope > .btn-icon').last().click();
        cy.umbracoButtonByLabelKey('actions_delete').click();
        //Assert
        cy.get('.umb-group-builder__property').eq(0).should('exist');
        cy.get('.umb-group-builder__property').eq(1).should('not.exist');
        cy.get('.umb-group-builder__group-title-input').invoke('attr', 'title').should('eq', 'aTab 1')
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);

      });
      it('Delete group in tab', () => {
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withAlias("urlPicker")
                  .done()
                .done()
                .addGroup()
                  .withName('Content Picker Group')
                  .addContentPickerProperty()
                    .withAlias('picker')
                  .done()
                .done()
            .done()
            .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        cy.get('umb-content-type-group.ng-scope > .umb-group-builder__group > .umb-group-builder__group-title-wrapper > .umb-group-builder__group-remove > .icon-trash').eq(1).click();
        cy.umbracoButtonByLabelKey('actions_delete').click();
        //Assert
        cy.get('.umb-group-builder__property').eq(0).should('exist');
        cy.get('.umb-group-builder__property').eq(1).should('not.exist');
        cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').invoke('attr', 'title').should('eq', 'aTab 1')
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);

      });
      it('Reorders tab', () => {
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
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        //Check if there are any tabs
        cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').should('be.visible');
        cy.get('[alias="reorder"] > .umb-button > .btn').click();
        //Type order in
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab > :nth-child(1) > .umb-group-builder__tab-title-wrapper > [name="tabSortOrderForm"] > .umb-group-builder__tab-sort-order > .umb-property-editor-tiny').eq(0).type('3');
        cy.get('[alias="reorder"] > .umb-button > .btn > .umb-button__content').click();
        //Assert
        cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').eq(0).invoke('attr', 'title').should('eq', 'aTab 2')
        cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').eq(1).invoke('attr', 'title').should('eq', 'aTab 3')
        cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').eq(2).invoke('attr', 'title').should('eq', 'aTab 1')
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Reorders groups in a tab', () => {
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
                .addGroup()
                  .withName('Tab group 2')
                  .addUrlPickerProperty()
                    .withLabel('Url picker 2')
                    .withAlias('urlPickerTwo')
                  .done()
                .done()
            .done()
            .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        cy.get('[alias="reorder"] > .umb-button > .btn').click();
        cy.get(' umb-content-type-group.ng-scope > .umb-group-builder__group > .umb-group-builder__group-title-wrapper > .umb-group-builder__group-title-right > .umb-group-builder__group-sort-order > .ng-scope > .umb-property-editor-tiny').eq(1).type('1');
        cy.umbracoButtonByLabelKey('buttons_save').click();
        cy.get('[alias="reorder"] > .umb-button > .btn > .umb-button__content').click();
        //Assert
        cy.get('umb-content-type-group.ng-scope > .umb-group-builder__group > .umb-group-builder__group-title-wrapper > ng-form.ng-valid-required > .umb-group-builder__group-title > .umb-group-builder__group-title-input').eq(1)
        .invoke('attr', 'title').should('eq', 'aTab 1/aTab group 2');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      })
         it('Reorders properties in a tab', () => {
          cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
          const tabsDocType = new DocumentTypeBuilder()
              .withName(tabsDocTypeName)
              .withAlias(tabsDocTypeAlias)
              .withAllowAsRoot(true)
              .withDefaultTemplate(tabsDocTypeAlias)
              .addTab()
                  .withName('Tab 1')
                  .addGroup()
                    .withName('Tab group')
                    .addUrlPickerProperty()
                      .withLabel('PickerOne')
                      .withAlias("urlPicker")
                    .done()
                    .addUrlPickerProperty()
                      .withLabel('PickerTwo')
                      .withAlias('urlPickerTwo')
                    .done()
                  .done()
              .done()
            .build();
          cy.saveDocumentType(tabsDocType);
          OpenDocTypeFolder();
          cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
          cy.get('[alias="reorder"] > .umb-button > .btn').click();
          cy.get(':nth-child(1) > .ng-isolate-scope > .umb-group-builder__property > .umb-group-builder__property-meta > .flex > .umb-group-builder__group-sort-value').clear().type('2');
          cy.get('[alias="reorder"] > .umb-button > .btn > .umb-button__content').click();
          //Assert
          cy.get(':nth-child(1) > [name="propertyTypeForm"] > .control-group > .umb-locked-field > .umb-locked-field__wrapper > .umb-locked-field__input')
          .invoke('attr', 'title').should('eq', 'urlPickerTwo');
         })
      it('Tab name cannot be empty', () => {
        CreateDocWithTabAndNavigate();
        cy.get('ng-form.ng-valid-required > .umb-group-builder__group-title-input').clear();
        cy.umbracoButtonByLabelKey('buttons_save').click();
        //Assert
        cy.umbracoErrorNotification().should('exist');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Two tabs cannot have the same name', () => {
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withAlias("urlPicker")
                  .done()
                .done()
            .done()
          .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        //Create a 2nd tab manually
        cy.get('.umb-group-builder__tabs__add-tab > .umb-button > .btn').click();
        cy.get('ng-form.ng-invalid > .umb-group-builder__group-title-input').type('Tab 1');
        cy.umbracoButtonByLabelKey('buttons_save').click();
        //Assert
        cy.umbracoErrorNotification().should('exist');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Group name cannot be empty', () => {
        CreateDocWithTabAndNavigate();
        cy.get('.clearfix > .-placeholder').click();
        cy.umbracoButtonByLabelKey('buttons_save').click();
        //Assert
        cy.umbracoErrorNotification().should('exist');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Group name cannot have the same name', () => {
        CreateDocWithTabAndNavigate();
        cy.get('.clearfix > .-placeholder').click();
        cy.get('ng-form.ng-invalid > .umb-group-builder__group-title > .umb-group-builder__group-title-input').type('Tab group');
        cy.umbracoButtonByLabelKey('buttons_save').click();
        //Assert
        cy.umbracoErrorNotification().should('exist');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Drag a group into another tab', () => {
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withAlias("urlPicker")
                  .done()
                .done()
            .done()
            .addTab()
              .withName('Tab 2')
              .addGroup()
                .withName('Tab group tab 2')
                .addUrlPickerProperty()
                  .withAlias('urlPickerTabTwo')
                .done()
              .done()
              .addGroup()
                  .withName('Tab group 2')
                  .addUrlPickerProperty()
                    .withAlias('urlPickerTwo')
                  .done()
                .done()
            .done()
          .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        cy.get('[alias="reorder"] > .umb-button > .btn').click();
        cy.get('.umb-group-builder__tabs-overflow--right > .caret').click().click();
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab').eq(2).click();
        cy.get('umb-content-type-group.ng-scope > .umb-group-builder__group > .umb-group-builder__group-title-wrapper > ng-form.ng-valid-val-server-field > .umb-group-builder__group-title > .umb-group-builder__group-title-icon').eq(4).trigger('mousedown', { which: 1 })
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab').eq(1).trigger('mousemove', {which: 1, force: true});
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab').eq(1).should('have.class', 'is-active').trigger('mouseup', {force:true});
        //Assert
        cy.umbracoButtonByLabelKey('buttons_save');
        cy.get('umb-content-type-group.ng-scope > .umb-group-builder__group > .umb-group-builder__group-title-wrapper > ng-form.ng-valid-val-server-field > .umb-group-builder__group-title > .umb-group-builder__group-title-input')
        .eq(4).invoke('attr', 'title').should('eq', ('aTab 1/aTab group 2'))
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Drag and drop reorders a tab', () => {
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withAlias("urlPicker")
                  .done()
                .done()
            .done()
            .addTab()
              .withName('Tab 2')
              .addGroup()
                .withName('Tab group tab 2')
                .addUrlPickerProperty()
                  .withAlias('urlPickerTabTwo')
                .done()
              .done()
              .addGroup()
                  .withName('Tab group 2')
                  .addUrlPickerProperty()
                    .withAlias('urlPickerTwo')
                  .done()
                .done()
            .done()
          .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        cy.get('[alias="reorder"] > .umb-button > .btn').click();
        //Scroll right so we can see tab 2
        cy.get('.umb-group-builder__tabs-overflow--right > .caret').click().click();
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab > :nth-child(1) > .umb-group-builder__tab-title-wrapper > .umb-group-builder__tab-title-icon').eq(1).trigger('mousedown', { which: 1 })
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab').eq(1).trigger('mousemove', {which: 1, force: true});
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab').eq(1).should('have.class', 'is-active').trigger('mouseup', {force:true});
        //Assert
        cy.umbracoButtonByLabelKey('buttons_save');
        // cy.get('umb-content-type-group.ng-scope > .umb-group-builder__group > .umb-group-builder__group-title-wrapper > ng-form.ng-valid-val-server-field > .umb-group-builder__group-title > .umb-group-builder__group-title-input')
        // .eq(4).invoke('attr', 'title').should('eq', ('aTab 1/aTab group 2'))
        cy.get('[alias="reorder"] > .umb-button > .btn').click();
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab > :nth-child(1) > .umb-group-builder__tab-title-wrapper > ng-form.ng-valid-required > .umb-group-builder__group-title-input').eq(0).invoke('attr', 'title').should('eq', 'aTab 2');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Drags and drops a property in a tab', () => {
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withAlias("urlPicker")
                    .withLabel('UrlPickerOne')
                  .done()
                .done()
            .done()
            .addTab()
              .withName('Tab 2')
              .addGroup()
                .withName('Tab group tab 2')
                .addUrlPickerProperty()
                  .withAlias('urlPickerTabTwo')
                  .withLabel('UrlPickerTabTwo')
                .done()
                .addUrlPickerProperty()
                    .withAlias('urlPickerTwo')
                    .withLabel('UrlPickerTwo')
                  .done()
              .done()
            .done()
          .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        cy.get('[alias="reorder"] > .umb-button > .btn').click();
        cy.get('.umb-group-builder__tabs-overflow--right > .caret').click().click();
        //Navigate to tab 2
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab').eq(2).click();
        cy.get(':nth-child(1) > .ng-isolate-scope > .umb-group-builder__property > .umb-group-builder__property-meta > .flex > .icon')
        .eq(1).trigger('mousedown', {which: 1})
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab').eq(1).trigger('mousemove', {which: 1, force: true});
        cy.get('umb-content-type-tab.ng-isolate-scope > .umb-group-builder__tab').eq(1).should('have.class', 'is-active');
        cy.get('.umb-group-builder__property > .umb-group-builder__property-meta > .flex')
        .eq(0).trigger('mousemove', {which: 1, force: true}).trigger('mouseup', {which: 1, force:true});
        cy.get('[alias="reorder"] > .umb-button > .btn > .umb-button__content').click();
        //Assert
        cy.get('[name="propertyTypeForm"] > .control-group > .umb-locked-field > .umb-locked-field__wrapper > .umb-locked-field__input').eq(1).invoke('attr', 'title').should('eq', 'urlPickerTabTwo');
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
      it('Drags and drops a group and converts to tab', () => {
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
        const tabsDocType = new DocumentTypeBuilder()
            .withName(tabsDocTypeName)
            .withAlias(tabsDocTypeAlias)
            .withAllowAsRoot(true)
            .withDefaultTemplate(tabsDocTypeAlias)
            .addTab()
                .withName('Tab 1')
                .addGroup()
                  .withName('Tab group')
                  .addUrlPickerProperty()
                    .withAlias("urlPicker")
                    .withLabel('UrlPickerOne')
                  .done()
                .done()
                .addGroup()
                .withName('Tab group 2')
                .addUrlPickerProperty()
                    .withAlias('urlPickerTwo')
                    .withLabel('UrlPickerTwo')
                  .done()
              .done()
            .done()
            .addTab()
              .withName('Tab 2')
              .addGroup()
                .withName('Tab group tab 2')
                .addUrlPickerProperty()
                  .withAlias('urlPickerTabTwo')
                  .withLabel('UrlPickerTabTwo')
                .done()
              .done()
            .done()
          .build();
        cy.saveDocumentType(tabsDocType);
        OpenDocTypeFolder();
        cy.get('.umb-tree-item__inner > .umb-tree-item__label').contains(tabsDocTypeName).click();
        cy.get('[alias="reorder"] > .umb-button > .btn').click();
        cy.get('umb-content-type-group.ng-scope > .umb-group-builder__group > .umb-group-builder__group-title-wrapper > ng-form.ng-valid-val-server-field > .umb-group-builder__group-title > .umb-group-builder__group-title-icon')
        .eq(1).trigger('mousedown', {which: 1})
        cy.get('.umb-group-builder__convert-dropzone').trigger('mousemove', {which: 1, force: true});
        cy.get('.umb-group-builder__convert-dropzone').trigger('mouseup', {which: 1, force:true});
        cy.get(':nth-child(1) > .umb-group-builder__tab-title-wrapper > ng-form.ng-valid-val-server-field > .umb-group-builder__group-title-input').eq(2).invoke('attr', 'title').should('eq', 'tabGroup');
        //Clean
        //Clean
        cy.umbracoEnsureDocumentTypeNameNotExists(tabsDocTypeName);
      });
});