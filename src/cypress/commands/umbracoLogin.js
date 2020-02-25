import CommandBase from "./commandBase";
import ResponseHelper from "../../helpers/responseHelper";

export default class UmbracoLogin extends CommandBase {
  _commandName = 'umbracoLogin';

  method(username, password) {
    const cy = this.cy;
    const cypress = this.cypress;

    let toursClosed = false;
    cy.clearCookies({log:false});
    cy.clearLocalStorage();

    cy.request({
      method: 'POST',
      url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Authentication/PostLogin',
      followRedirect: false,
      body: {
        username: username,
        password: password,
      },
      headers: {
        contentType: "application/json"
      },
      log:false
    }).then((postLoginResponse) => {

      cy.visit(this._relativeBackOfficePath, {log:false}).then($page => {
        cy.getCookie("UMB-XSRF-TOKEN", {log:false}).then(token => {
          cy.request({
            method: 'GET',
            url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Tour/GetTours',
            followRedirect: false,
            headers: {
              "ContentType": "application/json",
              "X-UMB-XSRF-TOKEN": token.value
            },
            log:false
          }).then((getToursResponse) => {

            const getToursBody = ResponseHelper.getResponseBody(getToursResponse);
            if (getToursBody.length > 0) {
              for (let i = 0; i < getToursBody.length; i++) {
                let tour = getToursBody[i];
                if(tour.completed !== true && tour.disabled !== true){
                  toursClosed = true;
                }
              }
              if(toursClosed){
                cy.get('.umb-tour-step__close', {log:false}).click({log:false});
              }


            }
            });


          });
        });
      }).then(_ => {
      cypress.log({
        displayName: "Umbraco Login",
        message: "",
        consoleProps: () => {
          // return an object literal which will
          // be printed to the dev tools console
          // on click
          return {
            'Username': username,
            'Tours closed': toursClosed
          }
        }
    });
    });
  }
}


