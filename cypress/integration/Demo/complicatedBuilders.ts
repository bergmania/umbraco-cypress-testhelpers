/// <reference types="Cypress" />
import {GridDataTypeBuilder} from '../../../src';

context('Demo', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  it('Test', () => {
    const gridName = "TestGrid";

    cy.umbracoEnsureDataTypeNameNotExists(gridName);

    // debugger;
    const grid = new GridDataTypeBuilder()
      .withName(gridName)
      .addLayout()
        .withName("Article")
        .withSimpleArea(4)
        .withSimpleArea(8)
      .done()
      .addLayout()
        .withName("Headline")
        .withAllowed(false)
        .addArea()
          .withGridSize(12)
          .withEditors("headline")
        .done()
      .done()
      .addTemplate()
        .withName("Test")
        .withSimpleSection(4)
        .withSimpleSection(4)
        .addSection()
          .withGridSize(4)
          .withAllowAll(false)
          .withAllowed("Headline")
        .done()
      .done()
      .addTemplate()
        .withName("SimpleTemplate")
        .withSimpleSection(8)
        .withSimpleSection(4)
      .done()
      .withDefaultPrevalues()
      .apply()
      .build()
    
    cy.saveDataType(grid);
  });
});