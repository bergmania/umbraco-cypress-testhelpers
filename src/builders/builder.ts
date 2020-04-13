import FormPickerDataTypeBuilder from './dataTypes/formPickerDataTypeBuilder';
import FormBuilder from './forms/formBuilder';
import DocumentTypeBuilder from './documentTypes/documentTypeBuilder';
import ContentBuilder from './content/contentBuilder';
import TemplateBuilder from './templates/templateBuilder';

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
}
