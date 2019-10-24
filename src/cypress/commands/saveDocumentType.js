import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class SaveDocumentType extends CommandBase {
  commandName = 'saveDocumentType';

  method(docType) {
    const cy = this.cy;

    if(docType == null){
      return;
    }

    return cy.request({
      method: 'POST',
      url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/ContentType/PostSave',
      body: docType,
      timeout: 90000,
      json: true,
    }).then((response) => {
      return JsonHelper.getBody(response);
    });
  }
}


