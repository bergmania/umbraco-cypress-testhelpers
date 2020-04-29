/// <reference types="Cypress" />
import faker from 'faker';
import { Builder } from '../../../src';
import { Form } from '../Shared/form';

context('Forms', () => {
  const formPrefix = "formTest";

  const formName = formPrefix + faker.random.uuid();

  const form: Form = new Form();

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
    form.cleanUp({});
  });

  afterEach(() => {
    form.cleanUp({});
  });

  it('Test form submitting', () => {
    const shortAnswerId = faker.random.uuid();
    const shortAnswerValue = faker.lorem.sentence();

    const longAnswerId = faker.random.uuid();
    const longAnswerValue = faker.lorem.paragraph();

    const passwordId = faker.random.uuid();
    const passwordValue = faker.random.alphaNumeric(12);

    const checkboxId = faker.random.uuid();

    const dateId = faker.random.uuid();

    const workflowName = faker.random.word();

    const form = new Builder().Form()
      .withName(formName)
      // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows      
      .addFormWorkflowType(0)
      .addSetting({ name: 'Email', value: faker.internet.email() })
      .addSetting({ name: 'SenderEmail', value: faker.internet.email() })
      .addSetting({ name: 'Subject', value: faker.random.word() })
      .addSetting({ name: 'RazorViewFilePath', value: 'Forms/Emails/Example-Template.cshtml' })
      .addSetting({ name: 'Attachment', value: '' })
      .withWorkflowTypeId('17c61629-d984-4e86-b43b-a8407b3efea9')
      .withIncludeSensitiveData(false)
      .withName(workflowName)
      .done()
      .addPage()
      .addFieldSet()
      .addContainer()
      .addShortAnswerField()
      .withId(shortAnswerId)
      .done()
      .addLongAnswerField()
      .withId(longAnswerId)
      .done()
      .addPasswordField()
      .withId(passwordId)
      .done()
      .addCheckboxField()
      .withId(checkboxId)
      .done()
      .addDateField()
      .withId(dateId)
      .done()
      .done()
      .done()
      .done()
      .build();

      form.insertFormOnPage({form}).then((formbody) => {
      cy.dataUmb(shortAnswerId).should('be.visible');
      cy.dataUmb(longAnswerId).should('be.visible');
      cy.dataUmb(passwordId).should('be.visible');
      cy.dataUmb(checkboxId).should('be.visible');
      cy.dataUmb(dateId).should('not.be.visible');

      // Short answer
      cy.dataUmb(shortAnswerId).type(shortAnswerValue).blur();

      // Long answer
      cy.dataUmb(longAnswerId).type(longAnswerValue).blur();

      // Password
      cy.dataUmb(passwordId).type(passwordValue).blur();

      // Checkbox
      cy.dataUmb(checkboxId).check();

      // Date
      cy.dataUmb(`${dateId}_1`).focus();
      cy.get("div.pika-lendar").should('be.visible');
      cy.get(".pika-button.pika-day").first().click();
      cy.get("div.pika-lendar").should('not.be.visible');

      // Submit
      cy.get('form').submit();

      // Thank you message
      cy.get('.umbraco-forms-submitmessage').should('be.visible');

      // Visit entries
      cy.visit('/umbraco/#/forms/form/entries/' + formbody.id);

      // Click first (newest)
      cy.get('.umb-table-body__link').first().click();

      // Verify field values
      cy.dataUmb('label_' + shortAnswerId).should('have.text', shortAnswerId);
      cy.dataUmb(shortAnswerId).should('contain.text', shortAnswerValue);

      cy.dataUmb('label_' + longAnswerId).should('have.text', longAnswerId);
      cy.dataUmb(longAnswerId).should('contain.text', longAnswerValue);

      cy.dataUmb('label_' + checkboxId).should('have.text', checkboxId);
      cy.dataUmb(checkboxId).should('contain.text', "True");

      cy.dataUmb('label_' + dateId).should('have.text', dateId);
      const d = new Date();
      const datestring = (d.getMonth() + 1) + "/" + 1 + "/" + d.getFullYear() + " 12:00:00 AM";
      cy.dataUmb(dateId).should('contain.text', datestring + '\n');


      cy.visit('/umbraco/#/forms/form/edit/' + formbody.id);
      // Verify that the workflow is attached
      cy.dataUmb(workflowName).should('have.text', workflowName);

    });
  });

  it.skip('Test HideAll Contains conditions', () => {
    const text1ToInsert = 'test';
    const text2ToInsert = 'asdasd';
    const shortAnswer1Id = faker.random.uuid();
    const shortAnswer2Id = faker.random.uuid();
    const shortAnswer3Id = faker.random.uuid();

    const form = new Builder().Form()
      .withName(formPrefix + faker.random.uuid())
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

      form.insertFormOnPage({form}).then(() => {
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

    const form = new Builder().Form()
      .withName(formPrefix + faker.random.uuid())
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

    const form = new Builder().Form()
      .withName(formPrefix + faker.random.uuid())
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

      form.insertFormOnPage({form}).then(() => {
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

    const form = new Builder().Form()
      .withName(formPrefix + faker.random.uuid())
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

      form.insertFormOnPage({form}).then(() => {
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

    const form = new Builder().Form()
      .withName(formPrefix + faker.random.uuid())
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

      form.insertFormOnPage({form}).then(() => {
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
