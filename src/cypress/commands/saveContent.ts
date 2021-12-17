import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class SaveContent extends CommandBase {
  commandName = 'saveContent';

  method(content) {
    const cy = this.cy;

    if (content == null) {
      return;
    }

    const method = 'POST';
    const url = this.relativeBackOfficePath + '/backoffice/UmbracoApi/Content/PostSave';
    const formData = new FormData();
    formData.append('contentItem', JSON.stringify(content));
    return cy.getCookie('UMB-XSRF-TOKEN').then((token) => {
      cy.server({
        ignore: (request) => {
          return;
        },
      });
      cy.route(method, url).as('postSave');
      cy.window()
        .then((win) => {
          const xhr = new win.XMLHttpRequest();
          xhr.open(method, url);
          xhr.setRequestHeader('X-UMB-XSRF-TOKEN', token.value);
          xhr.send(formData);
        })
        .wait('@postSave')
        .then((res) => {
          return JsonHelper.getBody(res.response);
        });
    });
  }
}
