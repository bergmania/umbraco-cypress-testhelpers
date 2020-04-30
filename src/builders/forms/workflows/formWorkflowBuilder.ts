import faker from 'faker';
import { IBuilder } from '../iBuilder';

import { WorkflowTypeSetting } from './workflowTypeSetting';
// skipping 
// import { IFormWorkflowBuilder } from './iformWorkflowBuilder';
// implements IFormWorkflowBuilder 
// as this fails on the build server
export class FormWorkflowBuilder  {
  parentBuilder;

  active: boolean;
  form: string;
  id: string;
  includeSensitiveData: boolean;
  isDeleted: boolean;
  name: string;
  settings: IBuilder[];
  sortOrder: number;
  workflowTypeDescription: string;
  workflowTypeGroup: string;
  workflowTypeIcon: string;
  workflowTypeId: string;
  workflowTypeName: string;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.active = true;
    this.form = this.parentBuilder.id;
    this.id = faker.random.uuid();
    this.includeSensitiveData = true;
    this.isDeleted = false;
    this.name = faker.random.word();
    this.settings = [];
    this.sortOrder = faker.random.number();
    this.workflowTypeDescription = faker.random.word();
    this.workflowTypeGroup = faker.random.word();
    this.workflowTypeIcon = 'icon-message';
    this.workflowTypeId = faker.random.uuid();
    this.workflowTypeName = faker.random.word();
  }

  done() {
    return this.parentBuilder;
  }

  withActive(active: boolean): FormWorkflowBuilder {
    this.active = active;
    return this;
  }
  withForm(form: string): FormWorkflowBuilder {
    this.form = form;
    return this;
  }
  withId(id: string): FormWorkflowBuilder {
    this.id = id;
    return this;
  }
  withIncludeSensitiveData(includeSensitiveData: boolean): FormWorkflowBuilder {
    this.includeSensitiveData = includeSensitiveData;
    return this;
  }
  withIsDeleted(isDeleted: boolean): FormWorkflowBuilder {
    this.isDeleted = isDeleted;
    return this;
  }
  withName(name): FormWorkflowBuilder {
    this.name = name;
    return this;
  }
  withSetting(settings: []): FormWorkflowBuilder {
    this.settings = settings;
    return this;
  }
  withSortOrder(sortOrder: number): FormWorkflowBuilder {
    this.sortOrder = sortOrder;
    return this;
  }
  withWorkflowTypeDescription(workflowTypeDescription: string): FormWorkflowBuilder {
    this.workflowTypeDescription = workflowTypeDescription;
    return this;
  }
  withWorkflowTypeGroup(workflowTypeGroup: string): FormWorkflowBuilder {
    this.workflowTypeGroup = workflowTypeGroup;
    return this;
  }
  withWorkflowTypeIcon(workflowTypeIcon: string): FormWorkflowBuilder {
    this.workflowTypeIcon = workflowTypeIcon;
    return this;
  }
  withWorkflowTypeId(workflowTypeId: string): FormWorkflowBuilder {
    this.workflowTypeId = workflowTypeId;
    return this;
  }
  withWorkflowTypeName(workflowTypeName: string) {
    this.workflowTypeName = workflowTypeName;
    return this;
  }
  addSetting(setting: { name: string; value: string }): IFormWorkflowBuilder {
    const builder = new WorkflowTypeSetting(this);
    builder.name = setting.name;
    builder.value = setting.value;
    this.settings.push(builder);
    return this;
  }

  build() {
    return {
      active: this.active,
      form: this.form,
      id: this.id,
      includeSensitiveData: this.includeSensitiveData,
      isDeleted: this.isDeleted,
      name: this.name,
      settings: this.settings.map((builder) => {
        return builder.build();
      }),
      sortOrder: this.sortOrder,
      workflowTypeDescription: this.workflowTypeDescription,
      workflowTypeGroup: this.workflowTypeGroup,
      workflowTypeIcon: this.workflowTypeIcon,
      workflowTypeId: this.workflowTypeId,
      workflowTypeName: this.workflowTypeName,
    };
  }
}
