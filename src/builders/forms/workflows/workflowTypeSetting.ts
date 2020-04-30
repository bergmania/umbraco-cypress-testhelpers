import faker from 'faker';
import { IBuilder } from '../iBuilder';
// skipping 
// import { WorkflowTypeSetting } from './iWorkflowTypeSetting';
// implements IWorkflowTypeSetting
// as this fails on the build server


export class WorkflowTypeSetting  {
  parentBuilder: IBuilder;

  description: string;
  name: string;
  prevalues: string[];
  value: string;
  view: string;
  constructor(parentBuilder: IBuilder) {
    this.parentBuilder = parentBuilder;
    this.description = faker.lorem.words(4);
    this.name = '';
    this.prevalues = [''];
    this.value = '';
    this.view = '/App_Plugins/UmbracoForms/Backoffice/Common/SettingTypes/TextField.html';
  }

  withDescription(description: string): WorkflowTypeSetting {
    this.description = description;
    return this;
  }

  withName(name: string): WorkflowTypeSetting {
    this.name = name;
    return this;
  }

  withPrevalues(prevalues: string[]): WorkflowTypeSetting {
    this.prevalues = prevalues;
    return this;
  }

  withValue(value: string): WorkflowTypeSetting {
    this.value = value;
    return this;
  }
  withView(view: string): WorkflowTypeSetting {
    this.view = view;
    return this;
  }

  done(): IBuilder {
    return this.parentBuilder;
  }

  build() {
    return {
      alias: this.name,
      description: this.description,
      name: this.name,
      prevalues: this.prevalues,
      value: this.value,
      view: this.view,
    };
  }
}
