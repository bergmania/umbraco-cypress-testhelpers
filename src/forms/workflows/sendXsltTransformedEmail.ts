import { Workflow } from '../models/workflow';
import faker from 'faker';

export class SendXsltTransformedEmail{
    public getWorkflow(
        workflowName: string = faker.random.word(),        
        includeSensitiveData= false,
        // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows      
        executeOn: number = 0, 
        email: string = faker.internet.email(),
        senderEmail: string = faker.internet.email(),
        subject: string = faker.random.word(),       
        xsltFile: string = '',      
        ):Workflow
        {
        const workflow = new Workflow();
        workflow.workflowTypeId='616edfeb-badf-414b-89dc-d8655eb85998'; 
        workflow.workflowTypeName = 'Send xslt transformed email';
        workflow.name=workflowName;
        workflow.includeSensitiveData=includeSensitiveData;        
        workflow.executeOn = executeOn;    
        workflow.settings.push({name: 'Email',  value:email});
        workflow.settings.push({ name: 'SenderEmail', value: senderEmail });        
        workflow.settings.push({name: 'Subject',  value:subject});                
        workflow.settings.push({name: 'XsltFile',  value:xsltFile});
                
        return workflow;  
    }
}