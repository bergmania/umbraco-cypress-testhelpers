import FormFieldBuilderBase from "./formFieldBuilderBase";

export default class FormLongAnswerFieldBuilder extends FormFieldBuilderBase  {
  fieldTypeId = '023f09ac-1445-4bcb-b8fa-ab49f33bd046';
  removePrevalueEditor = true;

  withDefaultValue(defaultValue){
    this.settings.DefaultValue = defaultValue;

    return this;
  }

  withPlaceholder(placeholder){
    this.settings.Placeholder = placeholder;

    return this;
  }
}
