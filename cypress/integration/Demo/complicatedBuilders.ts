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
      .withIgnoreUserStartNodes(true)
      .withImageUploadFolder("umb://media/ba01c61801234f9496eee617c0c813c0")
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
      .addRte()
        .withDimensions(1000, 800)
        .withDistractionFreeMode()
        .withToolBarOptions()
          .withSourceCodeEditor()
          .withBold()
          .withNumberedList()
          .withMacro()
        .done()
      .done()
      .apply()
      .build()

    cy.saveDataType(grid);
  });
});