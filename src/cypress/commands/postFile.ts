import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class PostFile extends CommandBase {
  commandName = 'postFile';
  method(fileName: string, url: string) {
    const cy = this.cy;
    const method = 'POST';
    url = this.relativeBackOfficePath + url;
    const formData = new FormData();

    cy.fixture(fileName, 'base64').then((fileFixture) => {
      const blob = Cypress.Blob.base64StringToBlob(fileFixture);
        const testFile = new File([blob], fileName);
        formData.append('file', testFile);
        cy.getCookie('UMB-XSRF-TOKEN').then((token) => {
          cy.server({
            whitelist: (request) => {
              return;
            },
          });
          cy.route(method, url).as('postAdd');
          cy.window()
            .then((win) => {
              const xhr = new win.XMLHttpRequest();
              xhr.open(method, url);
              xhr.setRequestHeader('X-UMB-XSRF-TOKEN', token.value);
              xhr.send(formData);
            })
            .wait('@postAdd')
            .then((res) => {
              return JsonHelper.getBody(res.response);
            });
        });
    });
  }
}
