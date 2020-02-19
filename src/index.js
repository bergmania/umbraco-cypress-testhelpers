import FormPickerDataTypeBuilder from "./builders/dataTypes/formPickerDataTypeBuilder";
import FormBuilder from "./builders/forms/formBuilder";
import DocumentTypeBuilder from "./builders/documentTypes/documentTypeBuilder";
import ContentBuilder from "./builders/content/contentBuilder";
import UmbracoLogin from "./cypress/commands/umbracoLogin";
import AddTextToUsernameInput from "./cypress/commands/commandBase";
import UmbracoSection from "./cypress/commands/umbracoSection";
import UmbracoButtonByLabel from "./cypress/commands/umbracoButtonByLabel";
import UmbracoEnsureUserEmailNotExists from "./cypress/commands/umbracoEnsureUserEmailNotExists";


const relativeBackOfficePath = '/umbraco';

Cypress.Server.defaults({
  whitelist: (xhr) => {

    if(new URL(xhr.url).pathname.startsWith(relativeBackOfficePath)){
      return true;
    }

    // this function receives the xhr object in question and
    // will whitelist if it's a GET that appears to be a static resource
    return xhr.method === 'GET' && /\.(jsx?|html|css)(\?.*)?$/.test(xhr.url)
  }
});

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
      new UmbracoButtonByLabel(relativeBackOfficePath).registerCommand();
      new AddTextToUsernameInput(relativeBackOfficePath).registerCommand();
    },
  }
};
