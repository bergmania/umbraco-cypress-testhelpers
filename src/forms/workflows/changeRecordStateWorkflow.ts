import { Workflow } from '../models/workflow';
import faker from 'faker';
export enum RecordStateAction {
  'Delete Record' = 0,
  'Approve Record' = 1,
}
export class ChangeRecordStateWorkflow {
  public getWorkflow(
    workflowName: string = faker.random.word(),
    includeSensitiveData = false,
    // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows
    executeOn = 0,
    action: RecordStateAction = RecordStateAction['Approve Record'],
    words: string[] = ['word'],
  ): Workflow {
    const workflow = new Workflow();
    workflow.workflowTypeId = '4c40a092-0cb5-481d-96a7-a02d8e7cdb2f';
    workflow.workflowTypeName = 'Change Record State';
    workflow.name = workflowName;
    workflow.includeSensitiveData = includeSensitiveData;
    workflow.executeOn = executeOn;
    workflow.settings.push({ name: 'Words', value: words.join(',') });
    workflow.settings.push({ name: 'Action', value: RecordStateAction[action] });
    return workflow;
  }
}
