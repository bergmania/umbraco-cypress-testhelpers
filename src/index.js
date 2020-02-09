import FormPickerDataTypeBuilder from "./builders/dataTypes/formPickerDataTypeBuilder";
import FormBuilder from "./builders/forms/formBuilder";
import DocumentTypeBuilder from "./builders/documentTypes/documentTypeBuilder";
import ContentBuilder from "./builders/content/contentBuilder";
import UmbracoLogin from "./cypress/commands/umbracoLogin";
import AddTextToUsernameInput from "./cypress/commands/commandBase";
import UmbracoSection from "./cypress/commands/umbracoSection";
import UmbracoPrimaryButton from "./cypress/commands/UmbracoPrimaryButton";
import UmbracoEnsureUserEmailNotExists from "./cypress/commands/umbracoEnsureUserEmailNotExists";


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
      new UmbracoLogin(relativeBackOfficePath).registerCommand();
      new UmbracoSection(relativeBackOfficePath).registerCommand();
      new UmbracoEnsureUserEmailNotExists(relativeBackOfficePath).registerCommand();
      new UmbracoPrimaryButton(relativeBackOfficePath).registerCommand();
      new AddTextToUsernameInput(relativeBackOfficePath).registerCommand();
    },
  }
};
