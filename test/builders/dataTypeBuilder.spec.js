import { assert } from 'chai';
import {Builder} from "../../src/index";
import faker from 'faker'

describe('DataType Builders', () => {
  it('FormPickerDataTypeBuilder Default', () => {
    const actual = Builder.DataTypes.FormPicker()
      .build();

    assert.equal(actual.selectedEditor ,"UmbracoForms.FormPicker");
    assert.equal(actual.selectedEditor ,"UmbracoForms.FormPicker");
  });

  it('FormPickerDataTypeBuilder Custom single form', () => {
    const action = faker.lorem.sentence();
    const name = faker.lorem.sentence();
    const id = faker.random.number();
    const formId = faker.random.uuid();

    const actual = Builder.DataTypes.FormPicker()
      .withAction(action)
      .withId(id)
      .withName(name)
      .withAllowedForm(formId)
      .build();

    assert.equal(actual.id, id);
    assert.equal(actual.name, name);
    assert.equal(actual.action, action);
    assert.lengthOf(actual.preValues, 1);
    assert.equal(actual.preValues[0].key, "allowedForms");
    assert.lengthOf(actual.preValues[0].value,1);
    assert.equal(actual.preValues[0].value[0], formId);
  });


  it('FormPickerDataTypeBuilder Custom multi form', () => {
    const formId1 = faker.random.uuid();
    const formId2 = faker.random.uuid();

    const actual = Builder.DataTypes.FormPicker()
      .withAllowedForms([formId1, formId2])
      .build();

    assert.lengthOf(actual.preValues, 1);
    assert.equal(actual.preValues[0].key, "allowedForms");
    assert.lengthOf(actual.preValues[0].value,2);
    assert.equal(actual.preValues[0].value[0], formId1);
    assert.equal(actual.preValues[0].value[1], formId2);
  });


});
