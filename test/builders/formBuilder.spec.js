import { assert } from 'chai';
import faker from 'faker'
import {Builder} from "../../src/index";
import FormFieldConditionBuilder from "../../src/builders/forms/fields/conditions/formFieldConditionBuilder";
import FormFieldConditionRuleBuilder from "../../src/builders/forms/fields/conditions/formFieldConditionRuleBuilder";
import FormContainerBuilder from "../../src/builders/forms/formContainerBuilder";
import FormFieldSetBuilder from "../../src/builders/forms/formFieldSetBuilder";
import FormPageBuilder from "../../src/builders/forms/formPageBuilder";

describe('FormBuilder', () => {
  it('Default build', () => {
    const actual = Builder.Form()
      .build();
    assert(actual.id != null,  'The id must be set');
  });

  it('Custom build', () => {
    const shortAnswer1Id = faker.random.uuid();
    const formId = faker.random.uuid();
    const formName = faker.lorem.sentence();
    const textToInsert = faker.name.firstName();
    const shortAnswer1Caption = faker.lorem.sentence();
    const pageCaption = faker.lorem.sentence();
    const fieldSetCaption = faker.lorem.sentence();
    const containerCaption = faker.lorem.sentence();

    const actual = Builder.Form()
      .withId(formId)
      .withName(formName)
      .addPage()
      .withCaption(pageCaption)
        .addFieldSet()
        .withCaption(fieldSetCaption)
          .addContainer()
          .withCaption(containerCaption)
            .addShortAnswerField()
              .withId(shortAnswer1Id)
              .withCaption(shortAnswer1Caption)
            .done()
            .addShortAnswerField()
              .addShowAllConditions()
                .addRule()
                  .withContainsRule(shortAnswer1Id,textToInsert)
                .done()
              .done()
            .done()
            .addShortAnswerField()
              .addShowAnyConditions()
                .addRule()
                  .withContainsRule(shortAnswer1Id,textToInsert)
                .done()
              .done()
            .done()
            .addShortAnswerField()
              .addHideAllConditions()
                .addRule()
                 .withContainsRule(shortAnswer1Id,textToInsert)
                .done()
              .done()
            .done()
            .addShortAnswerField()
              .addHideAnyConditions()
                .addRule()
                  .withContainsRule(shortAnswer1Id,textToInsert)
                .done()
              .done()
            .done()
          .done()
        .done()
      .done()
      .build();

    assert.lengthOf(actual.pages, 1);
    assert.equal(actual.pages[0].caption, pageCaption);
    assert.lengthOf(actual.pages[0].fieldSets, 1);
    assert.equal(actual.pages[0].fieldSets[0].caption, fieldSetCaption);
    assert.lengthOf(actual.pages[0].fieldSets[0].containers, 1);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].caption, containerCaption);
    assert.lengthOf(actual.pages[0].fieldSets[0].containers[0].fields, 5);

    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[0].id,shortAnswer1Id);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[0].caption,shortAnswer1Caption);

    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[1].condition.actionType,"Show");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[1].condition.logicType,"All");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[1].condition.enabled,true);
    assert.lengthOf(actual.pages[0].fieldSets[0].containers[0].fields[1].condition.rules,1);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[1].condition.rules[0].field,shortAnswer1Id);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[1].condition.rules[0].operator,"Contains");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[1].condition.rules[0].value,textToInsert);

    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[2].condition.actionType,"Show");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[2].condition.logicType,"Any");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[2].condition.enabled,true);
    assert.lengthOf(actual.pages[0].fieldSets[0].containers[0].fields[2].condition.rules,1);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[2].condition.rules[0].field,shortAnswer1Id);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[2].condition.rules[0].operator,"Contains");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[2].condition.rules[0].value,textToInsert);

    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[3].condition.actionType,"Hide");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[3].condition.logicType,"All");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[3].condition.enabled,true);
    assert.lengthOf(actual.pages[0].fieldSets[0].containers[0].fields[3].condition.rules,1);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[3].condition.rules[0].field,shortAnswer1Id);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[3].condition.rules[0].operator,"Contains");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[3].condition.rules[0].value,textToInsert);

    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[4].condition.actionType,"Hide");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[4].condition.logicType,"Any");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[4].condition.enabled,true);
    assert.lengthOf(actual.pages[0].fieldSets[0].containers[0].fields[4].condition.rules,1);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[4].condition.rules[0].field,shortAnswer1Id);
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[4].condition.rules[0].operator,"Contains");
    assert.equal(actual.pages[0].fieldSets[0].containers[0].fields[4].condition.rules[0].value,textToInsert);

  });

  it('Empty FormFieldConditionBuilder', () => {
    const actual = new FormFieldConditionBuilder().build();

    assert.isEmpty(actual);
  });

  it('Empty FormFieldConditionRuleBuilder', () => {
    const actual = new FormFieldConditionRuleBuilder ().build();

    assert.equal(actual.field  , null);
    assert.equal(actual.operator  , null);
    assert.equal(actual.value  , null);
  });

  it('Empty FormContainerBuilder', () => {
    const actual = new FormContainerBuilder().build();

    assert.equal(actual.caption  , null);
    assert.lengthOf(actual.fields  , 0);
  });

  it('Empty FormContainerBuilder', () => {
    const actual = new FormFieldSetBuilder().build();

    assert.equal(actual.caption  , null);
    assert.lengthOf(actual.containers  , 0);
  });

  it('Empty FormPageBuilder', () => {
    const actual = new FormPageBuilder().build();

    assert.equal(actual.caption  , null);
    assert.lengthOf(actual.fieldSets  , 0);
  });

});
