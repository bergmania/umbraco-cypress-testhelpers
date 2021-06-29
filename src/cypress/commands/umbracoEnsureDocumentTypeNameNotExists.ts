import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class UmbracoEnsureDocumentTypeNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureDocumentTypeNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/ContentTypeTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        if (searchBody.length > 0) {
          let documentTypeId = null;
          for (const sb of searchBody) {
            if (sb.name === name) {
              documentTypeId = sb.id;
            }
          }

          if (documentTypeId !== null) {
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/ContentType/DeleteById?id=' + documentTypeId,
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
