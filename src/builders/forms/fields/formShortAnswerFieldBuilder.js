import faker from "faker";
import camelize from "camelize";
import FormFieldConditionBuilder from "./conditions/formFieldConditionBuilder";

export default class FormShortAnswerFieldBuilder {
  parentBuilder;

  alias;
  caption;
  id;
  settings;

  formFieldConditionBuilder;

  withCaption(caption){
    this.caption = caption;

    return this;
  }

  withId(id){
    this.id = id;

    return this;
  }


  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.formFieldConditionBuilder = new FormFieldConditionBuilder(this);
  }

  done() {
    return this.parentBuilder;
  }

  addShowAllConditions(){
    this.formFieldConditionBuilder.withActionAndLogic('Show', 'All');

    return this.formFieldConditionBuilder;
  }

  addShowAnyConditions(){
    this.formFieldConditionBuilder.withActionAndLogic('Show', 'Any');

    return this.formFieldConditionBuilder;
  }

  addHideAllConditions(){
    this.formFieldConditionBuilder.withActionAndLogic('Hide', 'All');

    return this.formFieldConditionBuilder;
  }

  addHideAnyConditions(){
    this.formFieldConditionBuilder.withActionAndLogic('Hide', 'Any');

    return this.formFieldConditionBuilder;
  }


  build() {
    var id = this.id || faker.random.uuid();
    var caption = this.caption || id;
    var alias = this.alias || "a" + camelize(caption);

    return {
      alias: this.alias || alias,
      caption: caption,
      fieldTypeId: '3f92e01b-29e2-4a30-bf33-9df5580ed52c',
      id: id,
      preValues: this.preValues || [],
      removePrevalueEditor: false,
      settings: this.settings || {},
      condition: this.formFieldConditionBuilder.build(),
    }
  }
}
