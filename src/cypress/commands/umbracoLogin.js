export default class UmbracoLogin{
  relativeBackOfficePath;

  constructor(relativeBackOfficePath){
    this.relativeBackOfficePath = relativeBackOfficePath;
  }

  registerCommand(){
    Cypress.Commands.add('umbracoLogin', (username, password) => {

      cy.clearCookies();
      cy.clearLocalStorage();

      cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/Authentication/PostLogin',
        followRedirect: false,
        body: {
          username: username,
          password: password,
        },
        headers: {
          contentType: "application/json"
        }
      }).then((response) => {
        cy.visit('/umbraco/').then($page => {
          cy.log("$page", $page);
        });

        cy.get('body').should($body => {
          if($body.hasClass('umb-tour-is-visible')){
            cy.get('.umb-tour-step__close').click();
          }
        });
      });
    });
  }
}

