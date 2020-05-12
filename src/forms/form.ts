import faker from 'faker';

import {
  AliasHelper,
  FormPickerDataTypeBuilder,
  FormBuilder,
  DocumentTypeBuilder,
  ContentBuilder,
  TemplateBuilder,
  TextBoxDataTypeBuilder,
  MinimalTemplate,
  FormPickerTemplate,
  DataType,
  Template,
  TextBoxProperty,
  DropDownDataTypeBuilder,
} from '../';

import { FormModel } from './Models/formModel';
import { ShortAnswerField } from './Models/shortAnswerField';
import { LongAnswerField } from './models/longAnswerField';
import { PasswordField } from './Models/passwordField';
import { CheckboxField } from './models/checkboxField';
import { DateField } from './models/dateField';
import { Workflow } from './Models/workflow';
import { DropDownProperty, FormPickerProperty, CmsDocumentType } from '../cms/models';
import DocumentTypeGroupBuilder from '../cms/builders/documentTypes/documentTypeGroupBuilder';
import { DropDownField } from './models';

export class Form {
  private readonly docTypeAlias = AliasHelper.toSafeAlias(faker.random.uuid());
  private readonly content: string = `@inherits Umbraco.Web.Mvc.UmbracoViewPage<${AliasHelper.capitalize(
    this.docTypeAlias,
  )}>\n
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
    </html>\n`;
  public readonly formPrefix = 'formTest';
  public readonly dataTypePrefix = 'dataTypeTest';
  public readonly templatePrefix = 'templateTest';
  public readonly docTypePrefix = 'docTypeTest';
  public readonly formPickerAlias = 'myFormPicker';

