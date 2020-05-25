import { FormFieldBuilderBase } from './formFieldBuilderBase';

export class UploadFileFieldBuilder extends FormFieldBuilderBase {
  fieldTypeId = '84a17cf8-b711-46a6-9840-0e4a072ad000';
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
