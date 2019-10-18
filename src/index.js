import FormPickerDataTypeBuilder from "./builders/dataTypes/formPickerDataTypeBuilder";
import FormBuilder from "./builders/forms/formBuilder";
import DocumentTypeBuilder from "./builders/documentTypes/documentTypeBuilder";
import ContentBuilder from "./builders/content/contentBuilder";
import UmbracoLogin from "./cypress/commands/umbracoLogin";


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
    },

    RegisterCypressPlugin: (on, config) => {

      console.log("on", on);


      // setTimeout(function(){
      //   new UmbracoLogin(relativeBackOfficePath).registerCommand();
      //   },2000);
      //
    }
  }
};
