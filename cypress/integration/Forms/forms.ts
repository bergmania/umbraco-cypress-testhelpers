/// <reference types="Cypress" />
import faker from 'faker';
import { Builder } from '../../../src';
import { AliasHelper } from '../../../src';

context('Forms', () => {
  const formPrefix = "formTest";
  const docTypePrefix = "docTypeTest";
  const dataTypePrefix = "dataTypeTest";
  const templatePrefix = "templateTest";
  const formName = formPrefix + faker.random.uuid();
  const fieldPreValueSourceTypeId='35c2053e-cbf7-4793-b27c-6e97b7671a2d';

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
    cleanUp();
  });

  afterEach(() => {
    cleanUp();
  }); 
  it('Test adding text prevalue source', ()=>{
    const prevalueName = faker.random.word();
    
    insertPrevalueAndExecuteAction({prevalueName,fieldPreValueSourceTypeId},action =>{      
      cy.visit('/umbraco#/forms/prevaluesource/edit/'+action);      
      cy.get('.controls > select option:selected').should('have.text','Get values from textfile');

      for(let i=0;i<5;i++){
        cy.dataUmb(`prevalueId_${i}`).should('have.text',`${i}`);
        cy.dataUmb(`prevalue_${i}`).should('have.text',`Prevalue${i+1}`);
      }      
    });        
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
        .addSetting({name:'Email',value:faker.internet.email()})             
        .addSetting({name:'SenderEmail',value:faker.internet.email()})        
        .addSetting({name:'Subject',value:faker.random.word()})        
        .addSetting({name:'RazorViewFilePath',value:'Forms/Emails/Example-Template.cshtml'})        
        .addSetting({name:'Attachment',value:''})        
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
    
    insertFormOnPageAndExecuteAction(form, (formbody) => {      
      cy.dataUmb(shortAnswerId).should('be.visible');
      cy.dataUmb(longAnswerId).should('be.visible');
      cy.dataUmb(passwordId).should('be.visible');
      cy.dataUmb(checkboxId).should('be.visible');
      cy.dataUmb(dateId).should('not.be.visible');

      // Short answer
      cy.dataUmb(shortAnswerId ).type(shortAnswerValue).blur();

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
      cy.dataUmb('label_'+shortAnswerId).should('have.text', shortAnswerId);
      cy.dataUmb(shortAnswerId).should('contain.text', shortAnswerValue);
      
      cy.dataUmb('label_'+longAnswerId).should('have.text', longAnswerId);
      cy.dataUmb(longAnswerId).should('contain.text', longAnswerValue);

      cy.dataUmb('label_'+checkboxId).should('have.text', checkboxId);
      cy.dataUmb(checkboxId).should('contain.text', "True");     

      cy.dataUmb('label_'+dateId).should('have.text', dateId);      
      const d = new Date();
      const datestring = (d.getMonth() + 1) + "/" + 1 + "/" + d.getFullYear() + " 12:00:00 AM";
      cy.dataUmb(dateId).should('contain.text',  datestring + '\n');


      cy.visit('/umbraco/#/forms/form/edit/' + formbody.id);
      // Verify that the workflow is attached
      cy.dataUmb(workflowName).should('have.text',workflowName);

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

    insertFormOnPageAndExecuteAction(form, () => {
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

    insertFormOnPageAndExecuteAction(form, () => {
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

    insertFormOnPageAndExecuteAction(form, () => {
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

    insertFormOnPageAndExecuteAction(form, () => {
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

    insertFormOnPageAndExecuteAction(form, () => {
      cy.get("input[name='" + shortAnswer1Id + "']").type("not the expected text").blur();
      cy.get("input[value='Next']").click();
      cy.get("input[name='" + shortAnswer3Id + "']").should('not.be.visible');
      cy.get("input[value='Previous']").click();
      cy.get("input[name='" + shortAnswer1Id + "']").type(textToInsert + faker.random.uuid()).blur();
      cy.get("input[value='Next']").click();
      cy.get("input[name='" + shortAnswer3Id + "']").should('be.visible');
    });
  });

  function cleanUp() {
    cy.deleteFormsByNamePrefix(formPrefix);
    cy.deleteDocumentTypesByNamePrefix(docTypePrefix);
    cy.deleteDataTypesByNamePrefix(dataTypePrefix);
    cy.deleteTemplatesByNamePrefix(templatePrefix);

    cy.deleteAllPreValues();
  }
  function insertPrevalueAndExecuteAction({prevalueName, fieldPreValueSourceTypeId}:{prevalueName:string, fieldPreValueSourceTypeId:string}, action) {
    
    cy.postFile('prevalueSourceFile.txt','/backoffice/UmbracoForms/PreValueFile/PostAddFile').then(
      settings=>{   
        const request={
          fieldPreValueSourceTypeId: fieldPreValueSourceTypeId,
          name: prevalueName,
          settings: {TextFile: settings.FilePath}
        }  
        cy.postRequest('/backoffice/UmbracoForms/PreValueSource/ValidateSettings',request).then(()=>
          cy.postRequest('/backoffice/UmbracoForms/PreValueSource/PostSave',request)).then(postsave=>
            cy.postRequest('/backoffice/UmbracoForms/PreValueSource/GetPreValues',request).then(()=>action(postsave.id))
          )                      
      }
    )
  };
  function insertFormOnPageAndExecuteAction(form, action) {
    cy.saveForm(form).then(formBody => {

      const dataType = new Builder().FormPicker()
        .withName(dataTypePrefix + faker.random.uuid())
        .withSaveNewAction()
        .build();

      cy.saveDataType(dataType).then(dataTypeBody => {
        const formPickerAlias = 'myFormPicker';
        const docTypeAlias = AliasHelper.toSafeAlias(faker.random.uuid());

        const template = new Builder().Template()
          .withName(templatePrefix + faker.random.uuid())
          .withContent(`@inherits Umbraco.Web.Mvc.UmbracoViewPage<${AliasHelper.capitalize(docTypeAlias)}>\n
                        @using ContentModels = Umbraco.Web.PublishedModels;\n
                        @{\n
                        \tLayout = null;\n
                        }\n
                        <html>\n
                          \t<head>\n
                          \t\t<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.4.min.js"></script>\n
                          \t\t<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>\n
                          \t\t<script src="https://ajax.aspnetcdn.com/ajax/mvc/5.1/jquery.validate.unobtrusive.min.js"></script>\n
                          \t</head>\n
                          \t<body>\n
                          \t\t@Umbraco.RenderMacro("renderUmbracoForm", new {FormGuid=Model.MyFormPicker.ToString(), FormTheme="", ExcludeScripts="0"})
                          \t</body>\n
                        </html>\n`
                      )
          .build();

        cy.saveTemplate(template).then(templateBody => {
          const docType = new Builder().DocumentType()
            .withName(docTypePrefix + faker.random.uuid())
            .withAlias(docTypeAlias)
            .withDefaultTemplate(decodeURI(templateBody))
            .withAllowAsRoot(true)
            .addGroup()
            .addFormPickerProperty()
            .withDataTypeId(dataTypeBody.id)
            .withAlias(formPickerAlias)
            .done()
            .done()
            .build();

          cy.saveDocumentType(docType).then((docTypeBody) => {
            const content = new Builder().Content()
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

            cy.saveContent(content).then((response)=> {              
              cy.visit(response.urls[0].text).then(page => {
                action(formBody)
              });
            });
          });
        });
      });
    });
  }
});
