export class SaveAsUmbracoContentNodeWorkflowModel {
  public workflowName: string;
  public rootNode: number;
  public includeSensitiveData = false;
  // Need to figure out how to expose enum from package. 0=Submit, 1=Approve -> for workflows
  public executeOn = 0;
  public publish = 'True';
  public documentType: {
    doctype?: string;
    nameField?: string;
    nameStaticValue?: number;
    properties?: [
      {
        id: string;
        value: string;
        field: string;
        staticvalue: string;
        $$hashKey: string;
      },
    ];
  };
  constructor(workflowName?: string) {
    this.workflowName = workflowName;
  }
}
