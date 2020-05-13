import { BaseProperty } from './baseProperty';

export class FormPickerProperty extends BaseProperty {
  allowedFormIds: string[];
  value: string;
  constructor(name: string, alias: string, value: string, allowedFormIds?: string[]) {
    super(name, alias);
    this.allowedFormIds = allowedFormIds;
    this.value = value;
  }
}
