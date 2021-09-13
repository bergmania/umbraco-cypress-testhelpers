import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class UmbracoEnsureMacroNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureMacroNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/MacrosTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        if (searchBody.length > 0) {
          let macroId = null;
          for (const sb of searchBody) {
            if (sb.name === name) {
              macroId = sb.id;
            }
          }

          if (macroId !== null) {
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Macros/DeleteById?id=' + macroId,
              followRedirect: false,
              headers: {
                ContentType: 'application/json',
                'X-UMB-XSRF-TOKEN': token.value,
              },
            }).then((resp) => {
              return;
            });
          }
        }
      });
    });
  }
}
