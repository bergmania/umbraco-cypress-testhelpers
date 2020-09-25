/// <reference types="Cypress" />
import {GridDataTypeBuilder} from '../../../src';

context('Demo', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  it('Test', () => {
    const gridName = "ComplicatedGrid";

    cy.umbracoEnsureDataTypeNameNotExists(gridName);

    // debugger;
    const grid = new GridDataTypeBuilder()
      .withName(gridName)
      .withIgnoreUserStartNodes(true)
      .withImageUploadFolder("umb://media/ba01c61801234f9496eee617c0c813c0")
      .addSetting()
        .withDescription("Set a css class")
        .withKey("class")
        .withLabel("Class")
        .withView("textstring")
      .done()
      .addStyle()
        .withDescription("Set a row background")
        .withKey("background-image")
        .withLabel("Set a background image")
        .withModifier("url({0}")
        .withView("imagepicker")
      .done()
      .addLayout()
        .withName("Article")
        .withSimpleArea(4)
        .withSimpleArea(8)
      .done()
      .addLayout()
        .withName("Headline")
        .withAllowed(true)
        .addArea()
          .withGridSize(12)
          .withEditor("headline")
          .withAllowHeadline()
          .withMaxItems(1)
        .done()
      .done()
      .addTemplate()
        .withName("Test")
        .withSimpleSection(4)
        .withSimpleSection(4)
        .addSection()
          .withGridSize(4)
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
        .withStylesheet("/css/testStyle.css")
        .addToolBarOptions()
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