import FormShortAnswerFieldBuilder from "./fields/formShortAnswerFieldBuilder";
import FormLongAnswerFieldBuilder from "./fields/formLongAnswerFieldBuilder";
import FormCheckboxFieldBuilder from "./fields/formCheckboxFieldBuilder";
import FormDateFieldBuilder from "./fields/formDateFieldBuilder";
import FormPasswordFieldBuilder from "./fields/formPasswordFieldBuilder";

export default class FormContainerBuilder {
  parentBuilder;
  caption;

  formFieldBuilders;

  withCaption(caption){
    this.caption = caption;

    return this;
  }

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.formFieldBuilders = [];
  }

  addShortAnswerField(){
    const builder =  new FormShortAnswerFieldBuilder(this);

    this.formFieldBuilders.push(builder);

    return builder;
  }

  addLongAnswerField(){
    const builder =  new FormLongAnswerFieldBuilder(this);

    this.formFieldBuilders.push(builder);

    return builder;
  }

  addDateField(){
    const builder =  new FormDateFieldBuilder(this);

    this.formFieldBuilders.push(builder);

    return builder;
  }

  addCheckboxField(){
    const builder =  new FormCheckboxFieldBuilder(this);

    this.formFieldBuilders.push(builder);

    return builder;
  }

  addPasswordField(){
    const builder = new FormPasswordFieldBuilder(this);

    this.formFieldBuilders.push(builder);

    return builder;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return {
      caption: this.caption || null,
      fields:  this.formFieldBuilders.map(function(builder) { return builder.build()}),
    }
  }
}
