import { ResponseHelper } from '../../helpers/responseHelper'; 
import CommandBase from './commandBase';

export default class UmbracoFileExists extends CommandBase{
  _commandName = 'umbracoFileExists';
  _endPoint;

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => { 
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + this._endPoint,
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => { 
        const searchBody = ResponseHelper.getResponseBody(response);
        if (searchBody.length > 0) {
          for (const sb of searchBody) {
            if (sb.name === name) {
              return true;
            }
          }
        }
        return false;
       });
     });
  }
}