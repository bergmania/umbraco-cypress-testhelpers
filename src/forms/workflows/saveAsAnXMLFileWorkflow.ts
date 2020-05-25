import { Workflow } from '../models/workflow';
import faker from 'faker';
export class SaveAsAnXMLFileWorkflow {
  public getWorkflow(
    workflowName: string = faker.random.word(),
    includeSensitiveData = false,
    // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows
    executeOn = 0,
    path = 'c:\\tmp',
    extension = '.mxl',
    xsltFile = '',
  ): Workflow {
    const workflow = new Workflow();
    workflow.workflowTypeId = '9cc5854d-61a2-48f6-9f4a-8f3bdfafb521';
    workflow.workflowTypeName = 'Save as an XML file';
    workflow.name = workflowName;
    workflow.includeSensitiveData = includeSensitiveData;
    workflow.executeOn = executeOn;
    workflow.settings.push({ name: 'Path', value: path });
    workflow.settings.push({ name: 'Extension', value: extension });
    workflow.settings.push({ name: 'XsltFile', value: xsltFile });
    return workflow;
  }
}
