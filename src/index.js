import FormPickerDataTypeBuilder from "./builders/dataTypes/formPickerDataTypeBuilder";
import FormBuilder from "./builders/forms/formBuilder";
import DocumentTypeBuilder from "./builders/documentTypes/documentTypeBuilder";
import ContentBuilder from "./builders/content/contentBuilder";
import UmbracoLogin from "./cypress/commands/umbracoLogin";
import SaveDataType from "./cypress/commands/saveDataType";
import DeleteFormByGuid from "./cypress/commands/deleteFormByGuid";
import SaveForm from "./cypress/commands/saveForm";
import DeleteAllForms from "./cypress/commands/deleteAllForms";
import DeleteForm from "./cypress/commands/deleteForm";
import UmbracoSection from "./cypress/commands/umbracoSection";
import UmbracoGlobalHelp from "./cypress/commands/umbracoGlobalHelp";
import UmbracoGlobalUser from "./cypress/commands/umbracoGlobalUser";
import DeleteDocumentType from "./cypress/commands/deleteDocumentType";
import DeleteDocumentTypeById from "./cypress/commands/deleteDocumentTypeById";
import SaveDocumentType from "./cypress/commands/saveDocumentType";

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
      new DeleteAllForms(relativeBackOfficePath).registerCommand();
      new DeleteDocumentType(relativeBackOfficePath).registerCommand();
      new DeleteDocumentTypeById(relativeBackOfficePath).registerCommand();
      new DeleteForm(relativeBackOfficePath).registerCommand();
      new DeleteFormByGuid(relativeBackOfficePath).registerCommand();
      new SaveDataType(relativeBackOfficePath).registerCommand();
      new SaveDocumentType(relativeBackOfficePath).registerCommand();
      new SaveForm(relativeBackOfficePath).registerCommand();
      new UmbracoGlobalHelp(relativeBackOfficePath).registerCommand();
      new UmbracoGlobalUser(relativeBackOfficePath).registerCommand();
      new UmbracoLogin(relativeBackOfficePath).registerCommand();
      new UmbracoSection(relativeBackOfficePath).registerCommand();
    },
  }
};
