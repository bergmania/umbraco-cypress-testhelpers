import { DataType, DocumentTypeBuilder, TextBoxProperty, DropDownProperty, FormPickerProperty } from '../../..';
import DocumentTypeGroupBuilder from '../../../cms/builders/documentTypes/documentTypeGroupBuilder';

export class PropertyBuilderHelper {
  public build(
    documentTypeGroupBuilder: DocumentTypeGroupBuilder,
    items: { property: any; dataType: DataType }[],
  ): DocumentTypeBuilder {
    items?.forEach((item: { property: any; dataType: DataType }) => {
      let builder;
      if (item.property instanceof TextBoxProperty) {
        builder = documentTypeGroupBuilder.addTextBoxProperty();
      } else if (item.property instanceof DropDownProperty) {
        builder = documentTypeGroupBuilder.addDropDownProperty();
      } else if (item.property instanceof FormPickerProperty) {
        builder = documentTypeGroupBuilder.addFormPickerProperty();
      }
      builder.withDataTypeId(item.dataType.id).withAlias(item.property.alias).done();
    });
    return documentTypeGroupBuilder.done();
  }
}
