import FormFieldBuilderBase from "./formFieldBuilderBase";

export default class FormLongAnswerFieldBuilder extends FormFieldBuilderBase  {
  fieldTypeId = 'd5c0c390-ae9a-11de-a69e-666455d89593';
  removePrevalueEditor = true;

  withDefaultValue(defaultValue){
    this.settings.DefaultValue = defaultValue;

    return this;
  }
}
