import { FormFieldBuilderBase } from './formFieldBuilderBase';

export class FormCheckboxFieldBuilder extends FormFieldBuilderBase {
  fieldTypeId = 'd5c0c390-ae9a-11de-a69e-666455d89593';
  removePrevalueEditor = true;

  withDefaultValue(defaultValue: string) {
    // tslint:disable-next-line: no-string-literal
    this.settings['DefaultValue'] = defaultValue;

    return this;
  }
}
