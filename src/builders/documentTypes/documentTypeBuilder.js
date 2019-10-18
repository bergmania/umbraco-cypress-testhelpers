import faker from "faker";
import camelize from "camelize";
import DocumentTypeGroupBuilder from "./documentTypeGroupBuilder";

export default class DocumentTypeBuilder {
  compositeContentTypes;
  isContainer;
  allowAsRoot;
  allowedTemplates;
  allowedContentTypes;
  alias;
  description;
  thumbnail;
  name;
  id;
  icon;
  trashed;
  key;
  parentId;
  path;
  allowCultureVariant;
  isElement;
  defaultTemplate;

  documentTypeGroupBuilders;

  constructor() {
    this.isContainer = false;
    this.allowAsRoot = false;
    this.documentTypeGroupBuilders = [];
  }

  withAllowAsRoot(allowAsRoot){
    this.allowAsRoot = allowAsRoot;
    return this;
  }

  addGroup(){
    var builder =  new DocumentTypeGroupBuilder(this);

    this.documentTypeGroupBuilders.push(builder);

    return builder;
  }

  build() {
    var key = this.key || faker.random.uuid();
    var name = this.name || key;
    var alias = this.alias || "a" + camelize(name);

    return {
      compositeContentTypes : this.compositeContentTypes || [],
      isContainer : this.isContainer || false,
      allowAsRoot : this.allowAsRoot || false,
      allowedTemplates : this.allowedTemplates|| [],
      allowedContentTypes : this.allowedContentTypes|| [],
      alias : alias,
      description : this.description ||null,
      thumbnail : this.thumbnail || "folder.png",
      name : name,
      id : this.id || -1,
      icon : this.icon || "icon-document",
      trashed : this.trashed ||false,
      key : key,
      parentId : this.parentId ||-1,
      path : this.path || null,
      allowCultureVariant : this.allowCultureVariant || false,
      isElement : this.isElement || false,
      defaultTemplate : this.defaultTemplate || null,
      groups : this.documentTypeGroupBuilders.map(function(builder) { return builder.build()}),
    }
  }
}
