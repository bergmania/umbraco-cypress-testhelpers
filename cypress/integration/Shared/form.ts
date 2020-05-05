
import { Builder } from '../../../src';
import { AliasHelper } from '../../../src';
import faker from 'faker';
import { FormModel } from './Models/formModel';
import { ShortAnswerField } from './Models/shortAnswerField';
import { LongAnswerField } from './Models/longAnswerField';
import { PasswordField } from './Models/passwordField';
import { CheckboxField } from './Models/checkboxField';
import { DateField } from './Models/dateField';
import { Workflow } from './Models/workflow';

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
    public readonly dataTypePrefix= 'dataTypeTest';
    public readonly templatePrefix= 'templateTest';
    public readonly docTypePrefix = 'docTypeTest'; 
    public readonly formPickerAlias = 'myFormPicker';
   
    public buildForm(       
        model:
        {   formModel: FormModel,   
            workflows?: Workflow[],     
            shortAnswerFields?: ShortAnswerField[],
            longAnswerFields?: LongAnswerField[],
            passwordFields?: PasswordField[],
            checkboxFields?: CheckboxField[],
            dateFields?: DateField[]
        }
        ){
        let f=new Builder().Form().withName(model.formModel.name);                
        if(model.workflows){
            model.workflows?.forEach(workflow=>{
                let wf=f.addFormWorkflowType(workflow.executeOn)
                .withWorkflowTypeId(workflow.workflowTypeId)
                .withIncludeSensitiveData(workflow.includeSensitiveData)
                .withName(workflow.name);
                workflow.settings.forEach(setting=>{
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
        return f.build();;
    }
  
    public buildContentType(templateBody, docTypePrefix: string, docTypeAlias: string, dataTypeBody, formPickerAlias: string) {
        return new Builder().DocumentType()
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
    public buildContent(templateBody, docTypeBody, formPickerAlias: string, formBody) {
        return new Builder().Content()
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
    public buildTemplate(templatePrefix: string) {
        return new Builder().Template()
            .withName(templatePrefix + faker.random.uuid())
            .withContent(this.content)
            .build();
    }
    public buildDataType(dataTypePrefix) {
        return new Builder().FormPicker()
            .withName(dataTypePrefix + faker.random.uuid())
            .withSaveNewAction()
            .build();
    }
    public insertForm(form){        
        return cy.saveForm(form).then(formBody =>formBody);

    }
    public insertFormOnPage({
        formBuild,
        dataTypePrefix= this.dataTypePrefix,
        templatePrefix= this.templatePrefix,
        docTypePrefix = this.docTypePrefix,
        formPickerAlias = this.formPickerAlias,
        visit=true
    }:{
        formBuild;
        dataTypePrefix?: string; 
        templatePrefix?: string;
        docTypePrefix?: string;
        formPickerAlias?: string;
        visit?:boolean;
    }) {
        
        return cy.saveForm(formBuild).then(formBody => {           
            const dataType = this.buildDataType(dataTypePrefix);
            cy.saveDataType(dataType).then(dataTypeBody => {
                
                const template = this.buildTemplate(templatePrefix);
                cy.saveTemplate(template).then(templateBody => {

                    const docType = this.buildContentType(templateBody, docTypePrefix, this.docTypeAlias, dataTypeBody, formPickerAlias);
                    cy.saveDocumentType(docType).then((docTypeBody) => {
                        
                        const content = this.buildContent(templateBody, docTypeBody, formPickerAlias, formBody);
                        cy.saveContent(content).then((content) => {
                            return visit === true ? 
                                cy.visit(content.urls[0].text).then(() => {return {formBody: formBody, dataType: dataTypeBody,templateBody: templateBody, docTypeBody: docTypeBody, content: content}})
                                :
                                {formBody: formBody, dataType: dataTypeBody,templateBody: templateBody, docTypeBody: docTypeBody, content: content};
                        });
                    });
                });
            });
        });
    }
    
    public cleanUp(
        {   
            formPrefix = this.formPrefix,       
            dataTypePrefix= this.dataTypePrefix,
            templatePrefix= this.templatePrefix,
            docTypePrefix = this.docTypePrefix            
        }:{     
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