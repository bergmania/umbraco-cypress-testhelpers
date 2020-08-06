import CommandBase from './commandBase';
import { ResponseHelper } from '../../helpers/responseHelper';

export default class UmbracoPartialViewExists extends CommandBase {
  _commandName = 'umbracoPartialViewExists';

  method(name) {
    const cy = this.cy;
    
    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      // Request list of partial views
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/PartialViewsTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
        // search for partial view by name 
      }).then((response) => {
        const searchBody = ResponseHelper.getResponseBody(response);
        if (searchBody.length > 0) {
          for (const sb of searchBody) {
            if (sb.name === name) {
              // Partial view found, return true
              return true;
            }
          }
        }
        // No partial view found, return false
        return false;
      });
    });
  }
}