import { FormPickerDataTypeBuilder, TextBoxDataTypeBuilder, DropDownDataTypeBuilder, TextBoxProperty, FormPickerProperty, DropDownProperty } from '../../..';

export class DataTypesBuilderHelper {
    
    public buildDataType(dataTypePrefix: string) {
        return new FormPickerDataTypeBuilder().withName(dataTypePrefix).withSaveNewAction().build();
      }
      public buildFormPickerDataType(name: string, allowedFormIds?: string[]) {
        return new FormPickerDataTypeBuilder().withName(name).withAllowedForms(allowedFormIds).withSaveNewAction().build();
      }
      public buildTextBoxDataType(name: string, maxChars?: number) {
        return new TextBoxDataTypeBuilder().withName(name).withSaveNewAction().withMaxChars(maxChars).build();
      }
      public buildDropDownDataType(name: string, values: string[], multiselect?: boolean) {
        return new DropDownDataTypeBuilder().withName(name).withSaveNewAction().withPrevalues(values, multiselect).build();
      }
      public insert(
        textBoxProperties?: TextBoxProperty[],
        dropDownProperties?: DropDownProperty[],
        formPickerProperty?: FormPickerProperty,
      ) {
        const promises = [];
        textBoxProperties?.map((textBoxProperty) => {
          const dataType = this.buildTextBoxDataType(textBoxProperty.name, textBoxProperty.maxChars);
          promises.push(
            new Cypress.Promise((resolve) =>
              cy.saveDataType(dataType).then((dataTypeBody) => {
                return resolve({ dataType: dataTypeBody, property: textBoxProperty });
              }),
            ),
          );
        });
        dropDownProperties?.map((dropDownProperty) => {
          const dataType = this.buildDropDownDataType(
            dropDownProperty.name,
            dropDownProperty.values,
            dropDownProperty.multiSelect,
          );
          promises.push(
            new Cypress.Promise((resolve) =>
              cy.saveDataType(dataType).then((dataTypeBody) => {
                return resolve({ dataType: dataTypeBody, property: dropDownProperty });
              }),
            ),
          );
        });
        if (formPickerProperty) {
          const dataType = this.buildFormPickerDataType(formPickerProperty.name, formPickerProperty.allowedFormIds);
          promises.push(
            new Cypress.Promise((resolve) =>
              cy.saveDataType(dataType).then((dataTypeBody) => {
                return resolve({ dataType: dataTypeBody, property: formPickerProperty });
              }),
            ),
          );
        }
        return Cypress.Promise.all(promises).then((r) => r);
      }
}