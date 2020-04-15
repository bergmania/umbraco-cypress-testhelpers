import CommandBase from './commandBase';

export default class DeleteFormByGuid extends CommandBase {
  commandName = 'deleteFormByGuid';

  method(guid) {
    const cy = this.cy;

    if (guid == null) {
      return;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'DELETE',
          url: this.relativeBackOfficePath + '/backoffice/UmbracoForms/Form/DeleteByGuid?guid=' + guid,          
          json: true,
          headers: {
            Accept: 'application/json',
            'X-UMB-XSRF-TOKEN': token.value,
          },
        })
        .then((resp) => {
          return resp;
        });
    });
  }
}
