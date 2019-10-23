import FormPickerDataTypeBuilder from "./builders/dataTypes/formPickerDataTypeBuilder";
import FormBuilder from "./builders/forms/formBuilder";
import DocumentTypeBuilder from "./builders/documentTypes/documentTypeBuilder";
import ContentBuilder from "./builders/content/contentBuilder";
import UmbracoLogin from "./cypress/commands/umbracoLogin";
import SaveDataType from "./cypress/commands/saveDataType";
import DeleteFormByGuid from "./cypress/commands/deleteFormByGuid";
import SaveForm from "./cypress/commands/commandBase";
import DeleteAllForms from "./cypress/commands/deleteAllForms";


const relativeBackOfficePath = '/umbraco';

export default {
  Builder: {
    Content: () => new ContentBuilder(),
    Form: () => new FormBuilder(),
    DocumentType: () => new DocumentTypeBuilder(),
    DataTypes: {
      FormPicker: () => new FormPickerDataTypeBuilder(),
    }
  },
  Umbraco: {
    RegisterCypressCommands: () => {
      new SaveDataType(relativeBackOfficePath).registerCommand();
      new SaveForm(relativeBackOfficePath).registerCommand();

      new DeleteAllForms(relativeBackOfficePath).registerCommand();
      new DeleteFormByGuid(relativeBackOfficePath).registerCommand();

      new UmbracoLogin(relativeBackOfficePath).registerCommand();
    },
  }
};
