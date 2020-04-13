import faker from 'faker';
export default class DataTypeBuilderBase {
  action;
  id;
  name;
  parentId;
  preValues;

  withSaveAction() {
    this.action = 'save';
    return this;
  }
  withSaveNewAction(action) {
    this.action = 'saveNew';
    return this;
  }
  withId(id) {
    this.id = id;
    return this;
  }
  withName(name) {
    this.name = name;
    return this;
  }

  build() {
    const name = this.name || faker.random.uuid();

    return {
      action: this.action || faker.random.arrayElement(['save', 'saveNew']),
      id: this.id || 0,
      name,
      parentId: this.parentId || -1,
      preValues: this.preValues || [{ key: 'allowedForms', value: [] }],
      selectedEditor: 'UmbracoForms.FormPicker',
    };
  }
}
