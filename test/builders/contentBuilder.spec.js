import { assert } from 'chai';
import {Builder} from "../../src/index";
import faker from 'faker'
import FormFieldSetBuilder from "../../src/builders/forms/formFieldSetBuilder";
import ContentVariantPropertyBuilder from "../../src/builders/content/contentVariantPropertyBuilder";
import ContentVariantBuilder from "../../src/builders/content/contentVariantBuilder";

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
    var variantName = faker.lorem.sentence();
    var variantCulture = faker.address.countryCode();
    var save = faker.random.boolean();
    var publish = faker.random.boolean();
    var formPickerAlias = faker.hacker.adjective();
    var formId = faker.random.uuid();

    var actual = Builder.Content()
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
    const actual = new ContentVariantPropertyBuilder().build();

    assert.equal(actual.id , 0);
    assert.equal(actual.alias  , null);
    assert.equal(actual.value   , null);
  });

  it('Empty ContentVariantBuilder', () => {
    const actual = new ContentVariantBuilder().build();

    assert.isNotEmpty(actual.name);
    assert.lengthOf(actual.properties, 0);
    assert.equal(actual.culture  , null);
    assert.equal(actual.publish   , false);
    assert.equal(actual.save   , false);
    assert.equal(actual.releaseDate   , null);
    assert.equal(actual.expireDate   , null);
  });
});
