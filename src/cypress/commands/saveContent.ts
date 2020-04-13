import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class SaveContent extends CommandBase {
  commandName = 'saveContent';

  method(content, done) {
    const cy = this.cy;

    if (content == null) {
      return;
    }

    const method = 'POST';
    const url = this.relativeBackOfficePath + '/backoffice/UmbracoApi/Content/PostSave';

    const formData = new FormData();
    formData.append('contentItem', JSON.stringify(content));
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open(method, url);
      xhr.setRequestHeader('X-UMB-XSRF-TOKEN', token.value);
      xhr.onload = () => {
        done(JsonHelper.getBody(xhr.response));
      };
      xhr.onerror = () => {
        done(xhr.response);
      };
      xhr.send(formData);
    });
  }
}
