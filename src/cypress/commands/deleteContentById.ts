import CommandBase from './commandBase';

export default class DeleteContentByIid extends CommandBase {
  commandName = 'deleteContentById';

  method(id) {
    const cy = this.cy;

    if (id == null) {
      return;
    }

    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'DELETE',
          url: `${this.relativeBackOfficePath}/backoffice/UmbracoApi/Content/DeleteById?id=${id}`,
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
