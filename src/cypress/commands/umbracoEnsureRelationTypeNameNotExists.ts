import CommandBase from './commandBase';
import { JsonHelper } from 'src/helpers/jsonHelper';

export default class UmbracoEnsureRelationTypeNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureRelationTypeNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/RelationTypeTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        if (searchBody.length > 0) {
          let relationTypeId = null;
          for (const sb of searchBody) {
            if (sb.name === name) {
              relationTypeId = sb.id;
            }
          }

          if (relationTypeId !== null) {
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/RelationType/DeleteById?id=' + relationTypeId,
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
