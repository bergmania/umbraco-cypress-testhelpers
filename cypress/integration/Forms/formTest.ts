/// <reference types="Cypress" />
import faker from 'faker';
import { Builder } from '../../../src';
import { Form } from '../Shared/form';
import { FormModel } from '../Shared/Models/formModel';
import { SendEmailRazorWorkflow } from '../Shared/Workflows/sendEmailRazorWorkflow';
import { CheckboxField } from '../Shared/Models/checkboxField';
import { ShortAnswerField } from '../Shared/Models/shortAnswerField';
import { LongAnswerField } from '../Shared/Models/longAnswerField';
import { PasswordField } from '../Shared/Models/passwordField';
import { DateField } from '../Shared/Models/dateField';
import { Workflow } from '../Shared/Models/workflow';
import { SaveAsUmbracoContentNodeWorkflow } from '../Shared/Workflows/saveAsUmbracoContentNodeWorkflow';
import { SendEmailWorkflow } from '../Shared/Workflows/sendEmailWorkflow';
import { ChangeRecordStateWorkflow } from '../Shared/Workflows/changeRecordStateWorkflow';
import { PostAsXMLWorkflow } from '../Shared/Workflows/postAsXMLWorkflow';
import { SendFormToUrl } from '../Shared/Workflows/sendFormToUrl';
import { SendXsltTransformedEmail } from '../Shared/Workflows/sendXsltTransformedEmail';
import { SendEmailRazorModel } from '../Shared/Models/sendEmailRazorModel';

