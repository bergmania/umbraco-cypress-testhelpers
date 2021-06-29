import CommandBase from './commandBase';
import { JsonHelper } from 'src/helpers/jsonHelper';

export default class UmbracoEnsureUserEmailNotExists extends CommandBase {
  _commandName = 'umbracoEnsureUserEmailNotExists';

  method(email) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url:
          this._relativeBackOfficePath +
          '/backoffice/UmbracoApi/Users/GetPagedUsers?pageNumber=1&pageSize=1&orderBy=Name&orderDirection=Ascending&filter=' +
          email,
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        if (searchBody.totalItems >= 1) {
          const userId = searchBody.items[0].id;
          cy.request({
            method: 'POST',
            url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Users/PostDeleteNonLoggedInUser?id=' + userId,
            followRedirect: false,
            headers: {
              ContentType: 'application/json',
              'X-UMB-XSRF-TOKEN': token.value,
            },
          }).then((resp) => {
            return;
          });
        }
      });
    });
  }
}
