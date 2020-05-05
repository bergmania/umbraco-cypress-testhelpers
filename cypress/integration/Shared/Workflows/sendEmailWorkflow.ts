import { Workflow } from '../Models/workflow';
import faker from 'faker';
export class SendEmailWorkflow {
    public getWorkflow(
        workflowName: string = faker.random.word(),        
        includeSensitiveData= false,
        // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows      
        executeOn: number = 0, 
        email: string = faker.internet.email(),
        senderEmail: string = faker.internet.email() ,
        subject: string = faker.random.word(),
        message: string= faker.lorem.lines(2),
        attachment = 'True',
        
    ):Workflow{
        const workflow = new Workflow();
        workflow.workflowTypeId='e96badd7-05be-4978-b8d9-b3d733de70a5'; 
        workflow.name=workflowName;
        workflow.workflowTypeName = 'Send email';
        workflow.includeSensitiveData=includeSensitiveData;        
        workflow.executeOn = executeOn;    
        workflow.settings.push({name: 'Email',  value:email});
        workflow.settings.push({ name: 'SenderEmail', value: senderEmail });
        workflow.settings.push({ name: 'Subject', value: subject});
        workflow.settings.push({ name: 'Message', value: message });
        workflow.settings.push({ name: 'Attachment', value: attachment });  
        return workflow;  
    }
}
