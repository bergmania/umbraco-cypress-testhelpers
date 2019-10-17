import { assert } from 'chai';
import {Builder} from "../../src/index";

import faker from 'faker'
describe('ContentBuilder', () => {
  it('Default build', () => {

    const actual = Builder.Content()
      .build();
    assert.equal(actual.id, 0);
    assert.equal(actual.parentId, -1);
    assert.equal(actual.action, "publishNew");
    assert.isArray(actual.variants);
  });

  it('Custom build', () => {

    var contentTypeAlias = faker.lorem.sentence();
    var save = faker.random.boolean();
    var publish = faker.random.boolean();
    var formPickerAlias = faker.hacker.adjective();
    var formId = faker.random.uuid();

    var actual = Builder.Content()
      .withContentTypeAlias(contentTypeAlias)
      .addVariant()
        .withSave(save)
        .withPublish(publish)
        .addProperty()
          .withAlias(formPickerAlias)
          .withValue(formId)
        .done()
      .done()
      .build();

    assert.equal(actual.contentTypeAlias, contentTypeAlias);
  });

});
