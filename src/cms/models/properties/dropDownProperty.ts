import { BaseProperty } from './baseProperty';

export class DropDownProperty extends BaseProperty {
  public values: string[];
  public multiSelect: boolean;
  constructor(name: string, alias: string, multiSelect: boolean = false, values?: string[]) {
    super(name, alias);
    this.values = values;
    this.multiSelect = multiSelect;
  }
}
