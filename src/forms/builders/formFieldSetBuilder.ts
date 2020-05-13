import { FormContainerBuilder } from './formContainerBuilder';

export class FormFieldSetBuilder {
  parentBuilder;
  caption;

  formContainerBuilders;
  withCaption(caption) {
    this.caption = caption;
    return this;
  }

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.formContainerBuilders = [];
  }

  addContainer() {
    const builder = new FormContainerBuilder(this);

    this.formContainerBuilders.push(builder);

    return builder;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return {
      caption: this.caption || null,
      containers: this.formContainerBuilders.map((builder) => {
        return builder.build();
      }),
    };
  }
}
