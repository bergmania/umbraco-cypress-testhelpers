import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class DeleteFormsByNamePrefix extends CommandBase {
  commandName = 'deleteFormsByNamePrefix';

  method(prefix) {
    const cy = this.cy;

    return cy.request({
        method: 'GET',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoForms/FormTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=',
      }).then((response) => {
        const items = JsonHelper.getBody(response);

        for (let i = 0; i<items.length;i++){
          if(items[i].name.startsWith(prefix)){
            cy.deleteFormByGuid(items[i].id);
          }
        }


      });

  }
}


