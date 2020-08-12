import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class SaveMacro extends CommandBase{
  commandName = 'saveMacro';

  method(name : string) {
    const cy = this.cy;
    if (name.length == 0) {
      return;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/Macros/Create?name=' + name,
        timeout: 90000,
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