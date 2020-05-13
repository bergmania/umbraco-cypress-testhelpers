import { assert } from 'chai';
import faker from 'faker'
import { FormPickerDataTypeBuilder } from '../../src';


describe('DataType Builders', () => {
  it('FormPickerDataTypeBuilder Default', () => {
    const actual = new FormPickerDataTypeBuilder()
      .build();

    assert.equal(actual.selectedEditor ,"UmbracoForms.FormPicker");
    assert.equal(actual.selectedEditor ,"UmbracoForms.FormPicker");
  });

  it('FormPickerDataTypeBuilder Custom single form', () => {

    const name = faker.lorem.sentence();
    const id = faker.random.number();
    const formId = faker.random.uuid();

    const actual = new FormPickerDataTypeBuilder()
      .withSaveAction()
      .withId(id)
      .withName(name)
      .withAllowedForm(formId)
      .build();

    assert.equal(actual.id, id);
    assert.equal(actual.name, name);
    assert.equal(actual.action, "save");
    assert.lengthOf(actual.getPrevalues(), 1);
    assert.equal(actual.getPrevalues()[0].key, "allowedForms");
    assert.lengthOf(actual.getPrevalues()[0].value,1);
    assert.equal(actual.getPrevalues()[0].value[0], formId);
  });


  it('FormPickerDataTypeBuilder Custom multi form', () => {
    const formId1 = faker.random.uuid();
    const formId2 = faker.random.uuid();

    const actual = new FormPickerDataTypeBuilder()
      .withSaveNewAction()
      .withAllowedForms([formId1, formId2])
      .build();

    assert.equal(actual.action, "saveNew");
    assert.lengthOf(actual.getPrevalues(), 1);
    assert.equal(actual.getPrevalues()[0].key, "allowedForms");
    assert.lengthOf(actual.getPrevalues()[0].value,2);
    assert.equal(actual.getPrevalues()[0].value[0], formId1);
    assert.equal(actual.getPrevalues()[0].value[1], formId2);
  });


});
