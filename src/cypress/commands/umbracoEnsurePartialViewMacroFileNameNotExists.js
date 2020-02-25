import CommandBase from "./commandBase";
import ResponseHelper from "../../helpers/responseHelper";

export default class UmbracoEnsurePartialViewMacroFileNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsurePartialViewMacroFileNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie("UMB-XSRF-TOKEN", {log:false}).then(token => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/PartialViewMacrosTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          "Accept": "application/json",
          "X-UMB-XSRF-TOKEN":token.value
        },
        log:false
      }).then(response => {

        const searchBody = ResponseHelper.getResponseBody(response);
        if(searchBody.length > 0){

          let partialViewId = null;
          for (let i = 0; i < searchBody.length; i++) {
            let partialView = searchBody[i];

            if(partialView.name === name){
              partialViewId = partialView.id;
            }
          }

          if(partialViewId !== null){
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/CodeFile/Delete?type=partialViewMacros&virtualPath=' + partialViewId,
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


