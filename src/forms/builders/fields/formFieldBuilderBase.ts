import faker from 'faker';

import camelize from 'camelize';
import { FormFieldConditionBuilder } from './conditions/formFieldConditionBuilder';

export class FormFieldBuilderBase {
  parentBuilder;

  alias;
  caption;
  id;
  fieldTypeId;
  preValues = [];
  settings: { DefaultValue: string };
  invalidErrorMessage;
  containsSensitiveData;
  regex;
  mandatory;
  requiredErrorMessage;
  removePrevalueEditor;

  formFieldConditionBuilder;

  withCaption(caption) {
    this.caption = caption;

    return this;
  }

  withId(id) {
    this.id = id;

    return this;
  }

  withMandatory(mandatory) {
    this.mandatory = mandatory;

    return this;
  }

  withRequiredErrorMessage(requiredErrorMessage) {
    this.requiredErrorMessage = requiredErrorMessage;

    return this;
  }

  withValidationMessage(invalidErrorMessage) {
    this.invalidErrorMessage = invalidErrorMessage;

    return this;
  }

  withValidationRegex(regex) {
    this.regex = regex;

    return this;
  }

  withAlias(alias) {
    this.alias = alias;

    return this;
  }
  withSensitiveData(containsSensitiveData) {
    this.containsSensitiveData = containsSensitiveData;
    return this;
  }

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.formFieldConditionBuilder = new FormFieldConditionBuilder(this);
  }

  done() {
    return this.parentBuilder;
  }

  addShowAllConditions() {
    this.formFieldConditionBuilder.withActionAndLogic('Show', 'All');

    return this.formFieldConditionBuilder;
  }

  addShowAnyConditions() {
    this.formFieldConditionBuilder.withActionAndLogic('Show', 'Any');

    return this.formFieldConditionBuilder;
  }

  addHideAllConditions() {
    this.formFieldConditionBuilder.withActionAndLogic('Hide', 'All');

    return this.formFieldConditionBuilder;
  }

  addHideAnyConditions() {
    this.formFieldConditionBuilder.withActionAndLogic('Hide', 'Any');

    return this.formFieldConditionBuilder;
  }

  build() {
    const id = this.id || faker.random.uuid();
    const caption = this.caption || id;
    const alias = this.alias || 'a' + camelize(caption);

    return {
      alias: this.alias || alias,
      caption,
      fieldTypeId: this.fieldTypeId,
      id,
      regex: this.regex || null,
      invalidErrorMessage: this.invalidErrorMessage || null,
      requiredErrorMessage: this.requiredErrorMessage || null,
      preValues: this.preValues,
      removePrevalueEditor: this.removePrevalueEditor || false,
      mandatory: this.mandatory || false,
      containsSensitiveData: this.containsSensitiveData || false,
      settings: this.settings,
      condition: this.formFieldConditionBuilder.build(),
    };
  }
}
