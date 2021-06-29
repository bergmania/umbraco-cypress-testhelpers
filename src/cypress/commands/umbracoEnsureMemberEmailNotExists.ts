import CommandBase from './commandBase';
import { JsonHelper } from 'src/helpers/jsonHelper';

export default class UmbracoEnsureMemberEmailNotExists extends CommandBase {
  _commandName = 'umbracoEnsureMemberEmailNotExists';

  method(email) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url:
          this._relativeBackOfficePath +
          '/backoffice/UmbracoApi/Member/GetPagedResults?pageNumber=1&pageSize=1&orderBy=Name&orderDirection=Ascending&filter=' +
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
          const memberKey = searchBody.items[0].key;
          cy.request({
            method: 'POST',
            url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Member/DeleteByKey?key=' + memberKey,
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
