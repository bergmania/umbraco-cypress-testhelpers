import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class DeleteDocumentTypeById extends CommandBase {
  commandName = 'deleteDocumentTypeById';

  method(id) {
    const cy = this.cy;

    if(id == null){
      return;
    }

    return cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/ContentType/DeleteById?id=' + id,
        timeout: 150000,
        headers: {
          contentType: "application/json"
        }
      }).then((response) => {
        return JsonHelper.getBody(response);
      });

  }
}


