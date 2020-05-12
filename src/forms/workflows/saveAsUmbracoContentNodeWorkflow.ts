import { Workflow } from '../models/workflow';

import { SaveAsUmbracoContentNodeWorkflowModel } from '../models/saveAsUmbracoContentNodeWorkflowModel';
export class SaveAsUmbracoContentNodeWorkflow {
    public getWorkflow(model: SaveAsUmbracoContentNodeWorkflowModel):Workflow{
        const workflow = new Workflow();
        workflow.workflowTypeId='89fb1e31-9f36-4e08-9d1b-af1180d340db'; 
        workflow.workflowTypeName = 'Save as Umbraco content node';  
        workflow.name=model.workflowName;
        workflow.includeSensitiveData=model.includeSensitiveData;        
        workflow.executeOn = model.executeOn;    
        workflow.settings.push({name: 'Fields',  value: model.documentType});
        workflow.settings.push({ name: 'Publish', value: model.publish });
        workflow.settings.push({ name: 'RootNode', value: model.rootNode });             
        return workflow;  
    }
}