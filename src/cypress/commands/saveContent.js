import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class SaveContent extends CommandBase {
  commandName = 'saveContent';

  method(content) {
    const cy = this.cy;

    if(content == null){
      return;
    }

    const method = 'POST';
    const url = this.relativeBackOfficePath + '/backoffice/UmbracoApi/Content/PostSave';

    let formData = new FormData();
    formData.append("contentItem", JSON.stringify(content));
    return cy
      .server()
      .route(method, url)
      .as('formRequest')
      .window()
      .then(win => {
        const xhr = new win.XMLHttpRequest();
        xhr.open(method, url);
        xhr.send(formData);
      })
      .wait('@formRequest')
      .then(res => {
        return JsonHelper.getBody(res.response);
      });
  }
}


