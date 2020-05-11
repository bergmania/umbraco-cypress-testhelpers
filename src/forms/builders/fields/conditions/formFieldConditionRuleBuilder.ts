export class FormFieldConditionRuleBuilder {
  parentBuilder;

  field;
  operator;
  value;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
  }

  withContainsRule(fieldId, value) {
    this.field = fieldId;
    this.value = value;
    this.operator = 'Contains';

    return this;
  }

  withIsRule(fieldId, value) {
    this.field = fieldId;
    this.value = value;
    this.operator = 'Is';

    return this;
  }

  withIsNotRule(fieldId, value) {
    this.field = fieldId;
    this.value = value;
    this.operator = 'IsNot';

    return this;
  }

  withGreaterThanRule(fieldId, value) {
    this.field = fieldId;
    this.value = value;
    this.operator = 'GreaterThen';

    return this;
  }

  withLessThanRule(fieldId, value) {
    this.field = fieldId;
    this.value = value;
    this.operator = 'LessThen';

    return this;
  }

  withStartsWithRule(fieldId, value) {
    this.field = fieldId;
    this.value = value;
    this.operator = 'StartsWith';

    return this;
  }

  withEndsWithRule(fieldId, value) {
    this.field = fieldId;
    this.value = value;
    this.operator = 'EndsWith';

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
    };
  }
}
