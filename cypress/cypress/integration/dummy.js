/// <reference types="Cypress" />
import faker from 'faker';
import {Builder} from "../../../src";
import AliasHelper from "../../../src/helpers/aliasHelper";

context('Forms', () => {
  const formPrefix = "formTest";
  const docTypePrefix = "docTypeTest";
  const dataTypePrefix = "dataTypeTest";
  const templatePrefix = "templateTest";

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));

    //Cleanup - just to be sure
    cleanUp();
  });

  afterEach(() => {
    //Cleanup
    //cleanUp();
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


    const form = Builder.Form()
      .withName(formPrefix + faker.random.uuid())
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

    insertFormOnPageAndExecuteAction(form, function(formBody){
      cy.get("input[name='" + shortAnswerId + "']").should('be.visible');
      cy.get("textarea[name='" + longAnswerId + "']").should('be.visible');
      cy.get("input[name='" + passwordId + "']").should('be.visible');
      cy.get("input[name='" + checkboxId + "']").should('be.visible');
      cy.get("input[name='" + dateId + "']").should('be.visible');

      //Short answer
      cy.get("input[name='" + shortAnswerId + "']").type(shortAnswerValue).blur();

      // Long answer
      cy.get("textarea[name='" + longAnswerId + "']").type(longAnswerValue).blur();

      // Password
      cy.get("input[name='" + passwordId + "']").type(passwordValue).blur();

      // Checkbox
      cy.get("input[name='" + checkboxId + "']:visible").check();

      //Date
      cy.get("input[name='" + dateId + "']:visible").focus();
      cy.get("div.pika-lendar").should('be.visible');
      cy.get(".pika-button.pika-day").first().click();
      cy.get("div.pika-lendar").should('not.be.visible');

      //Submit
      cy.get('form').submit();

      // Thank you message
      cy.get('.umbraco-forms-submitmessage').should('be.visible');

      //Visit entries
      cy.visit('/umbraco/#/forms/form/entries/' + formBody.id);

      //Click first (newest)
      cy.get('.umb-table-body__link').first().click();

      // Verify field values
      cy.get('.umb-forms-entry-main > :nth-child(1) > .control-label').should('have.text', shortAnswerId);
      cy.get(':nth-child(1) > [field="detail.value"] > div').should('have.text', shortAnswerValue + '\n');

      cy.get('.umb-forms-entry-main > :nth-child(2) > .control-label').should('have.text', longAnswerId);
      cy.get(':nth-child(2) > [field="detail.value"] > div').should('have.text', longAnswerValue + '\n');

      // Passwords are now shown

      cy.get('.umb-forms-entry-main > :nth-child(3) > .control-label').should('have.text', checkboxId);
      cy.get(':nth-child(3) > [field="detail.value"] > div').should('have.text', 'True' + '\n');

      cy.get('.umb-forms-entry-main > :nth-child(4) > .control-label').should('have.text', dateId);
      const d = new Date();
      const datestring = (d.getMonth()+1)  + "/" + 1 + "/" + d.getFullYear() + " 12:00:00 AM";
      cy.get(':nth-child(4) > [field="detail.value"] > div').should('have.text', datestring + '\n');

    });
  });

  it.skip('Test HideAll Contains conditions', () => {
    const text1ToInsert = 'test';
    const text2ToInsert = 'asdasd';
    const shortAnswer1Id = faker.random.uuid();
    const shortAnswer2Id = faker.random.uuid();
    const shortAnswer3Id = faker.random.uuid();

    const form = Builder.Form()
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

    insertFormOnPageAndExecuteAction(form, function(formBody){
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

    const form = Builder.Form()
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

    insertFormOnPageAndExecuteAction(form, function(formBody){
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

    const form = Builder.Form()
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

    insertFormOnPageAndExecuteAction(form, function(formBody){
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

    const form = Builder.Form()
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

    insertFormOnPageAndExecuteAction(form, function(formBody){
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

    const form = Builder.Form()
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

    insertFormOnPageAndExecuteAction(form, function(){
      cy.get("input[name='" + shortAnswer1Id + "']").type("not the expected text").blur();
      cy.get("input[value='Next']").click();
      cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
      cy.get("input[value='Previous']").click();
      cy.get("input[name='" + shortAnswer1Id + "']").type(textToInsert + faker.random.uuid()).blur();
      cy.get("input[value='Next']").click();
      cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
    });
  });

  function cleanUp(){
    cy.deleteFormsByNamePrefix(formPrefix);
    cy.deleteDocumentTypesByNamePrefix(docTypePrefix);
    cy.deleteDataTypesByNamePrefix(dataTypePrefix);
    cy.deleteTemplatesByNamePrefix(templatePrefix);
  }

  function insertFormOnPageAndExecuteAction(form, action) {
    cy.saveForm(form).then(formBody => {

      const dataType = Builder.DataTypes.FormPicker()
        .withName(dataTypePrefix + faker.random.uuid())
        .withSaveNewAction()
        .build();

      cy.saveDataType(dataType).then(dataTypeBody => {
        const formPickerAlias = "myFormPicker";
        const docTypeAlias = AliasHelper.toSafeAlias(faker.random.uuid());

        const template = Builder.Template()
          .withName(templatePrefix + faker.random.uuid())
          .withContent("@inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels." + AliasHelper.capitalize(docTypeAlias) + ">\n" +
            "@using ContentModels = Umbraco.Web.PublishedModels;\n" +
            "@{\n" +
            "\tLayout = null;\n" +
            "}\n" +
            "<html>\n" +
            "<head>\n" +
            "<script src=\"https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.4.min.js\"></script>\n" +
            "<script src=\"https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js\"></script>\n" +
            "<script src=\"https://ajax.aspnetcdn.com/ajax/mvc/5.1/jquery.validate.unobtrusive.min.js\"></script>\n" +
            "</head>\n" +
            "</body>\n" +
            "@Umbraco.RenderMacro(\"renderUmbracoForm\", new {FormGuid=Model.MyFormPicker.ToString(), FormTheme=\"\", ExcludeScripts=\"0\"})" +
            "</body>\n" +
            "</html>\n")
          .build();

        cy.saveTemplate(template).then(templateBody => {
          const docType = new Builder.DocumentType()
            .withName(docTypePrefix + faker.random.uuid())
            .withAlias(docTypeAlias)
            .withDefaultTemplate(templateBody.alias)
            .withAllowAsRoot(true)
            .addGroup()
            .addFormPickerProperty()
            .withDataTypeId(dataTypeBody.id)
            .withAlias(formPickerAlias)
            .done()
            .done()
            .build();

          cy.saveDocumentType(docType).then(docTypeBody => {
            const content = Builder.Content()
              .withTemplateAlias(templateBody.alias)
              .withContentTypeAlias(docTypeBody.alias)
              .addVariant()
              .withSave(true)
              .withPublish(true)
              .addProperty()
              .withAlias(formPickerAlias)
              .withValue(formBody.id)
              .done()
              .done()
              .build();

            cy.saveContent(content).then(contentBody => {
            //  cy.cycleHackWorkaroundForPureLiveIssue().then(_ => {
                cy.visit(contentBody.urls[0].text).then(page => {
                  action(formBody)
                });
            //  });
            });
          });
        });
      });
    });
  }

});
