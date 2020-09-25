/// <reference types="Cypress" />
import {GridDataTypeBuilder} from '../../../src';

context('Demo', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  it('Complicated grid', () => {
    const gridName = "ComplicatedGrid";

    cy.umbracoEnsureDataTypeNameNotExists(gridName);

    // debugger;
    const grid = new GridDataTypeBuilder()
      .withName(gridName)
      .withIgnoreUserStartNodes(true)
      .withImageUploadFolder("umb://media/ba01c61801234f9496eee617c0c813c0")
      .addSetting()
        .withDescription("Demo setting")
        .withKey("class")
        .withLabel("Demo setting")
        .withView("textstring")
      .done()
      .addStyle()
        .withDescription("Demo style")
        .withKey("background-image")
        .withLabel("Demo style")
        .withModifier("url({0}")
        .withView("imagepicker")
      .done()
      .addRowConfiguration()
        .withName("Article")
        .withSimpleArea(4)
        .withSimpleArea(8)
      .done()
      .addRowConfiguration()
        .withName("Headline")
        .withAllowed(true)
        .addArea()
          .withGridSize(12)
          .withEditor("headline")
          .withAllowHeadline()
          .withMaxItems(1)
        .done()
      .done()
      .addLayout()
        .withName("Test")
        .withSimpleSection(4)
        .withSimpleSection(4)
        .addSection()
          .withGridSize(4)
          .withAllowed("Headline")
        .done()
      .done()
      .addLayout()
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

  it('Default Grid', () => {
    const gridName = "Default Grid";

    cy.umbracoEnsureDataTypeNameNotExists(gridName);

    const grid = new GridDataTypeBuilder()
      .withName(gridName)
      .withDefaultGrid()
      .apply()
      .build()
    
    cy.saveDataType(grid);
  });
});