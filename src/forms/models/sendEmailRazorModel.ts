import faker from 'faker';

export class SendEmailRazorModel {
  public workflowName: string;
  public includeSensitiveData = false;
  // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows
  public executeOn: number = 0;
  public email: string = faker.internet.email();
  public senderEmail: string = faker.internet.email();
  public subject: string = faker.random.word();
  public razorViewFilePath: string = 'Forms/Emails/Example-Template.cshtml';
  public attachment: string = 'True';

  constructor(workflowName: string) {
    this.workflowName = workflowName;
  }
}
