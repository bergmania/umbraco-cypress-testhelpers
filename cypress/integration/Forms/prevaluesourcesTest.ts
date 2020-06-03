/// <reference types="Cypress" />
import faker from 'faker';


import { FormModel } from '../../../src/forms/models/formModel';
import { ShortAnswerField } from '../../../src/forms/models/shortAnswerField';
import { FormBuilderHelper } from '../../../src/forms/builders/helpers/formBuilderHelper';
import { PrevalueSourcesBuilderHelper } from '../../../src/forms/builders/helpers/prevalueSourcesBuilderHelper';

context('Forms Prevalue sources', () => {

    const prevalueSources: PrevalueSourcesBuilderHelper = new PrevalueSourcesBuilderHelper();
    const form: FormBuilderHelper = new FormBuilderHelper();

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
        prevalueSources.cleanUp();
        
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
        const formModel: FormModel = { name: `formTest${faker.random.uuid()}`};
        const shortAnswerFields: ShortAnswerField[] = [{ id: faker.random.uuid(), value: faker.lorem.sentence() }];    
        form.insert({ formBuild: form.build({formModel,shortAnswerFields}), visit: false }).then(f => {
            const name = faker.random.word();
            
            prevalueSources.insertDocument(name, f.formBody.name).then(
                prevalueSource => {
                    cy.visit(`/umbraco#/forms/prevaluesource/edit/${prevalueSource.id}`);
                    cy.dataUmbScope(`settingstype-pickers-fieldPreValueSourceType`).its('preValueSource.fieldPreValueSourceTypeId').should('deep.equal',prevalueSource.fieldPreValueSourceTypeId);                    
                    cy.dataUmbScope(`settingstype-pickers-documenttype`).its('setting.value').should('deep.equal', `${f.formBody.name}`);
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
