import CommanBase from './commandBase';
import { ResponseHelper } from '../../helpers/responseHelper'; 
import CommandBase from './commandBase';

// TODO: All these "exists" are very similar, make a base class or something?
export default class UmbracoScriptExists extends CommandBase{
  _commandName = 'umbracoScriptExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => { 
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/BackOffice/Api/ScriptsTree/GetNodes?id=-1',
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