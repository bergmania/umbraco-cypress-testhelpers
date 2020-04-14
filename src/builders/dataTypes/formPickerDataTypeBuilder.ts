import DataTypeBuilderBase from './dataTypeBuilderBase';

export default class FormPickerDataTypeBuilder extends DataTypeBuilderBase {
  constructor() {
    super();
    this.selectedEditor = 'UmbracoForms.FormPicker';
  }
  withAllowedForms(formIds) {
    this.preValues = [{ key: 'allowedForms', value: formIds }];
    return this;
  }
  withAllowedForm(formId) {
    return this.withAllowedForms([formId]);
  }
}
