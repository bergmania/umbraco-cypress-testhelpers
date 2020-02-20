import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class SaveTemplate extends CommandBase {
  commandName = 'saveTemplate';

  method(template) {
    const cy = this.cy;

    if(template == null){
      return;
    }

    return cy.request({
      method: 'POST',
      url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/Template/PostSave',
      body: template,
      json: true,
    }).then((response) => {
      return JsonHelper.getBody(response);
    });
  }
}


