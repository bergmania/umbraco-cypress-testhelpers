import { FormPageBuilder } from './formPageBuilder';
import { IBuilder } from './iBuilder';
import { FormWorkflowBuilder } from './workflows/formWorkflowBuilder';

enum ExecuteOn {
  onSubmit = 0,
  onAprrove = 1,
}
export class FormBuilder implements IBuilder {
  created;
  cssClass;
  datasource;
  disableDefaultStylesheet;
  fieldIndicationType;
  formWorkflows;
  goToPageOnSubmit;
  hideFieldValidation;
  id;
  indicator;
  invalidErrorMessage;
  manualApproval;
  messageOnSubmit;
  name;
  nextLabel;
  prevLabel;
  requiredErrorMessage;
  showValidationSummary;
  storeRecordsLocally;
  submitLabel;
  useClientDependency;
  xPathOnSubmit;

  formPageBuilders;

  private onSubmit: IBuilder[];
  private onApprove: IBuilder[];

  constructor() {
    this.useClientDependency = false;
    this.formPageBuilders = [];
    this.onApprove = [];
    this.onSubmit = [];
  }
  withId(id) {
    this.id = id;
    return this;
  }
  withName(name) {
    this.name = name;
    return this;
  }
  addPage() {
    const builder = new FormPageBuilder(this);
    this.formPageBuilders.push(builder);
    return builder;
  }
  addFormWorkflowType(executeOn): FormWorkflowBuilder {
    const builder = new FormWorkflowBuilder(this);
    executeOn === ExecuteOn.onAprrove ? this.onApprove.push(builder) : this.onSubmit.push(builder);
    return builder;
  }
  done() {
    throw new Error('Not implemented');
  }
  build() {
    return {
      created: this.created || new Date(),
      cssClass: this.cssClass || null,
      datasource: this.datasource || null,
      disableDefaultStylesheet: this.disableDefaultStylesheet || false,
      fieldIndicationType: this.fieldIndicationType || 'MarkMandatoryFields',
      formWorkflows: {
        onApprove: this.onApprove.map((builder) => {
          return builder.build();
        }),
        onSubmit: this.onSubmit.map((builder) => {
          return builder.build();
        }),
      },
      goToPageOnSubmit: this.goToPageOnSubmit || 0,
      hideFieldValidation: this.hideFieldValidation || false,
      id: this.id || '00000000-0000-0000-0000-000000000000',
      indicator: this.indicator || '*',
      invalidErrorMessage: this.invalidErrorMessage || 'Please provide a valid value for {0}',
      manualApproval: this.manualApproval || false,
      messageOnSubmit: this.messageOnSubmit || 'Thank you',
      name: this.name || 'no name',
      nextLabel: this.nextLabel || 'Next',
      pages: this.formPageBuilders.map((builder) => {
        return builder.build();
      }),
      prevLabel: this.prevLabel || 'Previous',
      requiredErrorMessage: this.requiredErrorMessage || 'Please provide a value for {0}',
      showValidationSummary: this.showValidationSummary || false,
      storeRecordsLocally: this.storeRecordsLocally || true,
      submitLabel: this.submitLabel || 'Submit',
      useClientDependency: this.useClientDependency || false,
      xPathOnSubmit: this.xPathOnSubmit || null,
    };
  }
}
