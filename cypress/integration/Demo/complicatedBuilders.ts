import {GridDataTypeBuilder} from '../../../src';

context('Demo', () => {
  it('Test', () => {
    debugger;
    const builder = new GridDataTypeBuilder()
      .withName("TestType")
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
      .apply()
      .applyPreValues()
      .build()
      
  });
});