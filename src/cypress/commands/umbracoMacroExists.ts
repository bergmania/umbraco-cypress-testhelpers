import CommandBase from './commandBase';
import { ResponseHelper } from '../../helpers/responseHelper';

export default class UmbracoMacroExists extends CommandBase {
  _commandName = 'umbracoMacroExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      // Request list of macros
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/MacrosTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
        // search for macro by name 
      }).then((response) => {
        const searchBody = ResponseHelper.getResponseBody(response);
        if (searchBody.length > 0) {
          for (const sb of searchBody) {
            if (sb.name === name) {
              // Macro found, return true
              return true;
            }
          }
        }
        // No macro found, return false
        return false;
      });
    });
  }
}