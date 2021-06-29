import CommandBase from './commandBase';
import { JsonHelper } from 'src/helpers/jsonHelper';

export default class UmbracoEnsureUserGroupNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureUserGroupNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url:
          this._relativeBackOfficePath + '/backoffice/UmbracoApi/UserGroups/GetUserGroups?onlyCurrentUserGroups=false',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        if (searchBody.length > 0) {
          let userGroupId = null;
          for (const sb of searchBody) {
            if (sb.name === name) {
              userGroupId = sb.id;
            }
          }

          if (userGroupId !== null) {
            cy.request({
              method: 'POST',
              url:
                this._relativeBackOfficePath +
                '/backoffice/UmbracoApi/UserGroups/PostDeleteUserGroups?userGroupIds=' +
                userGroupId,
              followRedirect: false,
              headers: {
                ContentType: 'application/json',
                'X-UMB-XSRF-TOKEN': token.value,
              },
            }).then((resp) => {
              return;
            });
          }
        }
      });
    });
  }
}
