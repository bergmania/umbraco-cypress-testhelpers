

import {
  AliasHelper,
   FormBuilder
}
  from '../../..';

import { FormModel } from '../../models/formModel';
import { ShortAnswerField } from '../../models/shortAnswerField';
import { LongAnswerField } from '../../models/longAnswerField';
import { PasswordField } from '../../models/passwordField';
import { CheckboxField } from '../../models/checkboxField';
import { DateField } from '../../models/dateField';
import { Workflow } from '../../models/workflow';
import { DropDownField, FileUploadField } from '../../models';
import faker from 'faker';

export class FormBuilderHelper {
  private readonly docTypeAlias = AliasHelper.toSafeAlias(faker.random.uuid());
 
  public readonly formPrefix = 'formTest';
  public readonly dataTypePrefix = 'dataTypeTest';
  public readonly templatePrefix = 'templateTest';
  public readonly docTypePrefix = 'docTypeTest';
  public readonly formPickerAlias = 'myFormPicker';

  public build(model: {
    formModel: FormModel;
    workflows?: Workflow[];
    shortAnswerFields?: ShortAnswerField[];
    longAnswerFields?: LongAnswerField[];
    passwordFields?: PasswordField[];
    checkboxFields?: CheckboxField[];
    dateFields?: DateField[];
    dropDownFields?: DropDownField[];
    uploadFields?: FileUploadField[];
  }) {
    const f = new FormBuilder().withName(model.formModel.name);
    if (model.workflows) {
      model.workflows?.forEach((workflow) => {
        const wf = f
          .addFormWorkflowType(workflow.executeOn)
          .withWorkflowTypeId(workflow.workflowTypeId)
          .withIncludeSensitiveData(workflow.includeSensitiveData)
          .withName(workflow.name);
        workflow.settings.forEach((setting) => {
          wf.addSetting(setting);
        });
        wf.done();
      });
    }
    const container = f.addPage().addFieldSet().addContainer();
    model.shortAnswerFields?.forEach((shortAnswerField) => {
      container
        .addShortAnswerField()
        .withId(shortAnswerField.id)
        .withAlias(shortAnswerField?.alias)
        .withCaption(shortAnswerField?.caption)
        .withSensitiveData(shortAnswerField?.containsSensitiveData)
        .withMandatory(shortAnswerField?.mandatory)
        .withValidationRegex(shortAnswerField?.regex)
        .done();
    });
    model.longAnswerFields?.forEach((longAnswerField) => {
      container
        .addLongAnswerField()
        .withId(longAnswerField.id)
        .withAlias(longAnswerField?.alias)
        .withCaption(longAnswerField?.caption)
        .withSensitiveData(longAnswerField?.containsSensitiveData)
        .withMandatory(longAnswerField?.mandatory)
        .withValidationRegex(longAnswerField?.regex)
        .done();
    });
    model.passwordFields?.forEach((passwordField) => {
      container
        .addPasswordField()
        .withId(passwordField.id)
        .withMandatory(passwordField?.mandatory)
        .withValidationRegex(passwordField?.regex)
        .done();
    });
    model.checkboxFields?.forEach((checkboxField) => {
      container
        .addCheckboxField()
        .withId(checkboxField.id)
        .withMandatory(checkboxField?.mandatory)
        .withValidationRegex(checkboxField?.regex)
        .done();
    });
    model.dateFields?.forEach((dateField) => {
      container
        .addDateField()
        .withId(dateField.id)
        .withMandatory(dateField?.mandatory)
        .withValidationRegex(dateField?.regex)
        .done();
    });
    model.dropDownFields?.forEach((dropDownField) => {
      container
        .addDropDownField()
        .withId(dropDownField.id)
        .withAlias(dropDownField?.alias)
        .withCaption(dropDownField?.caption)
        .withSensitiveData(dropDownField?.containsSensitiveData)
        .withPrevalueSourceId(dropDownField.prevalueSourceId)
        .withPrevalues(dropDownField.preValues)
        .withMandatory(dropDownField?.mandatory)
        .withValidationRegex(dropDownField?.regex)
        .done();
    });
    model.uploadFields?.forEach((uploadField) => {
      container
        .addUploadField()
        .withId(uploadField.id)
        .withAlias(uploadField?.alias)
        .withCaption(uploadField?.caption)
        .withSensitiveData(uploadField?.containsSensitiveData)
        .withMandatory(uploadField?.mandatory)
        .withValidationRegex(uploadField?.regex);
    });
    container.done().done().done();
    return f.build();
  }
  public insert(theForm) {
    return cy.saveForm(theForm).then((formBody) => formBody);
  }
  
 
  
  // public insertFormOnPage({
  //   formBuild,
  //   dataTypePrefix = this.dataTypePrefix,
  //   templatePrefix = this.templatePrefix,
  //   docTypePrefix = this.docTypePrefix,
  //   formPickerAlias = this.formPickerAlias,
  //   visit = true,
  // }: {
  //   formBuild;
  //   dataTypePrefix?: string;
  //   templatePrefix?: string;
  //   docTypePrefix?: string;
  //   formPickerAlias?: string;
  //   visit?: boolean;
  // }) {
  //   return cy.saveForm(formBuild).then((formBody) => {
  //     const dataType = this.buildDataType(dataTypePrefix);
  //     cy.saveDataType(dataType).then((dataTypeBody) => {
  //       const template = this.buildTemplate(templatePrefix);
  //       cy.saveTemplate(template).then((templateBody) => {
  //         const docType = this.buildContentType_(
  //           templateBody,
  //           docTypePrefix,
  //           this.docTypeAlias,
  //           dataTypeBody,
  //           formPickerAlias,
  //         );
  //         cy.saveDocumentType(docType).then((docTypeBody) => {
  //           const content = this.buildContent_(templateBody, docTypeBody, formPickerAlias, formBody);
  //           cy.saveContent(content).then((contentBody) => {
  //             return visit === true
  //               ? cy.visit(contentBody.urls[0].text).then(() => {
  //                   return { formBody, dataType: dataTypeBody, templateBody, docTypeBody, content: contentBody };
  //                 })
  //               : { formBody, dataType: dataTypeBody, templateBody, docTypeBody, content: contentBody };
  //           });
  //         });
  //       });
  //     });
  //   });
  // }

  public cleanUp({
    formPrefix = this.formPrefix,
    dataTypePrefix = this.dataTypePrefix,
    templatePrefix = this.templatePrefix,
    docTypePrefix = this.docTypePrefix,
  }: {
    formPrefix?: string;
    dataTypePrefix?: string;
    templatePrefix?: string;
    docTypePrefix?: string;
  }) {
    cy.deleteFormsByNamePrefix(formPrefix);
    cy.deleteDocumentTypesByNamePrefix(docTypePrefix);
    cy.deleteDataTypesByNamePrefix(dataTypePrefix);
    cy.deleteTemplatesByNamePrefix(templatePrefix);
    cy.deleteAllContent();
  }
}
