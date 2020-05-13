import { Workflow } from '../models/workflow';
import { SendEmailRazorModel } from '../models/sendEmailRazorModel';
export class SendEmailRazorWorkflow {
  public getWorkflow(model: SendEmailRazorModel): Workflow {
    const workflow = new Workflow();
    workflow.workflowTypeId = '17c61629-d984-4e86-b43b-a8407b3efea9';
    workflow.name = model.workflowName;
    workflow.includeSensitiveData = model.includeSensitiveData;
    workflow.workflowTypeName = 'Send email with template (Razor)';
    workflow.executeOn = model.executeOn;
    workflow.settings.push({ name: 'Email', value: model.email });
    workflow.settings.push({ name: 'SenderEmail', value: model.senderEmail });
    workflow.settings.push({ name: 'Subject', value: model.subject });
    workflow.settings.push({ name: 'RazorViewFilePath', value: model.razorViewFilePath });
    workflow.settings.push({ name: 'Attachment', value: model.attachment });
    return workflow;
  }
}
