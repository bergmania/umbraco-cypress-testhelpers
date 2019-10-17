// const defaultAwesomeFunction = (name) => {
//   const returnStr = `I am the Default Awesome Function, fellow comrade! - ${name}`;
//   return returnStr;
// };
//
// const awesomeFunction = () => 'I am just an Awesome Function';
//
// export default defaultAwesomeFunction;
//
// export { awesomeFunction };


import {ContentBuilder, DocumentTypeBuilder, FormBuilder, FormPickerDataTypeBuilder} from "./Builders";

export default {
  Builder: {
    Content: () => new ContentBuilder(),
    Form: () => new FormBuilder(),
    DocumentType: () => new DocumentTypeBuilder(),
    DataTypes: {
      FormPicker: () => new FormPickerDataTypeBuilder(),
    }

  },
};