context('Forms', () => {
   
  const form: Form = new Form();

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
    form.cleanUp({});
  });

  afterEach(() => {
    form.cleanUp({});
  });

  it.skip('Test form submitting', () => {

    const formModel: FormModel = { name: `${form.formPrefix}${faker.random.uuid()}`};
    const shortAnswerFields: ShortAnswerField[] = [{ id: faker.random.uuid(), value: faker.lorem.sentence() }];
    const longAnswerFields: LongAnswerField[] = [{ id: faker.random.uuid(), value: faker.lorem.sentence() }];
    const passwordFields: PasswordField[] = [ { id: faker.random.uuid(), value: faker.random.alphaNumeric(12) }];
    const checkboxFields: CheckboxField[] = [ { id: faker.random.uuid() }];
    const dateFields: DateField[] = [ { id: faker.random.uuid() }];

    const workflows: Workflow[] =[new SendEmailRazorWorkflow().getWorkflow({workflowName: formModel.name})];
    
    form.insertFormOnPage({ formBuild: form.buildForm({formModel, workflows,shortAnswerFields,longAnswerFields,passwordFields,checkboxFields,dateFields}) }).then((p) => {      
      cy.dataUmb(shortAnswerFields[0].id).should('be.visible');
      cy.dataUmb(longAnswerFields[0].id).should('be.visible');
      cy.dataUmb(passwordFields[0].id).should('be.visible');
      cy.dataUmb(checkboxFields[0].id).should('be.visible');
      cy.dataUmb(dateFields[0].id).should('not.be.visible');

      // Short answer
      cy.dataUmb(shortAnswerFields[0].id).type(shortAnswerFields[0].value).blur();

      // Long answer
      cy.dataUmb(longAnswerFields[0].id).type(longAnswerFields[0].value).blur();

      // Password
      cy.dataUmb(passwordFields[0].id).type(passwordFields[0].value).blur();

      // Checkbox
      cy.dataUmb(checkboxFields[0].id).check();

      // Date
      cy.dataUmb(`${dateFields[0].id}_1`).focus();
      cy.get("div.pika-lendar").should('be.visible');
      cy.get(".pika-button.pika-day").first().click();
      cy.get("div.pika-lendar").should('not.be.visible');

      // Submit
      cy.get('form').submit();

      // Thank you message
      cy.get('.umbraco-forms-submitmessage').should('be.visible');

      // Visit entries
      cy.visit('/umbraco/#/forms/form/entries/' + p.formBody.id);

      // Click first (newest)
      cy.get('.umb-table-body__link').first().click();

      // Verify field values
      cy.dataUmb('label_' + shortAnswerFields[0].id).should('have.text', shortAnswerFields[0].id);
      cy.dataUmb(shortAnswerFields[0].id).should('contain.text', shortAnswerFields[0].value);

      cy.dataUmb('label_' + longAnswerFields[0].id).should('have.text', longAnswerFields[0].id);
      cy.dataUmb(longAnswerFields[0].id).should('contain.text', longAnswerFields[0].value);

      cy.dataUmb('label_' + checkboxFields[0].id).should('have.text', checkboxFields[0].id);
      cy.dataUmb(checkboxFields[0].id).should('contain.text', "True");

      cy.dataUmb('label_' + dateFields[0].id).should('have.text', dateFields[0].id);
      const d = new Date();
      const datestring = (d.getMonth() + 1) + "/" + 1 + "/" + d.getFullYear() + " 12:00:00 AM";
      cy.dataUmb(dateFields[0].id).should('contain.text', datestring + '\n');


      cy.visit('/umbraco/#/forms/form/edit/' + p.formBody.id);
      // Verify that the workflow is attached
      cy.dataUmb(formModel.name).should('have.text', formModel.name);

    });
  });

  it('Test Send email with template (Razor)',()=>{
    const formModel: FormModel = { name: `${form.formPrefix}${faker.random.uuid()}`};
    const shortAnswerId1 =faker.random.uuid();
    const shortAnswerId2 =faker.random.uuid();
    
    const shortAnswerFields: ShortAnswerField[] = [
      { id: shortAnswerId1, caption:'Sender Email', alias:'senderEmail' },
      { id: shortAnswerId2, caption:'Receiver Email', alias:'ReceiverEmail' }
    ];

    const razorSendEmailRazorModel = new SendEmailRazorModel(formModel.name);    
    razorSendEmailRazorModel.email ='{ReceiverEmail}';
    razorSendEmailRazorModel.senderEmail='{senderEmail}';
    const workflows: Workflow[] =[new SendEmailRazorWorkflow().getWorkflow(
      razorSendEmailRazorModel      
    )];

    form.insertFormOnPage({ formBuild: form.buildForm({formModel,workflows,shortAnswerFields})}).then(p=>{
      cy.dataUmb(shortAnswerId1).type(faker.internet.email());
      cy.dataUmb(shortAnswerId2).type(faker.internet.email());
      cy.dataUmb('submit-forms-form').click();
    });
  });
  it.skip('Field actions can cancel and delete', () => {
    const formModel: FormModel = { name: `${form.formPrefix}${faker.random.uuid()}`};
    const shortAnswerFields: ShortAnswerField[] = [{ id: faker.random.uuid(), value: faker.lorem.sentence() }];

    form.insertForm(form.buildForm({formModel, shortAnswerFields})).then((formbody) => {
      cy.visit(`/umbraco/#/forms/form/edit/${formbody.id}`);
      // Cancel
      cy.dataUmb('delete_0_0_0').click();
      cy.dataUmb('confirm_0_0_0').children().last().click();
      cy.dataUmbScope('field_name_0_0_0').its('field.caption').should('');
      // Delete
      cy.dataUmb('delete_0_0_0').click();
      cy.dataUmb('confirm_0_0_0').children().first().click();
      cy.get('field_name_0_0_0').should('not.exist');
    });
  });
  it.skip('Required field values can not be empty', () => {
    const formModel: FormModel = { name: `${form.formPrefix}${faker.random.uuid()}`};
    form.insertForm(form.buildForm({formModel})).then((formbody) => {
      cy.visit(`/umbraco/#/forms/form/edit/${formbody.id}`);
      cy.get('field-setting-editor').should('not.exist');
      cy.dataUmb('forms-add-question').click();
      cy.dataUmb('field-settings-submit').click();
      // Test that the dialog didn't close
      cy.dataUmb('field-setting-editor').should('exist');
      // Fill out some values
      cy.dataUmb('field-settings-enter-question').type(faker.random.word()).blur();
      cy.dataUmb('field-settings-submit').click();
      // Test that the dialog didn't close
      cy.dataUmb('field-setting-editor').should('exist');
      cy.dataUmb('field-settings-choose-answer-type').click();
      cy.dataUmb('field-type-picker-fieldType_0').click();
      cy.dataUmb('field-settings-submit').click();
      // Test that the dialog closed
      cy.dataUmb('field-setting-editor').should('not.exist');

    });
  });
    it.skip('Test HideAll Contains conditions', () => {
      const text1ToInsert = 'test';
      const text2ToInsert = 'asdasd';
      const shortAnswer1Id = faker.random.uuid();
      const shortAnswer2Id = faker.random.uuid();
      const shortAnswer3Id = faker.random.uuid();
      const formModel: FormModel = { name: `${this.form.formPrefix}${faker.random.uuid()}`};     
      const form = new Builder().Form()
        .withName(formModel.name)
        .addPage()
        .addFieldSet()
        .addContainer()
        .addShortAnswerField()
        .withId(shortAnswer1Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer2Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer3Id)
        .addHideAllConditions()
        .addRule()
        .withContainsRule(shortAnswer1Id, text1ToInsert)
        .withContainsRule(shortAnswer2Id, text2ToInsert)
        .done()
        .done()
        .done()
        .done()
        .done()
        .done()
        .build();

      form.insertFormOnPage({ form }).then(() => {
        cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
        cy.get("input[name='" + shortAnswer1Id + "']").type(text1ToInsert + faker.random.uuid()).blur();
        cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
        cy.get("input[name='" + shortAnswer2Id + "']").type(text2ToInsert + faker.random.uuid()).blur();
        cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
      });
    });

    it.skip('Test HideAny Contains conditions', () => {
      const text1ToInsert = 'test';
      const text2ToInsert = 'asdasd';
      const shortAnswer1Id = faker.random.uuid();
      const shortAnswer2Id = faker.random.uuid();
      const shortAnswer3Id = faker.random.uuid();
      const formModel: FormModel = { name: `${this.form.formPrefix}${faker.random.uuid()}`};     
      const form = new Builder().Form()
      .withName(formModel.name)
        .addPage()
        .addFieldSet()
        .addContainer()
        .addShortAnswerField()
        .withId(shortAnswer1Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer2Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer3Id)
        .addHideAnyConditions()
        .addRule()
        .withContainsRule(shortAnswer1Id, text1ToInsert)
        .withContainsRule(shortAnswer2Id, text2ToInsert)
        .done()
        .done()
        .done()
        .done()
        .done()
        .done()
        .build();

      form.insertFormOnPage(form).then(() => {
        cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
        cy.get("input[name='" + shortAnswer1Id + "']").type(text1ToInsert + faker.random.uuid()).blur();
        cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
        cy.get("input[name='" + shortAnswer2Id + "']").type(text2ToInsert + faker.random.uuid()).blur();
        cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
      });
    });

    it.skip('Test ShowAll Contains condition', () => {
      const text1ToInsert = 'test';
      const text2ToInsert = 'asdasd';
      const shortAnswer1Id = faker.random.uuid();
      const shortAnswer2Id = faker.random.uuid();
      const shortAnswer3Id = faker.random.uuid();
      const formModel: FormModel = { name: `${this.form.formPrefix}${faker.random.uuid()}`}; 
      const form = new Builder().Form()
      .withName(formModel.name)
        .addPage()
        .addFieldSet()
        .addContainer()
        .addShortAnswerField()
        .withId(shortAnswer1Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer2Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer3Id)
        .addShowAllConditions()
        .addRule()
        .withContainsRule(shortAnswer1Id, text1ToInsert)
        .withContainsRule(shortAnswer2Id, text2ToInsert)
        .done()
        .done()
        .done()
        .done()
        .done()
        .done()
        .build();

      form.insertFormOnPage({ form }).then(() => {
        cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
        cy.get("input[name='" + shortAnswer1Id + "']").type(text1ToInsert + faker.random.uuid()).blur();
        cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
        cy.get("input[name='" + shortAnswer2Id + "']").type(text2ToInsert + faker.random.uuid()).blur();
        cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
      });
    });

    it.skip('Test ShowAny Contains condition', () => {
      const text1ToInsert = 'test';
      const text2ToInsert = 'asdasd';
      const shortAnswer1Id = faker.random.uuid();
      const shortAnswer2Id = faker.random.uuid();
      const shortAnswer3Id = faker.random.uuid();
      const formModel: FormModel = { name: `${this.form.formPrefix}${faker.random.uuid()}`}; 
      const form = new Builder().Form()
      .withName(formModel.name)
        .addPage()
        .addFieldSet()
        .addContainer()
        .addShortAnswerField()
        .withId(shortAnswer1Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer2Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer3Id)
        .addShowAnyConditions()
        .addRule()
        .withContainsRule(shortAnswer1Id, text1ToInsert)
        .withContainsRule(shortAnswer2Id, text2ToInsert)
        .done()
        .done()
        .done()
        .done()
        .done()
        .done()
        .build();

      form.insertFormOnPage({ form }).then(() => {
        cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
        cy.get("input[name='" + shortAnswer1Id + "']").type(text1ToInsert + faker.random.uuid()).blur();
        cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
        cy.get("input[name='" + shortAnswer2Id + "']").type(text2ToInsert + faker.random.uuid()).blur();
        cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
      });
    });

    it.skip('Test field with contains condition on another page', () => {
      const textToInsert = 'test';
      const shortAnswer1Id = faker.random.uuid();
      const shortAnswer2Id = faker.random.uuid();
      const shortAnswer3Id = faker.random.uuid();
      const formModel: FormModel = { name: `${this.form.formPrefix}${faker.random.uuid()}`};
      const form = new Builder().Form()
      .withName(formModel.name)
        .addPage()
        .addFieldSet()
        .addContainer()
        .addShortAnswerField()
        .withId(shortAnswer1Id)
        .done()
        .done()
        .done()
        .done()
        .addPage()
        .addFieldSet()
        .addContainer()
        .addShortAnswerField()
        .withId(shortAnswer2Id)
        .done()
        .addShortAnswerField()
        .withId(shortAnswer3Id)
        .addShowAllConditions()
        .addRule()
        .withContainsRule(shortAnswer1Id, textToInsert)
        .done()
        .done()
        .done()
        .done()
        .done()
        .done()
        .build();

      form.insertFormOnPage({ form }).then(() => {
        cy.get("input[name='" + shortAnswer1Id + "']").type("not the expected text").blur();
        cy.get("input[value='Next']").click();
        cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
        cy.get("input[value='Previous']").click();
        cy.get("input[name='" + shortAnswer1Id + "']").type(textToInsert + faker.random.uuid()).blur();
        cy.get("input[value='Next']").click();
        cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
      });
    })
  });
