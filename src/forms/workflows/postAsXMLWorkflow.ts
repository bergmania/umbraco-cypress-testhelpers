import { Workflow } from '../models/workflow';
import faker from 'faker';

export enum Method {'POST'=0, 'GET'=1, 'PUT'=2, 'DELETE'=3}
export class PostAsXMLWorkflow{
    public getWorkflow(
        workflowName: string = faker.random.word(),        
        includeSensitiveData= false,
        // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows      
        executeOn: number = 0, 
        url: string = '127.0.0.1',
        method: Method =Method.POST,        
        xsltFile: string = '',        
        user: string='user',
        password: string='password',
        headers?: [{alias: string, value: string, staticValue: string, $$hashKey: string}],
        ):Workflow
        {
        const workflow = new Workflow();
        workflow.workflowTypeId='470eeb3a-cb15-4b08-9fc0-a2f091583332'; 
        workflow.workflowTypeName = 'Post as XML';
        workflow.name=workflowName;
        workflow.includeSensitiveData=includeSensitiveData;        
        workflow.executeOn = executeOn;    
        workflow.settings.push({name: 'Url',  value:url});
        workflow.settings.push({ name: 'Method', value: Method[method] });        
        workflow.settings.push({name: 'XsltFile',  value:xsltFile});
        workflow.settings.push({name: 'Fields',  value:headers});                
        workflow.settings.push({name: 'Username',  value:user});
        workflow.settings.push({name: 'Password',  value:password});
        return workflow;  
    }
}