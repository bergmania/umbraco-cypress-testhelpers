import { assert } from 'chai';
import faker from 'faker'
import { DocumentTypeBuilder } from '../../src';

describe('DocumentTypeBuilder', () => {
  it('Default build', () => {
    const actual = new DocumentTypeBuilder()
      .build();
    assert(actual.alias != null,  'The alias must be set');
  });

  it('Custom build', () => {
    const dataTypeId = faker.random.uuid();
    const formPickerAlias = faker.hacker.adjective();
    const pickerLabel = faker.lorem.sentence();

    const actual = new DocumentTypeBuilder()
      .withAllowAsRoot(true)
      .addGroup()
        .addFormPickerProperty()
          .withDataTypeId(dataTypeId)
          .withAlias(formPickerAlias)
        .done()
        .addFormPickerProperty()
          .withLabel(pickerLabel)
        .done()
      .done()
      .build();

    assert(actual.alias != null,  'The alias must be set');
  });

});
