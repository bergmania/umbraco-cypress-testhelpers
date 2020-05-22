import CommandBase from './commandBase';
import { ResponseHelper } from '../../helpers/responseHelper';

export default class UmbracoLogin extends CommandBase {
  _commandName = 'umbracoLogin';

  method(username, password) {
    const cy = this.cy;
    const cypress = this.cypress;

    let toursClosed = false;
    cy.clearCookies({ log: false });
    cy.clearLocalStorage();

    cy.request({
      method: 'POST',
      url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Authentication/PostLogin',
      followRedirect: false,
      body: {
        username,
        password,
      },
      headers: {
        contentType: 'application/json',
      },
      log: false,
    })
      .then((postLoginResponse) => {
        cy.visit(this._relativeBackOfficePath, { log: false }).then(($page) => {
          cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
            cy.request({
              method: 'GET',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/CurrentUser/GetUserTours',
              followRedirect: false,
              headers: {
                ContentType: 'application/json',
                'X-UMB-XSRF-TOKEN': token.value,
              },
              log: false,
            }).then((getToursResponse) => {
              const getUserToursBody = ResponseHelper.getResponseBody(getToursResponse);
              let umbEmailMarketingDisabled = false;
              if(getUserToursBody.length === 0){
                // If length == 0, then the user has not disabled any tours => Tours will be shown
                toursClosed = true;
              }
              else{
                
                for (const userTourBody of getUserToursBody) {
                  if(userTourBody.alias === 'umbEmailMarketing'){
                    umbEmailMarketingDisabled = userTourBody.disabled ;
                  }
                  if (userTourBody.disabled  !== true) {
                    toursClosed = true;
                  }
                }
              }
              if (toursClosed || umbEmailMarketingDisabled === false) {
                cy.get('.umb-tour-step', {timeout: 60000}).should('be.visible'); // We now due to the api calls this will be shown, but slow computers can take a while
                cy.get('.umb-tour-step__close').click();
              }
            });
          });
        });
      })
      .then((_) => {
        cypress.log({
          displayName: 'Umbraco Login',
          message: '',
          consoleProps: () => {
            // return an object literal which will
            // be printed to the dev tools console
            // on click
            return {
              Username: username,
              'Tours closed': toursClosed,
            };
          },
        });
      });
  }
}
