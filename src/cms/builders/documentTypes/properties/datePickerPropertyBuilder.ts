import { DocumentTypePropertyBuilder } from './documentTypePropertyBuilder';

export class DatePickerPropertyBuilder extends DocumentTypePropertyBuilder {
  constructor(parentBuilder) {
    super(parentBuilder);
    this.dataTypeId = -41;
  }
}
