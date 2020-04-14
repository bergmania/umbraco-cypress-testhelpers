import FormPickerDataTypeBuilder from './dataTypes/formPickerDataTypeBuilder';
import FormBuilder from './forms/formBuilder';
import DocumentTypeBuilder from './documentTypes/documentTypeBuilder';
import ContentBuilder from './content/contentBuilder';
import TemplateBuilder from './templates/templateBuilder';
import LabelDataTypeBuilder from './dataTypes/labelDataTypeBuilder';

export class Builder {
  public Content(): ContentBuilder {
    return new ContentBuilder();
  }
  public Form(): FormBuilder {
    return new FormBuilder();
  }
  public DocumentType(): DocumentTypeBuilder {
    return new DocumentTypeBuilder();
  }
  public FormPicker(): FormPickerDataTypeBuilder {
    return new FormPickerDataTypeBuilder();
  }
  public Template(): TemplateBuilder {
    return new TemplateBuilder();
  }
  public Label(): LabelDataTypeBuilder {
    return new LabelDataTypeBuilder();
  }
}
