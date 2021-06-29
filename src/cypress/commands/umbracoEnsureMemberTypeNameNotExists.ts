import CommandBase from './commandBase';
import { JsonHelper } from 'src/helpers/jsonHelper';

export default class UmbracoEnsureMemberTypeNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureMemberTypeNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/MemberType/GetAllTypes',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        if (searchBody.length > 0) {
          let memberTypeId = null;
          for (const sb of searchBody) {
            if (sb.name === name) {
              memberTypeId = sb.id;
            }
          }

          if (memberTypeId !== null) {
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/MemberType/DeleteById?id=' + memberTypeId,
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
