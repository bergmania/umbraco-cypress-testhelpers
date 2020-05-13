import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteDocumentType extends CommandBase {
  commandName = 'deleteDocumentType';

  method(id) {
    const cy = this.cy;

    if (id == null) {
      return;
    }

    if (typeof id === 'string' || id instanceof String) {
      return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
        return cy
          .request({
            method: 'GET',
            url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/ContentType/GetAll',
            headers: {
              Accept: 'application/json',
              'X-UMB-XSRF-TOKEN': token.value,
            },
          })
          .then((response) => {
            const documentTypes = JsonHelper.getBody(response);
            for (const documentType of documentTypes) {
              if (documentType.alias === id || documentType.key === id) {
                return cy.deleteDocumentTypeById(documentType.id);
              }
            }
          });
      });
    } else {
      // assume int
      return cy.deleteDocumentTypeById(id);
    }
  }
}
