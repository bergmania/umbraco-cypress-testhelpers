import FormShortAnswerFieldBuilder from "./fields/formShortAnswerFieldBuilder";

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
    var builder =  new FormShortAnswerFieldBuilder(this);

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