  /********/
  /* Form */
  /********/
  public buildForm(model: {
    formModel: FormModel;
    workflows?: Workflow[];
    shortAnswerFields?: ShortAnswerField[];
    longAnswerFields?: LongAnswerField[];
    passwordFields?: PasswordField[];
    checkboxFields?: CheckboxField[];
    dateFields?: DateField[];
    dropDownFields?: DropDownField[];
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
        .done();
    });
    model.longAnswerFields?.forEach((longAnswerField) => {
      container
        .addLongAnswerField()
        .withId(longAnswerField.id)
        .withAlias(longAnswerField?.alias)
        .withCaption(longAnswerField?.caption)
        .withSensitiveData(longAnswerField?.containsSensitiveData)
        .done();
    });
    model.passwordFields?.forEach((passwordField) => {
      container.addPasswordField().withId(passwordField.id).done();
    });
    model.checkboxFields?.forEach((checkboxField) => {
      container.addCheckboxField().withId(checkboxField.id).done();
    });
    model.dateFields?.forEach((dateField) => {
      container.addDateField().withId(dateField.id).done();
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
        .done();
    });
    container.done().done().done();
    return f.build();
  }
  /*************/
  /* DataTypes */
  /*************/
  public buildDataType(dataTypePrefix: string) {
    return new FormPickerDataTypeBuilder().withName(dataTypePrefix).withSaveNewAction().build();
  }
  public buildFormPickerDataType(name: string, allowedFormIds?: string[]) {
    return new FormPickerDataTypeBuilder().withName(name).withAllowedForms(allowedFormIds).withSaveNewAction().build();
  }
  public buildTextBoxDataType(name: string, maxChars?: number) {
    return new TextBoxDataTypeBuilder().withName(name).withSaveNewAction().withMaxChars(maxChars).build();
  }
  public buildDropDownDataType(name: string, values: string[], multiselect?: boolean) {
    return new DropDownDataTypeBuilder().withName(name).withSaveNewAction().withPrevalues(values, multiselect).build();
  }
  /*************/
  /* Templates */
  /*************/
  public buildTemplate(templatePrefix: string) {
    return new TemplateBuilder()
      .withName(templatePrefix + faker.random.uuid())
      .withContent(this.content)
      .build();
  }
  public buildFormPickerTemplate(
    name: string,
    alias: string,
    formPickerModel: string,
    docTypeAlias?: string,
    properties?: { name: string; alias: string }[],
  ) {
    return new TemplateBuilder()
      .withName(name)
      .withAlias(alias)
      .withContent(new FormPickerTemplate().get(formPickerModel, docTypeAlias, properties))
      .build();
  }
  public buildMinimalTemplate(
    name: string,
    alias: string,
    docTypeAlias?: string,
    properties?: { name: string; alias: string }[],
  ) {
    return new TemplateBuilder()
      .withName(name)
      .withAlias(alias)
      .withContent(new MinimalTemplate().get(docTypeAlias, properties))
      .build();
  }
  /****************/
  /* Content type */
  /****************/
  public buildContentType_(
    templateBody,
    docTypePrefix: string,
    docTypeAlias: string,
    dataTypeBody,
    formPickerAlias: string,
  ) {
    return new DocumentTypeBuilder()
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
  }

  /************/
  /* Content */
  /***********/
  public buildContent(templateAlias, documentTypeAlias: string, properties?: any[]) {
    const content = new ContentBuilder()
      .withTemplateAlias(templateAlias)
      .withContentTypeAlias(documentTypeAlias)
      .addVariant()
      .withSave(true)
      .withPublish(true);
    properties?.forEach((property) => {
      content.addProperty().withAlias(property.alias).withValue(property.value).done();
    });

    return content.done().build();
  }
  public buildContent_(templateBody, docTypeBody, formPickerAlias: string, formBody) {
    return new ContentBuilder()
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
  }

  public buildProperty(
    documentTypeGroupBuilder: DocumentTypeGroupBuilder,
    items: { property: any; dataType: DataType }[],
  ): DocumentTypeBuilder {
    items?.forEach((item: { property: any; dataType: DataType }) => {
      let builder;
      if (item.property instanceof TextBoxProperty) {
        builder = documentTypeGroupBuilder.addTextBoxProperty();
      } else if (item.property instanceof DropDownProperty) {
        builder = documentTypeGroupBuilder.addDropDownProperty();
      } else if (item.property instanceof FormPickerProperty) {
        builder = documentTypeGroupBuilder.addFormPickerProperty();
      }
      builder.withDataTypeId(item.dataType.id).withAlias(item.property.alias).done();
    });
    return documentTypeGroupBuilder.done();
  }
  public buildDocumentType(
    documentType: CmsDocumentType,
    template: Template,
    items: { property: any; dataType: DataType }[],
  ): DocumentTypeBuilder {
    const builder = new DocumentTypeBuilder()
      .withName(documentType.name)
      .withAlias(documentType.alias)
      .withId(documentType.id)
      .withDefaultTemplate(template.alias)
      .withAllowAsRoot(true);
    return this.buildProperty(builder.addGroup(), items);
  }

  /***********/
  /* Inserts */
  /***********/
  public insertForm(theForm) {
    return cy.saveForm(theForm).then((formBody) => formBody);
  }
  public insertTemplate(template: Template) {
    return cy.saveTemplate(template).then((templateBody) => templateBody);
  }
  public insertDataType(
    textBoxProperties?: TextBoxProperty[],
    dropDownProperties?: DropDownProperty[],
    formPickerProperty?: FormPickerProperty,
  ) {
    const promises = [];
    textBoxProperties?.map((textBoxProperty) => {
      const dataType = this.buildTextBoxDataType(textBoxProperty.name, textBoxProperty.maxChars);
      promises.push(
        new Cypress.Promise((resolve) =>
          cy.saveDataType(dataType).then((dataTypeBody) => {
            return resolve({ dataType: dataTypeBody, property: textBoxProperty });
          }),
        ),
      );
    });
    dropDownProperties?.map((dropDownProperty) => {
      const dataType = this.buildDropDownDataType(
        dropDownProperty.name,
        dropDownProperty.values,
        dropDownProperty.multiSelect,
      );
      promises.push(
        new Cypress.Promise((resolve) =>
          cy.saveDataType(dataType).then((dataTypeBody) => {
            return resolve({ dataType: dataTypeBody, property: dropDownProperty });
          }),
        ),
      );
    });
    if (formPickerProperty) {
      const dataType = this.buildFormPickerDataType(formPickerProperty.name, formPickerProperty.allowedFormIds);
      promises.push(
        new Cypress.Promise((resolve) =>
          cy.saveDataType(dataType).then((dataTypeBody) => {
            return resolve({ dataType: dataTypeBody, property: formPickerProperty });
          }),
        ),
      );
    }
    return Cypress.Promise.all(promises).then((r) => r);
  }
  public insertDocumentType(documentTypeBuilder: DocumentTypeBuilder) {
    return cy.saveDocumentType(documentTypeBuilder.build()).then((documentTypeBody) => documentTypeBody);
  }

  public insertContent(template: Template, documentType: CmsDocumentType, properties) {
    const content = this.buildContent(template.alias, documentType.alias, properties);
    return cy.saveContent(content).then((contentBody) => contentBody);
  }
  public insertFormOnPage({
    formBuild,
    dataTypePrefix = this.dataTypePrefix,
    templatePrefix = this.templatePrefix,
    docTypePrefix = this.docTypePrefix,
    formPickerAlias = this.formPickerAlias,
    visit = true,
  }: {
    formBuild;
    dataTypePrefix?: string;
    templatePrefix?: string;
    docTypePrefix?: string;
    formPickerAlias?: string;
    visit?: boolean;
  }) {
    return cy.saveForm(formBuild).then((formBody) => {
      const dataType = this.buildDataType(dataTypePrefix);
      cy.saveDataType(dataType).then((dataTypeBody) => {
        const template = this.buildTemplate(templatePrefix);
        cy.saveTemplate(template).then((templateBody) => {
          const docType = this.buildContentType_(
            templateBody,
            docTypePrefix,
            this.docTypeAlias,
            dataTypeBody,
            formPickerAlias,
          );
          cy.saveDocumentType(docType).then((docTypeBody) => {
            const content = this.buildContent_(templateBody, docTypeBody, formPickerAlias, formBody);
            cy.saveContent(content).then((contentBody) => {
              return visit === true
                ? cy.visit(contentBody.urls[0].text).then(() => {
                    return { formBody, dataType: dataTypeBody, templateBody, docTypeBody, content: contentBody };
                  })
                : { formBody, dataType: dataTypeBody, templateBody, docTypeBody, content: contentBody };
            });
          });
        });
      });
    });
  }

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
