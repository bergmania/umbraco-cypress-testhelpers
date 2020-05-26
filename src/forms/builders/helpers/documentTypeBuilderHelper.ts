import faker from 'faker';
import { DocumentTypeBuilder, CmsDocumentType, Template, DataType } from '../../..';
import { PropertyBuilderHelper } from './propertyBuilderHelper';

export class DocumentTypeBuilderHelper{    
    public build(
        documentType: CmsDocumentType,
        template: Template,
        items: { property: any; dataType: DataType }[],
      ): DocumentTypeBuilder {
        const builder = new DocumentTypeBuilder()
          .withName(documentType.name)
          .withAlias(documentType.alias)
          .withId(documentType.id)
          .withDefaultTemplate(template.alias)
          .withAllowAsRoot(true);

        return new PropertyBuilderHelper().build(builder.addGroup(), items);
      }

    public buildContentType_(
        templateBody,
        docTypePrefix: string,
        docTypeAlias: string,
        dataTypeBody,
        formPickerAlias: string,
      ) : DocumentTypeBuilder {
        return new DocumentTypeBuilder()
          .withName(docTypePrefix + faker.random.uuid())
          .withAlias(docTypeAlias)
          .withDefaultTemplate(decodeURI(templateBody))
          .withAllowAsRoot(true)
          .addGroup()
          .addFormPickerProperty()
          .withDataTypeId(dataTypeBody.id)
          .withAlias(formPickerAlias)
          .done()
          .done()
          .build();
      }
      public insert(documentTypeBuilder: DocumentTypeBuilder) {
        return cy.saveDocumentType(documentTypeBuilder.build()).then((documentTypeBody) => documentTypeBody);
      }
}