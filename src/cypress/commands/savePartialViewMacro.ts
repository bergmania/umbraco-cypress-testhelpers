import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class SavePartialViewMacro extends CommandBase{
  commandName = 'savePartialViewMacro';

  method(partialViewMacro) {
    const cy = this.cy;

    if (partialViewMacro == null) {
      return;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/CodeFile/PostSave',
        body: partialViewMacro,
        timout: 90000,
        json: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
      }).then((response) => {
        return JsonHelper.getBody(response);
      })
    })
  }
}