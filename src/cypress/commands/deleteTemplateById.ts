import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteTemplateById extends CommandBase {
  commandName = 'deleteTemplateById';

  method(id) {
    const cy = this.cy;
    if (id == null) {
      return;
    }
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/Template/DeleteById?id=' + id,
        headers: {
          contentType: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
      }).then((response) => {
        return response;
      });
    });
  }
}
