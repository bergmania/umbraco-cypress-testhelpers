import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteAllContent extends CommandBase {
  commandName = 'deleteAllContent';

  method() {
    const cy = this.cy;
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: `${this.relativeBackOfficePath}/backoffice/UmbracoTrees/ApplicationTree/GetApplicationTrees?application=content&tree=&use=main`,
        headers: {
          'X-UMB-XSRF-TOKEN': token.value,
        },
      }).then((response) => {
        const content = JsonHelper.getBody(response);
        for (const child of content.children) {
          if (child.id > 0) {
            cy.deleteContentById(child.id);
          }
        }
      });
    });
  }
}
