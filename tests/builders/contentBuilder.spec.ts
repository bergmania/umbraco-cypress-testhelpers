import { assert } from 'chai';
import faker from 'faker';
import {ContentBuilder,ContentVariantBuilder,ContentVariantPropertyBuilder} from '../../src';

describe('ContentBuilder', () => {
  it('Default build', () => {

    const actual = new ContentBuilder()
      .build();
    assert.equal(actual.id, 0);
    assert.equal(actual.parentId, -1);
    assert.equal(actual.action, "publishNew");
    assert.isArray(actual.variants);
  });

  it('Custom build', () => {

    const contentTypeAlias = faker.lorem.sentence();
    const variantName = faker.lorem.sentence();
    const variantCulture = faker.address.countryCode();
    const save = faker.random.boolean();
    const publish = faker.random.boolean();
    const formPickerAlias = faker.hacker.adjective();
    const formId = faker.random.uuid();

    const actual =  new ContentBuilder()
      .withContentTypeAlias(contentTypeAlias)
      .addVariant()
        .withName(variantName)
        .withCulture(variantCulture)
        .withSave(save)
        .withPublish(publish)
        .addProperty()
          .withAlias(formPickerAlias)
          .withValue(formId)
        .done()
      .done()
      .build();

    assert.equal(actual.contentTypeAlias, contentTypeAlias);
    assert.equal(actual.variants[0].culture, variantCulture);
  });


  it('Empty ContentVariantPropertyBuilder', () => {
    const actual = new ContentVariantPropertyBuilder({}).build();

    assert.equal(actual.id , 0);
    assert.equal(actual.alias  , null);
    assert.equal(actual.value   , null);
  });

  it('Empty ContentVariantBuilder', () => {
    const actual = new ContentVariantBuilder({}).build();

    assert.isNotEmpty(actual.name);
    assert.lengthOf(actual.properties, 0);
    assert.equal(actual.culture  , null);
    assert.equal(actual.publish   , false);
    assert.equal(actual.save   , false);
    assert.equal(actual.releaseDate   , null);
    assert.equal(actual.expireDate   , null);
  });
});