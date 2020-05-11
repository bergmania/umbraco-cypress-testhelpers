import {FormFieldBuilderBase} from './formFieldBuilderBase';

export class FormLongAnswerFieldBuilder extends FormFieldBuilderBase {
  fieldTypeId = '023f09ac-1445-4bcb-b8fa-ab49f33bd046';
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
