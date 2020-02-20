import FormFieldConditionRuleBuilder from "./formFieldConditionRuleBuilder";


export default class FormFieldConditionBuilder {
  parentBuilder;

  actionType;
  enabled;
  logicType;

  formFieldConditionRuleBuilders;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.formFieldConditionRuleBuilders = [];
  }

  withActionAndLogic(actionType, logicType){
    this.actionType = actionType;
    this.logicType = logicType;
    this.enabled = true;
  }

  done() {
    return this.parentBuilder;
  }

  addRule(){
    var builder =  new FormFieldConditionRuleBuilder(this);

    this.formFieldConditionRuleBuilders.push(builder);

    return builder;
  }


  build() {
    if(!this.enabled){
      return {

      };
    }

    return {
      enabled: this.enabled || false,
      actionType: this.actionType || '',
      logicType: this.logicType || null,
      rules: this.formFieldConditionRuleBuilders.map(function(builder) { return builder.build()}),
    }
  }
}
