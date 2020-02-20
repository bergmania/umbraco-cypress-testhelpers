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
import SaveContent from "./cypress/commands/saveContent";
import SaveTemplate from "./cypress/commands/saveTemplate";
import DeleteDocumentTypesByNamePrefix from "./cypress/commands/deleteDocumentTypesByNamePrefix";
import DeleteFormsByNamePrefix from "./cypress/commands/deleteFormsByNamePrefix";
import DeleteTemplatesByNamePrefix from "./cypress/commands/deleteTemplatesByNamePrefix";
import DeleteDataTypesByNamePrefix from "./cypress/commands/deleteDataTypesByNamePrefix";
import DeleteDataTypeById from "./cypress/commands/deleteDataTypeById";
import DeleteTemplateById from "./cypress/commands/deleteTemplateById";
import TemplateBuilder from "./builders/templates/templateBuilder";
import AddTextToUsernameInput from "./cypress/commands/commandBase";
import UmbracoSection from "./cypress/commands/umbracoSection";
import UmbracoButtonByLabel from "./cypress/commands/umbracoButtonByLabel";
import UmbracoEnsureUserEmailNotExists from "./cypress/commands/umbracoEnsureUserEmailNotExists";

import CycleHackWorkaroundForPureLiveIssue from "./cypress/commands/cycleHackWorkaroundForPureLiveIssue";


const defaultRelativeBackOfficePath = '/umbraco';

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
    },
    Template: () => new TemplateBuilder(),
  },
  Umbraco: {
    RegisterCypressCommands: (customRelativeBackOfficePath) => {
      const relativeBackOfficePath = customRelativeBackOfficePath || defaultRelativeBackOfficePath;

      new DeleteAllForms(relativeBackOfficePath).registerCommand();
      new DeleteDocumentType(relativeBackOfficePath).registerCommand();
      new DeleteDocumentTypeById(relativeBackOfficePath).registerCommand();
      new DeleteDocumentTypesByNamePrefix(relativeBackOfficePath).registerCommand();
      new DeleteForm(relativeBackOfficePath).registerCommand();
      new DeleteFormByGuid(relativeBackOfficePath).registerCommand();
      new DeleteFormsByNamePrefix(relativeBackOfficePath).registerCommand();
      new DeleteTemplateById(relativeBackOfficePath).registerCommand();
      new DeleteTemplatesByNamePrefix(relativeBackOfficePath).registerCommand();
      new DeleteDataTypesByNamePrefix(relativeBackOfficePath).registerCommand();
      new DeleteDataTypeById(relativeBackOfficePath).registerCommand();
      new SaveContent(relativeBackOfficePath).registerCommand();
      new SaveDataType(relativeBackOfficePath).registerCommand();
      new SaveDocumentType(relativeBackOfficePath).registerCommand();
      new SaveForm(relativeBackOfficePath).registerCommand();
      new SaveTemplate(relativeBackOfficePath).registerCommand();
      new UmbracoGlobalHelp(relativeBackOfficePath).registerCommand();
      new UmbracoGlobalUser(relativeBackOfficePath).registerCommand();
      new UmbracoLogin(relativeBackOfficePath).registerCommand();
      new UmbracoSection(relativeBackOfficePath).registerCommand();

      new CycleHackWorkaroundForPureLiveIssue(relativeBackOfficePath).registerCommand();
      new UmbracoSection(relativeBackOfficePath).registerCommand();
      new UmbracoEnsureUserEmailNotExists(relativeBackOfficePath).registerCommand();
      new UmbracoButtonByLabel(relativeBackOfficePath).registerCommand();
      new AddTextToUsernameInput(relativeBackOfficePath).registerCommand();
    },
  }
};
