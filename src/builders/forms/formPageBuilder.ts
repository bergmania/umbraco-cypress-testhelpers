import FormFieldSetBuilder from './formFieldSetBuilder';

export default class FormPageBuilder {
  parentBuilder;
  caption;

  formFieldSetBuilders;

  withCaption(caption) {
    this.caption = caption;

    return this;
  }

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.formFieldSetBuilders = [];
  }

  addFieldSet() {
    const builder = new FormFieldSetBuilder(this);

    this.formFieldSetBuilders.push(builder);

    return builder;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return {
      caption: this.caption || null,
      fieldSets: this.formFieldSetBuilders.map((builder) => {
        return builder.build();
      }),
    };
  }
}
