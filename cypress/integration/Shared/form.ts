
import { Builder } from '../../../src';
import { AliasHelper } from '../../../src';
import faker from 'faker';

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
    private readonly formPrefix = 'formTest';       
    private readonly dataTypePrefix= 'dataTypeTest';
    private readonly templatePrefix= 'templateTest';
    private readonly docTypePrefix = 'docTypeTest'; 
    private readonly formPickerAlias = 'myFormPicker';

    public createMinimalForm() {
        return new Builder().Form()
            .withName(faker.random.uuid())
                .addPage()
                    .addFieldSet()
                        .addContainer()
                            .addShortAnswerField()
                                .withId(faker.random.uuid())
                            .done()
                        .done()            
                    .done()
                .done()            
            .build();            
    }
    public createDocType(templateBody, docTypePrefix: string, docTypeAlias: string, dataTypeBody, formPickerAlias: string) {
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
    public createContent(templateBody, docTypeBody, formPickerAlias: string, formBody) {
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
    public createTemplate(templatePrefix: string) {
        return new Builder().Template()
            .withName(templatePrefix + faker.random.uuid())
            .withContent(this.content)
            .build();
    }
    public createDataType(dataTypePrefix) {
        return new Builder().FormPicker()
            .withName(dataTypePrefix + faker.random.uuid())
            .withSaveNewAction()
            .build();
    }
    public insertFormOnPage({
        form,
        dataTypePrefix= this.dataTypePrefix,
        templatePrefix= this.templatePrefix,
        docTypePrefix = this.docTypePrefix,
        formPickerAlias = this.formPickerAlias,
        visit=true
    }:{
        form;
        dataTypePrefix?: string; 
        templatePrefix?: string;
        docTypePrefix?: string;
        formPickerAlias?: string;
        visit?:boolean;
    }) {

        return cy.saveForm(form).then(formBody => {

            const dataType = this.createDataType(dataTypePrefix);
            cy.saveDataType(dataType).then(dataTypeBody => {

                const template = this.createTemplate(templatePrefix);
                cy.saveTemplate(template).then(templateBody => {

                    const docType = this.createDocType(templateBody, docTypePrefix, this.docTypeAlias, dataTypeBody, formPickerAlias);
                    cy.saveDocumentType(docType).then((docTypeBody) => {

                        const content = this.createContent(templateBody, docTypeBody, formPickerAlias, formBody);
                        cy.saveContent(content).then((response) => {
                            return visit === true ? 
                                cy.visit(response.urls[0].text).then(() => formBody)
                                :
                                response;
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
      }
}