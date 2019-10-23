import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class DeleteAllForms extends CommandBase {
  commandName = 'deleteAllForms';

  method() {
    const cy = this.cy;

    cy.request({
        method: 'GET',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoForms/FormTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=',
      }).then((response) => {
        const forms = JsonHelper.getBody(response);

        for (let i = 0; i<forms.length;i++){
          cy.deleteFormByGuid(forms[i].id);
        }


      });

  }
}


