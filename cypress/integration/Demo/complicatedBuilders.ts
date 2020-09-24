import {GridDataTypeBuilder} from '../../../src';

context('Demo', () => {
  it('Test', () => {
    debugger;
    const builder = new GridDataTypeBuilder()
      .withName("TestType")
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
      .withDefaultPrevalues()
      .apply()
      .build()
      
  });
});