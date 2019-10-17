import  * as Helpers from './Helpers'

/////////////////  DataType START  //////////////
export class FormPickerDataTypeBuilder {
  action;
  id;
  name;
  parentId;
  preValues;

  constructor() {

  }

  withAction(action){
    this.action = action;
    return this;
  }
  withId(id){
    this.id = id;
    return this;
  }
  withName(name){
    this.name = name;
    return this;
  }

  withAllowedForms(formIds){
    this.preValues = [{key: "allowedForms", value: formIds}];
    return this;
  }

  withAllowedForm(formId){
    return this.withAllowedForms([formId]);
  }


  build() {
    var name = this.name || Helpers.generateGuid();

    return {
      action : this.action || "saveNew",
      id : this.id || 0,
      name : name,
      parentId: this.parentId || -1,
      preValues: this.preValues || [{key: "allowedForms", value: []}],
      selectedEditor: "UmbracoForms.FormPicker"
    }
  }

}

/////////////////  DataType END //////////////


class FormFieldConditionRuleBuilder {
  parentBuilder;

  field;
  operator;
  value;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
  }

  withContainsRule(fieldId, value){
    this.field = fieldId;
    this.value = value;
    this.operator = "Contains";

    return this;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return {
      field: this.field || null,
      operator: this.operator || null,
      value: this.value || null,
    }
  }
}

class FormFieldConditionBuilder {
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
      return null;
    }

    return {
      enabled: this.enabled || false,
      actionType: this.actionType || null,
      logicType: this.logicType || null,
      rules: this.formFieldConditionRuleBuilders.map(function(builder) { return builder.build()}),
    }
  }
}

class FormShortAnswerFieldBuilder {
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
    var id = this.id || Helpers.generateGuid();
    var caption = this.caption || id;
    var alias = this.alias || "a" + Helpers.camelize(caption);

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

class FormContainerBuilder {
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

class FormFieldSetBuilder {
  parentBuilder;
  caption;

  formContainerBuilders;
  withCaption(caption){
    this.caption = caption;
    return this;
  }

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.formContainerBuilders = [];
  }

  addContainer(){
    var builder =  new FormContainerBuilder(this);

    this.formContainerBuilders.push(builder);

    return builder;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return {
      caption: this.caption || null,
      containers:  this.formContainerBuilders.map(function(builder) { return builder.build()}),
    }
  }
}

class FormPageBuilder {
  parentBuilder;
  caption;

  formFieldSetBuilders;

  withCaption(caption){
    this.caption = caption;

    return this;
  }

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.formFieldSetBuilders = [];
  }

  addFieldSet(){
    var builder =  new FormFieldSetBuilder(this);

    this.formFieldSetBuilders.push(builder);

    return builder;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return {
      caption: this.caption || null,
      fieldSets:  this.formFieldSetBuilders.map(function(builder) { return builder.build()}),
    }
  }
}

export class FormBuilder {
  created;
  cssClass;
  datasource;
  disableDefaultStylesheet;
  fieldIndicationType;
  formWorkflows;
  goToPageOnSubmit;
  hideFieldValidation;
  id;
  indicator;
  invalidErrorMessage;
  manualApproval;
  messageOnSubmit;
  name;
  nextLabel;
  prevLabel;
  requiredErrorMessage;
  showValidationSummary;
  storeRecordsLocally;
  submitLabel;
  useClientDependency;
  workflows;
  xPathOnSubmit;

  formPageBuilders;

  constructor() {
    this.useClientDependency = false;
    this.formPageBuilders = [];
  }
  withId(id){
    this.id = id;

    return this;
  }
  withName(name){
    this.name = name;

    return this;
  }

  addPage(){
    var builder =  new FormPageBuilder(this);

    this.formPageBuilders.push(builder);

    return builder;
  }


  build() {
    return {
      created : this.created || new Date(),
      cssClass : this.cssClass || null,
      datasource : this.datasource || null,
      disableDefaultStylesheet : this.disableDefaultStylesheet || false,
      fieldIndicationType : this.fieldIndicationType || 'MarkMandatoryFields',
      formWorkflows : this.formWorkflows || {onApprove:[], onSubmit:[]},
      goToPageOnSubmit : this.goToPageOnSubmit || 0,
      hideFieldValidation : this.hideFieldValidation || false,
      id : this.id || '00000000-0000-0000-0000-000000000000',
      indicator : this.indicator || '*',
      invalidErrorMessage : this.invalidErrorMessage || 'Please provide a valid value for {0}',
      manualApproval : this.manualApproval || false,
      messageOnSubmit : this.messageOnSubmit || 'Thank you',
      name : this.name || "no name",
      nextLabel : this.nextLabel || 'Next',
      pages :  this.formPageBuilders.map(function(builder) { return builder.build()}),
      prevLabel : this.prevLabel || 'Previous',
      requiredErrorMessage : this.requiredErrorMessage || 'Please provide a value for {0}',
      showValidationSummary : this.showValidationSummary || false,
      storeRecordsLocally : this.storeRecordsLocally || true,
      submitLabel : this.submitLabel || 'Submit',
      useClientDependency : this.useClientDependency || false,
      workflows : this.workflows || [],
      xPathOnSubmit : this.xPathOnSubmit || null,
    }
  }

}

export class DocumentTypeBuilder {
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
    var key = this.key || Helpers.generateGuid();
    var name = this.name || key;
    var alias = this.alias || "a" + Helpers.camelize(name);

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

  addPropertyGroup(propertyGroup){
    this.groups.push(propertyGroup);

    return this;
  }

}


class DocumentTypeGroupBuilder {
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
      name: this.name || Helpers.generateGuid(),
      sortOrder: this.sortOrder || 0,
      properties : this.documentTypeGroupPropertyBuilders.map(function(builder) { return builder.build()}),
    }
  }
}


class FormPickerDocumentTypePropertyBuilder {
  parentBuilder;

  alias;
  allowCultureVariant;
  dataTypeId;
  label;
  sortOrder;
  validation;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
  }

  withDataTypeId(dataTypeId){
    this.dataTypeId = dataTypeId;
    return this;
  }
  withLabel(label){
    this.label = label;
    return this;
  }
  withAlias(alias){
    this.alias = alias;
    return this;
  }

  done(){
    return this.parentBuilder;
  }

  build() {

    var label = this.label || Helpers.generateGuid();
    var alias = this.alias || "a"+Helpers.camelize(label);

    return {
      alias: alias,
      allowCultureVariant: this.allowCultureVariant || false,
      dataTypeId: this.dataTypeId || -1,
      label: label,
      sortOrder: this.sortOrder || 0,
      validation: this.validation || {mandatory: false, pattern: null},

    }
  }
}
/////////////////////////////////////

export class ContentBuilder {
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

class ContentVariantBuilder {
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
    var name = this.name || Helpers.generateGuid();

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

class ContentVariantPropertyBuilder {
  parentBuilder;

  id;
  alias;
  value;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
  }

  withAlias(alias){
    this.alias = alias;
    return this;
  }

  withValue(value){
    this.value = value;
    return this;
  }

  done(){
    return this.parentBuilder;
  }

  build() {
    return {
      id: this.id || 0,
      alias: this.alias || null,
      value: this.value || null,
    }
  }
}

