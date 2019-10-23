import CommandBase from "./commandBase";

export default class DeleteFormByGuid extends CommandBase {
  commandName = 'deleteFormByGuid';

  method(guid) {
    const cy = this.cy;

    if(guid == null){
      return;
    }

    return cy.request({
      method: 'DELETE',
      url: this.relativeBackOfficePath + '/backoffice/UmbracoForms/Form/DeleteByGuid?guid=' + guid,
      timeout: 150000,
      failOnStatusCode: false,
      json:true,
    }).then((response) => {

    });

  }
}


