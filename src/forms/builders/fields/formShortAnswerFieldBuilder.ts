import { FormFieldBuilderBase } from './formFieldBuilderBase';

export class FormShortAnswerFieldBuilder extends FormFieldBuilderBase {
  fieldTypeId = '3f92e01b-29e2-4a30-bf33-9df5580ed52c';
  removePrevalueEditor = true;

  withDefaultValue(defaultValue: string) {
    // tslint:disable-next-line: no-string-literal
    this.settings['DefaultValue'] = defaultValue;
    return this;
  }

  withPlaceholder(placeholder) {
    // tslint:disable-next-line: no-string-literal
    this.settings['Placeholder'] = placeholder;
    return this;
  }
}
