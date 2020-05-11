import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteFormsByNamePrefix extends CommandBase {
  commandName = 'deleteFormsByNamePrefix';

  method(prefix) {
    const cy = this.cy;

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'GET',
          url:
            this.relativeBackOfficePath +
            '/backoffice/UmbracoForms/FormTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=',
          headers: {
            Accept: 'application/json',
            'X-UMB-XSRF-TOKEN': token.value,
          },
        })
        .then((response) => {
          const items = JsonHelper.getBody(response);
          for (const item of items) {            
            if (item.name?.startsWith(prefix)) {
              cy.deleteFormByGuid(item.id);
            }
          }
          return;
        });
    });
  }
}
