import faker from 'faker'

export default class FormFieldConditionRuleBuilder {
  parentBuilder;

  field;
  operator;
  value;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
  }

  withContainsRule(fieldId, value){
    this.field = fieldId;
    this.value = value;
    this.operator = "Contains";

    return this;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return {
      field: this.field || null,
      operator: this.operator || null,
      value: this.value || null,
    }
  }
}
