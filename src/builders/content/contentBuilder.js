import faker from 'faker'
import ContentVariantBuilder from "./contentVariantBuilder";

export default class ContentBuilder {
  id;
  contentTypeAlias;
  parentId;
  action;
  expireDate;
  releaseDate;
  templateAlias;

  contentVariantBuilders;

  constructor() {
    this.contentVariantBuilders = [];
  }

  withContentTypeAlias(contentTypeAlias){
    this.contentTypeAlias = contentTypeAlias;
    return this;
  }
  addVariant(){
    var builder =  new ContentVariantBuilder(this);

    this.contentVariantBuilders.push(builder);

    return builder;
  }


  build() {

    return {
      id: this.id || 0,
      contentTypeAlias: this.contentTypeAlias || null,
      parentId: this.parentId || -1,
      action: this.action || "publishNew",
      variants : this.contentVariantBuilders.map(function(builder) { return builder.build()}),
      expireDate: this.expireDate || null,
      releaseDate: this.releaseDate || null,
      templateAlias: this.templateAlias || null,

    }
  }
}


