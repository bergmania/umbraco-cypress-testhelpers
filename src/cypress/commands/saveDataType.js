import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class SaveDataType extends CommandBase {
  commandName = 'saveDataType';

  method(dataType) {
    const cy = this.cy;

      if(dataType == null){
        return;
      }

      return cy.request({
        method: 'POST',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/DataType/PostSave',
        body: dataType,
        timeout: 90000,
        json:true,
      }).then((response) => {
        return JsonHelper.getBody(response);
      });

  }
}


