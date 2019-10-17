import { assert } from 'chai';
import { DocumentTypeBuilder} from "../../src/Builders";
import faker from 'faker'

describe('DocumentTypeBuilder', () => {
  it('Default build', () => {
    const actual = new DocumentTypeBuilder()
      .build();
    assert(actual.alias != null,  'The alias must be set');
  });

  it('Custom build', () => {
    const dataTypeId = faker.random.uuid();
    const formPickerAlias = faker.hacker.adjective();

    const actual = new DocumentTypeBuilder()
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
