import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class UmbracoSetCurrentUserLanguage extends CommandBase {
  _commandName = 'umbracoSetCurrentUserLanguage';

  method(language) {
    const cy = this.cy;
    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url:
          this._relativeBackOfficePath +
          '/backoffice/umbracoapi/authentication/GetCurrentUser',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        return cy.umbracoApiRequest(
            this.relativeBackOfficePath + '/backoffice/umbracoapi/users/PostSaveUser',
            'POST',
            {
                id: searchBody.id,
                parentId: -1,
                name: searchBody.name,
                username: searchBody.email,
                culture: language,
                email: searchBody.email,
                startContentIds: [],
                startMediaIds: [],
                userGroups: searchBody.userGroups
            });
      });
    });
  }
}