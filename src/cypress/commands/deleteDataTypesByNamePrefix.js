import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class DeleteDataTypesByNamePrefix extends CommandBase {
  commandName = 'deleteDataTypesByNamePrefix';

  method(prefix) {
    const cy = this.cy;

    return cy.request({
        method: 'GET',
        url: this.relativeBackOfficePath + '/backoffice/UmbracoTrees/DataTypeTree/GetNodes?id=-1&application=settings&tree=&use=main&culture=',
      }).then((response) => {
        const items = JsonHelper.getBody(response);

        for (let i = 0; i<items.length;i++){
          if(items[i].name.startsWith(prefix)){
            cy.deleteDataTypeById(items[i].id);
          }
        }


      });

  }
}


