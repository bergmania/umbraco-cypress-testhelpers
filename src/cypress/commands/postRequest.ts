import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class PostRequest extends CommandBase {
  commandName = 'postRequest';
  method(url: string, payload: any) {
    const cy = this.cy;
    const method = 'POST';
    url = this.relativeBackOfficePath + url;

    cy.getCookie('UMB-XSRF-TOKEN').then((token) => {
      cy.server({
        ignore: (request) => {
          return;
        },
      });
      cy.route(method, url).as('postRequest');
      cy.window()
        .then((win) => {
          const xhr = new win.XMLHttpRequest();
          xhr.open(method, url);
          xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          xhr.setRequestHeader('X-UMB-XSRF-TOKEN', token.value);
          xhr.send(JSON.stringify(payload));
        })
        .wait('@postRequest')
        .then((res) => {
          return JsonHelper.getBody(res.response);
        });
    });
  }
}
