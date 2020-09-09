import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class SaveFolder extends CommandBase {
  commandName = 'saveFolder';

  method(section, name) {
    const cy = this.cy;

    if (section == null) {
      return;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'POST',
        url:
          this.relativeBackOfficePath +
          '/backoffice/UmbracoApi/CodeFile/PostCreateContainer?type=' +
          section +
          '&parentId=-1&name=' +
          name,
        timeout: 90000,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'X-UMB-XSRF-TOKEN': token.value,
        },
      }).then((response) => {
        return JsonHelper.getBody(response);
      });
    });
  }
}
