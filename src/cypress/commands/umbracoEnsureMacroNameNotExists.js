import CommandBase from "./commandBase";
import ResponseHelper from "../../helpers/responseHelper";

export default class UmbracoEnsureMacroNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureMacroNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie("UMB-XSRF-TOKEN", {log:false}).then(token => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/MacrosTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          "Accept": "application/json",
          "X-UMB-XSRF-TOKEN":token.value
        },
        log:false
      }).then(response => {

        const searchBody = ResponseHelper.getResponseBody(response);
        if(searchBody.length > 0){

          let macroId = null;
          for (let i = 0; i < searchBody.length; i++) {
            let macro = searchBody[i];

            if(macro.name === name){
              macroId = macro.id;
            }
          }

          if(macroId !== null){
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Macros/DeleteById?id=' + macroId,
              followRedirect: false,
              headers: {
                "ContentType": "application/json",
                "X-UMB-XSRF-TOKEN": token.value
              }
            }).then((response) => {

            });
          }


        }



      });
    });

  }
}


