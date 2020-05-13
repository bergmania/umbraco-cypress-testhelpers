import CommandBase from './commandBase';

export default class DeleteDataSourceByGuid extends CommandBase {
  commandName = 'deleteDataSourceByGuId';

  method(guid) {
    const cy = this.cy;

    if (guid == null) {
      return;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'DELETE',
          url: `${this.relativeBackOfficePath}/backoffice/UmbracoForms/DataSource/DeleteByGuid?guid=${guid}`,
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
