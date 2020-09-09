import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class UmbracoApiRequest extends CommandBase {
  commandName = 'umbracoApiRequest';

  method(url, method, body) {
    const cy = this.cy;

    if (url == null || url === '') {
      return null;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: method ?? 'GET',
        url: url,
        body: body,
        timeout: 90000,
        json: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
      }).then((response) => {
        if (response.isOkStatusCode) {
          return JsonHelper.getBody(response);
        }
        return null;
      });
    });
  }
}
