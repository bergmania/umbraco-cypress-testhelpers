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
    TextBoxProperty
} from '../';


import { FormModel } from './Models/formModel';
import { ShortAnswerField } from './Models/shortAnswerField';
import { LongAnswerField } from './models/longAnswerField';
import { PasswordField } from './Models/passwordField';
import { CheckboxField } from './models/checkboxField';
import { DateField } from './models/dateField';
import { Workflow } from './Models/workflow';
import { Chainable } from 'src/cypress/commands/chainable';

export class Form {
    private readonly docTypeAlias = AliasHelper.toSafeAlias(faker.random.uuid());
    private readonly content: string = `@inherits Umbraco.Web.Mvc.UmbracoViewPage<${AliasHelper.capitalize(this.docTypeAlias)}>\n
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
    public readonly formPrefix = 'formTest';
    public readonly dataTypePrefix = 'dataTypeTest';
    public readonly templatePrefix = 'templateTest';
    public readonly docTypePrefix = 'docTypeTest';
    public readonly formPickerAlias = 'myFormPicker';

    /********/
    /* Form */
    /********/
    public buildForm(
        model:
            {
                formModel: FormModel,
                workflows?: Workflow[],
                shortAnswerFields?: ShortAnswerField[],
                longAnswerFields?: LongAnswerField[],
                passwordFields?: PasswordField[],
                checkboxFields?: CheckboxField[],
                dateFields?: DateField[]
            }
    ) {
        let f = new FormBuilder().withName(model.formModel.name);
        if (model.workflows) {
            model.workflows?.forEach(workflow => {
                let wf = f.addFormWorkflowType(workflow.executeOn)
                    .withWorkflowTypeId(workflow.workflowTypeId)
                    .withIncludeSensitiveData(workflow.includeSensitiveData)
                    .withName(workflow.name);
                workflow.settings.forEach(setting => {
                    wf.addSetting(setting);
                });
                wf.done();
            });
        }
        let container =
            f.addPage()
                .addFieldSet()
                .addContainer();
        model.shortAnswerFields?.forEach(shortAnswerField => {
            container.addShortAnswerField()
                .withId(shortAnswerField.id)
                .withAlias(shortAnswerField?.alias)
                .withCaption(shortAnswerField?.caption)
                .done();
        });
        model.longAnswerFields?.forEach(longAnswerField => {
            container.addLongAnswerField()
                .withId(longAnswerField.id)
                .done();
        });
        model.passwordFields?.forEach(passwordField => {
            container.addPasswordField()
                .withId(passwordField.id)
                .done();
        });
        model.checkboxFields?.forEach(checkboxField => {
            container.addCheckboxField()
                .withId(checkboxField.id)
                .done();
        });
        model.dateFields?.forEach(dateField => {
            container.addDateField()
                .withId(dateField.id)
                .done();
        });

        container.done()
            .done()
            .done()
        return f.build();
    }
    /*************/
    /* DataTypes */
    /*************/
    public buildDataType(dataTypePrefix: string) {
        return new FormPickerDataTypeBuilder()
            .withName(dataTypePrefix)
            .withSaveNewAction()
            .build();
    }
    public buildFormPickerDataType(name: string, allowedFormIds?: string[]) {
        return new FormPickerDataTypeBuilder()
            .withName(name)
            .withAllowedForms(allowedFormIds)
            .withSaveNewAction()
            .build();
    }
    public buildTextBoxDataType(name: string, maxChars?: number) {
        return new TextBoxDataTypeBuilder()
            .withName(name)
            .withSaveNewAction()
            .withMaxChars(maxChars)
            .build();
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
    public buildFormPickerTemplate(name: string, alias: string, formPickerModel: string, docTypeAlias?: string, properties?: { name: string, alias: string }[]) {
        return new TemplateBuilder()
            .withName(name)
            .withAlias(alias)
            .withContent(new FormPickerTemplate().get(formPickerModel, docTypeAlias, properties))
            .build();
    }
    public buildMinimalTemplate(name: string, alias: string, docTypeAlias?: string, properties?: { name: string, alias: string }[]) {
        return new TemplateBuilder()
            .withName(name)
            .withAlias(alias)
            .withContent(new MinimalTemplate().get(docTypeAlias, properties))
            .build();
    }
    /****************/
    /* Content type */
    /****************/
    public buildContentType_(templateBody, docTypePrefix: string, docTypeAlias: string, dataTypeBody, formPickerAlias: string) {
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
        var content = new ContentBuilder()
            .withTemplateAlias(templateAlias)
            .withContentTypeAlias(documentTypeAlias)
            .addVariant()
            .withSave(true)
            .withPublish(true);
        properties?.forEach(property => {
            content.addProperty()
                .withAlias(property.alias)
                .withValue(property.value)
                .done()
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



    /***********/
    /* Inserts */
    /***********/
    public insertForm(form) {
        return cy.saveForm(form).then(formBody => formBody);
    }

    public insertContentOnPage(
        documentType: { name: string, alias: string },
        template: Template,
        textBoxProperties?: TextBoxProperty[],
        formPickerProperty?: { name: string, alias: string, allowedFormIds: string[], formBuild },
    ): any {
        return cy.saveTemplate(template).then(templateBody => {
            template = templateBody;
            let documentTypeBuilder = new DocumentTypeBuilder()
                .withName(documentType.name)
                .withAlias(documentType.alias)
                .withDefaultTemplate(template.alias)
                .withAllowAsRoot(true)
                .addGroup();
            let promises = (textBoxProperties?.map(textBoxProperty => {
                let dataType = this.buildTextBoxDataType(textBoxProperty.name, textBoxProperty.maxChars);
                return new Cypress.Promise(resolve => {
                    cy.saveDataType(dataType).then(dataTypeBody => {
                        documentTypeBuilder.addTextBoxProperty()
                            .withDataTypeId(dataTypeBody.id)
                            .withAlias(textBoxProperty.alias)
                            .done();
                        resolve(textBoxProperty);
                    })
                })
            }));
            let formPromises = [];
            if (formPickerProperty) {
                formPromises.push(new Cypress.Promise(formResolv => {
                    cy.saveForm(formPickerProperty.formBuild).then(formbody => { formResolv(formbody) });
                }).then((formBody: any) => {
                    let dataType = this.buildFormPickerDataType(formPickerProperty.name, formPickerProperty.allowedFormIds);
                    promises.push(
                        new Cypress.Promise(resolve => {
                            cy.saveDataType(dataType).then(dataTypeBody => {
                                documentTypeBuilder.addFormPickerProperty()
                                    .withDataTypeId(dataTypeBody.id)
                                    .withAlias(formPickerProperty.alias)
                                    .done();
                                resolve({ alias: formPickerProperty.alias, name: formPickerProperty.name, value: formBody.id });
                            });
                        })
                    );
                    return formBody;
                }));
            }
            Cypress.Promise.all(formPromises).then(formBody => {
                Cypress.Promise.all(promises).then(properties => {
                    cy.saveDocumentType(documentTypeBuilder.done().build()).then(documentTypeBody => {
                        var content = this.buildContent(template.alias, documentTypeBody.alias, properties);
                        cy.saveContent(content).then((contentBody) => {
                            return { contentBody, formBody: formBody[0] };
                        });
                    });
                });
            });
        });
    }
  
    public insertFormOnPage({
        formBuild,
        dataTypePrefix = this.dataTypePrefix,
        templatePrefix = this.templatePrefix,
        docTypePrefix = this.docTypePrefix,
        formPickerAlias = this.formPickerAlias,
        visit = true
    }: {
        formBuild;
        dataTypePrefix?: string;
        templatePrefix?: string;
        docTypePrefix?: string;
        formPickerAlias?: string;
        visit?: boolean;
    }) {

        return cy.saveForm(formBuild).then(formBody => {
            const dataType = this.buildDataType(dataTypePrefix);
            cy.saveDataType(dataType).then(dataTypeBody => {

                const template = this.buildTemplate(templatePrefix);
                cy.saveTemplate(template).then(templateBody => {

                    const docType = this.buildContentType_(templateBody, docTypePrefix, this.docTypeAlias, dataTypeBody, formPickerAlias);
                    cy.saveDocumentType(docType).then((docTypeBody) => {

                        const content = this.buildContent_(templateBody, docTypeBody, formPickerAlias, formBody);
                        cy.saveContent(content).then((contentBody) => {
                            return visit === true ?
                                cy.visit(contentBody.urls[0].text).then(() => { return { formBody: formBody, dataType: dataTypeBody, templateBody: templateBody, docTypeBody: docTypeBody, content: contentBody } })
                                :
                                { formBody: formBody, dataType: dataTypeBody, templateBody: templateBody, docTypeBody: docTypeBody, content: contentBody };
                        });
                    });
                });
            });
        });
    }

    public cleanUp(
        {
            formPrefix = this.formPrefix,
            dataTypePrefix = this.dataTypePrefix,
            templatePrefix = this.templatePrefix,
            docTypePrefix = this.docTypePrefix
        }: {
            formPrefix?: string;
            dataTypePrefix?: string;
            templatePrefix?: string;
            docTypePrefix?: string;
        }
    ) {
        cy.deleteFormsByNamePrefix(formPrefix);
        cy.deleteDocumentTypesByNamePrefix(docTypePrefix);
        cy.deleteDataTypesByNamePrefix(dataTypePrefix);
        cy.deleteTemplatesByNamePrefix(templatePrefix);
        cy.deleteAllContent();
    }
}