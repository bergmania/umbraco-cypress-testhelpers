import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteTemplatesByNamePrefix extends CommandBase {
  commandName = 'deleteTemplatesByNamePrefix';

  method(prefix) {
    const cy = this.cy;

    return cy
      .request({
        method: 'GET',
        url:
          this.relativeBackOfficePath +
          '/backoffice/UmbracoTrees/TemplatesTree/GetNodes?id=-1&application=settings&tree=&use=main&culture=',
      })
      .then((response) => {
        const items = JsonHelper.getBody(response);
        for (const item of items) {
          if (items.name.startsWith(prefix)) {
            cy.deleteTemplateById(items.id);
          }
        }
      });
  }
}
