/// <reference types="Cypress" />
import faker from 'faker';
import { PrevalueSources } from '../Shared/prevaluesources';
import { Form } from '../Shared/form';

context('Forms Prevalue sources', () => {

    const prevalueSources: PrevalueSources = new PrevalueSources();
    const form: Form = new Form();

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
        prevalueSources.cleanUp();
        form.cleanUp({});
    });

    afterEach(() => {
        prevalueSources.cleanUp();
        form.cleanUp({});
    });


    it('Test Get value from text file', () => {
        const prevalueName = faker.random.word();
        prevalueSources.insertTextFile(prevalueName).then(prevalueSource => {
            cy.visit(`/umbraco#/forms/prevaluesource/edit/${prevalueSource.id}`);
            cy.dataUmbScope(`settingstype-pickers-fieldPreValueSourceType`).its('preValueSource.fieldPreValueSourceTypeId').should('deep.equal',prevalueSource.fieldPreValueSourceTypeId);
            cy.dataUmb(`settingtypes-fileupload`).should('contain.text','prevaluesourcefile.txt');

            for (let i = 0; i < 5; i++) {
                cy.dataUmb(`prevalueId_${i}`).should('have.text', `${i}`);
                cy.dataUmb(`prevalue_${i}`).should('have.text', `Prevalue${i + 1}`);
            }
        });
    });
    it('Test Umbraco Document type', () => {
        var formObject = form.createMinimalForm();
        form.insertFormOnPage({ form: formObject, visit: false }).then(form => {
            const name = faker.random.word();
            prevalueSources.insertDocument(name, form.id, form.documentType.name).then(
                prevalueSource => {
                    cy.visit(`/umbraco#/forms/prevaluesource/edit/${prevalueSource.id}`);
                    cy.dataUmbScope(`settingstype-pickers-fieldPreValueSourceType`).its('preValueSource.fieldPreValueSourceTypeId').should('deep.equal',prevalueSource.fieldPreValueSourceTypeId);
                    cy.dataUmbScope(`settingstype-pickers-contentwithxpath-input`).its('query').should('deep.equal', `${form.id}`);
                    cy.dataUmbScope(`settingstype-pickers-documenttype`).its('setting.value').should('deep.equal', `${form.documentType.name}`);
                }
            );
        });

    });
    it('Test Umbraco data type Prevalue', () => {
        const name = faker.random.word();
        prevalueSources.insertDataTypePrevalue(name, -88).then(
            prevalueSource => {
                cy.visit(`/umbraco#/forms/prevaluesource/edit/${prevalueSource.id}`); 
                cy.dataUmbScope(`settingstype-pickers-fieldPreValueSourceType`).its('preValueSource.fieldPreValueSourceTypeId').should('deep.equal',prevalueSource.fieldPreValueSourceTypeId);               
                cy.dataUmbScope(`settingstype-pickers-datatype`).its('setting.value').should('deep.equal', `-88`);
            }
        );
    });

});
