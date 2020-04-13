import DataTypeBuilderBase from './dataTypeBuilderBase';

export default class FormPickerDataTypeBuilder extends DataTypeBuilderBase {
  withAllowedForms(formIds) {
    this.preValues = [{ key: 'allowedForms', value: formIds }];
    return this;
  }
  withAllowedForm(formId) {
    return this.withAllowedForms([formId]);
  }
}
