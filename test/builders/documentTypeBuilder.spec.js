import { assert } from 'chai';
import {Builder} from "../../src/index";
import faker from 'faker'

describe('DocumentTypeBuilder', () => {
  it('Default build', () => {
    const actual = Builder.DocumentType()
      .build();
    assert(actual.alias != null,  'The alias must be set');
  });

  it('Custom build', () => {
    const dataTypeId = faker.random.uuid();
    const formPickerAlias = faker.hacker.adjective();

    const actual = Builder.DocumentType()
      .withAllowAsRoot(true)
      .addGroup()
        .addFormPickerProperty()
          .withDataTypeId(dataTypeId)
          .withAlias(formPickerAlias)
        .done()
      .done()
      .build();

    assert(actual.alias != null,  'The alias must be set');
  });

});
