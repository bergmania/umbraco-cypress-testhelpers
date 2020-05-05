import { Workflow } from '../Models/workflow';
import faker from 'faker';

export enum Method {'POST'=0, 'GET'=1, 'PUT'=2, 'DELETE'=3}
export class SendFormToUrl{
    public getWorkflow(
        workflowName: string = faker.random.word(),        
        includeSensitiveData= false,
        // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows      
        executeOn: number = 0, 
        url: string = '127.0.0.1',
        method: Method =Method.POST,                               
        user: string='user',
        password: string='password',
        fields?: [{alias: string, value: string, staticValue: string, $$hashKey: string}],
        ):Workflow
        {
        const workflow = new Workflow();
        workflow.workflowTypeId='fd02c929-4e7d-4f90-b9fa-13d074a76688'; 
        workflow.workflowTypeName = 'Send form to URL';
        workflow.name=workflowName;
        workflow.includeSensitiveData=includeSensitiveData;        
        workflow.executeOn = executeOn;    
        workflow.settings.push({name: 'Url',  value:url});
        workflow.settings.push({ name: 'Method', value: Method[method] });                
        workflow.settings.push({name: 'Fields',  value:fields});                
        workflow.settings.push({name: 'UserName',  value:user});
        workflow.settings.push({name: 'Password',  value:password});
        return workflow;  
    }
}