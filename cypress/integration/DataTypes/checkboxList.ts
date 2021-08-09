/// <reference types="Cypress" />
import { exists } from 'fs';
import {
    AliasHelper,
    CheckBoxListDataTypeBuilder
} from '../../../src';


context('Approved Colour Picker', () => {

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'), false);
      });


      it('Tests Checkbox List', () => {
        const name = 'Approved Colour Test';
        const alias = AliasHelper.toAlias(name); 

        cy.umbracoEnsureDocumentTypeNameNotExists(name);
        cy.umbracoEnsureDataTypeNameNotExists(name);

        const pickerDataType = new CheckBoxListDataTypeBuilder()
        .withName(name)
        .withPrevalues(['Choice 1', 'Choice 2'])
        .build()


    });
});