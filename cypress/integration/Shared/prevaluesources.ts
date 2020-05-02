export class PrevalueSources {

    private readonly fieldPreValueSourceTextFileTypeId = '35c2053e-cbf7-4793-b27c-6e97b7671a2d';
    private readonly fieldPreValueSourceDocumentTypeId='de996870-c45a-11de-8a39-0800200c9a66';
    private readonly fieldPreValueSourceDataTypePrevalueId='ea773caf-fef2-491b-b5b7-6a3552b1a0e2'
    
    public insertTextFile(name: string) {
        return cy.postFile('prevalueSourceFile.txt', '/backoffice/UmbracoForms/PreValueFile/PostAddFile').then(
            settings => {
                const payload = {
                    fieldPreValueSourceTypeId: this.fieldPreValueSourceTextFileTypeId,
                    name: name,
                    settings: { TextFile: settings.FilePath }
                }
               return this.insert(payload);
            }
        )
    };

    public insertDocument(name: string, rootNode: number, doctype: string) {        
        const payload = {
            fieldPreValueSourceTypeId: this.fieldPreValueSourceDocumentTypeId,
            name: name,
            settings: {RootNode: rootNode, DocType: doctype}
        }        
        return this.insert(payload);
    }    
    public insertDataTypePrevalue(name: string,dataTypeId: number){        
        const payload = {
            fieldPreValueSourceTypeId: this.fieldPreValueSourceDataTypePrevalueId,
            name: name,
            settings: {DataTypeId: dataTypeId}
        }        
        return this.insert(payload);
    } 
    private insert(payload){
        return cy.postRequest('/backoffice/UmbracoForms/PreValueSource/ValidateSettings', payload).then(() => {
                    cy.postRequest('/backoffice/UmbracoForms/PreValueSource/PostSave', payload).then(postsave =>{
                        cy.postRequest('/backoffice/UmbracoForms/PreValueSource/GetPreValues', payload).then(() => postsave)
                    
                    });
                });
    }


  
    

    public cleanUp() {
        return cy.deleteAllPreValues();
    }
}