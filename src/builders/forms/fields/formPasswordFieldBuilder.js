import FormFieldBuilderBase from "./formFieldBuilderBase";

export default class FormPasswordFieldBuilder extends FormFieldBuilderBase  {
  fieldTypeId = 'fb37bc60-d41e-11de-aeae-37c155d89593';
  removePrevalueEditor = true;

  withPlaceholder(placeholder){
    this.settings.Placeholder = placeholder;

    return this;
  }
}
