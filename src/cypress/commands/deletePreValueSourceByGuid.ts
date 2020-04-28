import CommandBase from './commandBase';

export default class deletePreValueSourceByGuid extends CommandBase {
  commandName = 'deletePreValueSourceByGuId';

  method(guid) {
    const cy = this.cy;

    if (guid == null) {
      return;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'DELETE',
          url: `${this.relativeBackOfficePath}/backoffice/UmbracoForms/PreValueSource/DeleteByGuid?guid=${guid}`,
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
