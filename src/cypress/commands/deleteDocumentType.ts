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
      return cy
        .request({
          method: 'GET',
          url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/ContentType/GetAll',
        })
        .then((response) => {
          const documentTypes = JsonHelper.getBody(response);
          for (const documentType of documentTypes) {
            if (documentType.alias === id || documentType.key === id) {
              return cy.deleteDocumentTypeById(documentType.id);
            }
          }
        });
    } else {
      // assume int
      return cy.deleteDocumentTypeById(id);
    }
  }
}
