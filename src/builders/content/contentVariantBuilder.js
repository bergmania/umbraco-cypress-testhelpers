import faker from "faker";
import ContentVariantPropertyBuilder from "./contentVariantPropertyBuilder";

export default class ContentVariantBuilder {
  parentBuilder;

  name;
  culture;
  publish;
  save;
  releaseDate;
  expireDate;

  contentVariantPropertyBuilders;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.contentVariantPropertyBuilders = [];
  }

  addProperty(){
    var builder =  new ContentVariantPropertyBuilder(this);

    this.contentVariantPropertyBuilders.push(builder);

    return builder;
  }
  withCulture(culture){
    this.culture = culture;
    return this;
  }
  withPublish(publish){
    this.publish = publish;
    return this;
  }
  withSave(save){
    this.save = save;
    return this;
  }
  withName(name){
    this.name = name;
    return this;
  }

  done(){
    return this.parentBuilder;
  }

  build() {
    var name = this.name || faker.random.uuid();

    return {
      name: name,
      properties : this.contentVariantPropertyBuilders.map(function(builder) { return builder.build()}),
      culture: this.culture || null,
      publish: this.publish || false,
      save: this.save || false,
      releaseDate: this.releaseDate || null,
      expireDate: this.expireDate || null,
    }
  }
}
