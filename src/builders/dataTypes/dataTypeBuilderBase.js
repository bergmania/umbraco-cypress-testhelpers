import faker from 'faker'

export default class DataTypeBuilderBase {
  action;
  id;
  name;
  parentId;
  preValues;
  selectedEditor;

  constructor() {

  }

  withSaveAction(){
    this.action = "save";
    return this;
  }
  withSaveNewAction(){
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

  build() {
    const name = this.name || faker.random.uuid();

    return {
      action : this.action || faker.random.arrayElement(["save","saveNew"]),
      id : this.id || 0,
      name : name,
      parentId: this.parentId || -1,
      preValues: this.preValues ,
      selectedEditor: this.selectedEditor
    }
  }

}
