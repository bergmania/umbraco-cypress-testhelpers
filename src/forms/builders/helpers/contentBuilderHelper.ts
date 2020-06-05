import { ContentBuilder, Template, CmsDocumentType } from '../../..';

export class ContentBuilderHelper {
  public build(templateAlias, documentTypeAlias: string, properties?: any[]) {
    const content = new ContentBuilder()
      .withTemplateAlias(templateAlias)
      .withContentTypeAlias(documentTypeAlias)
      .addVariant()
      .withSave(true)
      .withPublish(true);
    properties?.forEach((property) => {
      content.addProperty().withAlias(property.alias).withValue(property.value).done();
    });

    return content.done().build();
  }
  public buildContent_(templateBody, docTypeBody, formPickerAlias: string, formBody) {
    return new ContentBuilder()
      .withTemplateAlias(templateBody.alias)
      .withContentTypeAlias(docTypeBody.alias)
      .addVariant()
      .withSave(true)
      .withPublish(true)
      .addProperty()
      .withAlias(formPickerAlias)
      .withValue(formBody.id)
      .done()
      .done()
      .build();
  }

  public insert(template: Template, documentType: CmsDocumentType, properties) {
    const content = this.build(template.alias, documentType.alias, properties);
    return cy.saveContent(content).then((contentBody) => contentBody);
  }
}
