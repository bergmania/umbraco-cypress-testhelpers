import { Workflow } from '../models/workflow';
import faker from 'faker';
export class SaveAsUmbracoContentNodeWorkflow {
    public getWorkflow(
        workflowName: string = faker.random.word(),   
        whereToSave: number,     
        includeSensitiveData= false,
        // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows      
        executeOn: number = 0, 
        
        publish = 'True',
        documentType?: {doctype?:string,
            nameField?: string,
            nameStaticValue?: number;
            properties?: [{
                id: string,
                value: string,
                field: string,
                staticvalue: string,
                $$hashKey: string
            }]
        },        
        
    ):Workflow{
        const workflow = new Workflow();
        workflow.workflowTypeId='89fb1e31-9f36-4e08-9d1b-af1180d340db'; 
        workflow.workflowTypeName = 'Save as Umbraco content node';  
        workflow.name=workflowName;
        workflow.includeSensitiveData=includeSensitiveData;        
        workflow.executeOn = executeOn;    
        workflow.settings.push({name: 'Fields',  value: documentType});
        workflow.settings.push({ name: 'Publish', value:publish });
        workflow.settings.push({ name: 'RootNode', value: whereToSave });             
        return workflow;  
    }
}