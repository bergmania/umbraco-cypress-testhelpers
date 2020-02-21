import CommandBase from "./commandBase";
import ResponseHelper from "../../helpers/responseHelper";

export default class UmbracoEnsureLanguageNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureLanguageNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie("UMB-XSRF-TOKEN", {log:false}).then(token => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Language/GetAllLanguages',
        followRedirect: true,
        headers: {
          "Accept": "application/json",
          "X-UMB-XSRF-TOKEN":token.value
        },
        log:false
      }).then(response => {

        const searchBody = ResponseHelper.getResponseBody(response);
        if(searchBody.length > 0){

          let languageId = null;
          for (let i = 0; i < searchBody.length; i++) {
            let language = searchBody[i];

            if(language.name === name){
              languageId = language.id;
            }
          }

          if(languageId !== null){
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Language/DeleteLanguage?id=' + languageId,
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


