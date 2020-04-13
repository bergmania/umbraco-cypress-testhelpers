import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteDocumentTypesByNamePrefix extends CommandBase {
  commandName = 'deleteDocumentTypesByNamePrefix';

  method(prefix) {
    const cy = this.cy;

    return cy
      .request({
        method: 'GET',
        url:
          this.relativeBackOfficePath +
          '/backoffice/UmbracoTrees/ContentTypeTree/GetNodes?id=-1&application=settings&tree=&use=main&culture=',
      })
      .then((response) => {
        const items = JsonHelper.getBody(response);
        for (const item of items) {
          if (item.name.startsWith(prefix)) {
            cy.deleteDocumentTypeById(item.id);
          }
        }
      });
  }
}
