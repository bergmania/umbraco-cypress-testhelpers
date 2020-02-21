import CommandBase from "./commandBase";
import ResponseHelper from "../../helpers/responseHelper";

export default class UmbracoEnsureMediaTypeNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureMediaTypeNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie("UMB-XSRF-TOKEN", {log:false}).then(token => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/MediaTypeTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          "Accept": "application/json",
          "X-UMB-XSRF-TOKEN":token.value
        },
        log:false
      }).then(response => {

        const searchBody = ResponseHelper.getResponseBody(response);
        if(searchBody.length > 0){

          let mediaTypeId = null;
          for (let i = 0; i < searchBody.length; i++) {
            let mediaType = searchBody[i];

            if(mediaType.name === name){
              mediaTypeId = mediaType.id;
            }
          }

          if(mediaTypeId !== null){
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/MediaType/DeleteById?id=' + mediaTypeId,
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


