import CommandBase from "./commandBase";

export default class UmbracoEnsureUserEmailNotExists extends CommandBase {
  _commandName = 'umbracoEnsureUserEmailNotExists';

  method(email) {
    const cy = this.cy;

    const userId = 1;
    http://localhost:9000/umbraco/backoffice/UmbracoApi/Users/GetPagedUsers?pageNumber=1&pageSize=25&orderBy=Name&orderDirection=Ascending&filter=mail@bergmania.dk
    cy.request({
      method: 'POST',
      url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Users/GetPagedUsers?pageNumber=1&pageSize=1&orderBy=Name&orderDirection=Ascending&filter=' + email,
      followRedirect: false,
      headers: {
        contentType: "application/json"
      }
    }).then(searchResponse => {

          cy.request({
            method: 'POST',
            url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Users/PostDeleteNonLoggedInUser?id=' + userId,
            followRedirect: false,
            headers: {
              contentType: "application/json"
            }
          }).then((response) => {


          });
    });
  }
}


