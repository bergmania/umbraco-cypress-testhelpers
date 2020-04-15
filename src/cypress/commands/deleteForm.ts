import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteForm extends CommandBase {
  commandName = 'deleteForm';

  method(id) {
    const cy = this.cy;

    if (id == null) {
      return;
    }

    if (typeof id === 'string' || id instanceof String) {
      return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
        cy.request({
          method: 'GET',
          url:
            this.relativeBackOfficePath +
            '/backoffice/UmbracoForms/FormTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=',
          headers: {
            Accept: 'application/json',
            'X-UMB-XSRF-TOKEN': token.value,
          },
        }).then((response) => {
          const forms = JsonHelper.getBody(response);
          for (const form of forms) {
            if (form.name === id || form.key === id) {
              cy.deleteFormByGuid(forms.id);
              break;
            }
          }
        });
      });
    } else {
      // assume guid
      cy.deleteFormByGuid(id);
    }
  }
}
