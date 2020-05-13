import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteDataTypeById extends CommandBase {
  commandName = 'deleteDataTypeById';
  method(id) {
    const cy = this.cy;

    if (id == null) {
      return;
    }
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'POST',
          url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/DataType/DeleteById?id=' + id,
          headers: {
            contentType: 'application/json',
            'X-UMB-XSRF-TOKEN': token.value,
          },
        })
        .then((response) => {
          return response;
        });
    });
  }
}
