import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';
import faker from 'faker';
export default class SaveForm extends CommandBase {
  commandName = 'saveForm';

  method(form) {
    const cy = this.cy;

    if (form == null) {
      return;
    }
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoForms/Form/SaveForm',
        body: form,
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
      }).then((response) => {
        return JsonHelper.getBody(response);
      });
    });
  }
}
