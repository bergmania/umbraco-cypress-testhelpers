import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class SaveCodeFile extends CommandBase{
  commandName = 'saveCodeFile';

  method(codeFile) {
    const cy = this.cy;

    if (codeFile == null) {
      return;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/CodeFile/PostSave',
        body: codeFile,
        timeout: 90000,
        json: true,
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