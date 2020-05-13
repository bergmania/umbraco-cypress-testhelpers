import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteDocumentTypeById extends CommandBase {
  commandName = 'deleteDocumentTypeById';

  method(id) {
    const cy = this.cy;

    if (id == null) {
      return;
    }
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'DELETE',
          url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/ContentType/DeleteById?id=' + id,
          headers: {
            accept: 'application/json',
            'X-UMB-XSRF-TOKEN': token.value,
          },
        })
        .then((response) => {
          return response;
        });
    });
  }
}
