import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class SaveForm extends CommandBase {
  commandName = 'saveForm';

  method(form) {
    const cy = this.cy;

      if(form == null){
        return;
      }

      return cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoForms/Form/SaveForm',
        body: form,
        json: true,
      }).then((response) => {
        return JsonHelper.getBody(response);
      });

  }
}


