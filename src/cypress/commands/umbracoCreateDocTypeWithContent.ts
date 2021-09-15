import CommandBase from './commandBase';
import { DocumentTypeBuilder } from '../../cms/builders/documentTypes/documentTypeBuilder';
import { ContentBuilder } from '../../cms/builders/content/contentBuilder';
export default class UmbracoCreateDocTypeWithContent extends CommandBase {
  _commandName = 'umbracoCreateDocTypeWithContent';

  method(name, alias, dataTypeBuilder) {
    cy.saveDataType(dataTypeBuilder).then((dataType) => {
      // Create a document type using the data type
      const docType = new DocumentTypeBuilder()
        .withName(name)
        .withAlias(alias)
        .withAllowAsRoot(true)
        .withDefaultTemplate(alias)
        .addGroup()
        .addCustomProperty(dataType['id'])
        .withAlias('umbracoTest')
        .done()
        .done()
        .build();

      cy.saveDocumentType(docType).then((generatedDocType) => {
        const contentNode = new ContentBuilder()
          .withContentTypeAlias(generatedDocType['alias'])
          .addVariant()
          .withName(name)
          .withSave(true)
          .done()
          .build();

        cy.saveContent(contentNode);
      });
    });
  }
}
