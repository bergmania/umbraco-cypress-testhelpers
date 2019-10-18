import faker from 'faker'

export default class FormPickerDataTypeBuilder {
  action;
  id;
  name;
  parentId;
  preValues;

  constructor() {

  }

  withSaveAction(){
    this.action = "save";
    return this;
  }
  withSaveNewAction(action){
    this.action = "saveNew";
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
    const name = this.name || faker.random.uuid();

    return {
      action : this.action || faker.random.arrayElement(["save","saveNew"]),
      id : this.id || 0,
      name : name,
      parentId: this.parentId || -1,
      preValues: this.preValues || [{key: "allowedForms", value: []}],
      selectedEditor: "UmbracoForms.FormPicker"
    }
  }

}
