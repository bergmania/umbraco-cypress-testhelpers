import faker from "faker";
import FormPickerDocumentTypePropertyBuilder from "./properties/formPickerDocumentTypePropertyBuilder";

export default class DocumentTypeGroupBuilder {
  parentBuilder;

  name;
  sortOrder;

  documentTypeGroupPropertyBuilders;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.sortOrder = 0;
    this.documentTypeGroupPropertyBuilders = [];
  }

  addFormPickerProperty(){
    var builder =  new FormPickerDocumentTypePropertyBuilder(this);

    this.documentTypeGroupPropertyBuilders.push(builder);

    return builder;
  }

  done(){
    return this.parentBuilder;
  }

  build() {

    return {
      name: this.name || faker.random.uuid(),
      sortOrder: this.sortOrder || 0,
      properties : this.documentTypeGroupPropertyBuilders.map(function(builder) { return builder.build()}),
    }
  }
}
