import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteAllPreValues extends CommandBase {
  commandName = 'deleteAllPreValues';

  method() {
    const cy = this.cy;
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'GET',
          url:`${this.relativeBackOfficePath}/backoffice/UmbracoForms/PreValueSourceTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=`,
          headers: {
            'X-UMB-XSRF-TOKEN': token.value,
          },
        })
        .then((response) => {
          const preValueSources = JsonHelper.getBody(response);

          for (const preValueSource of preValueSources) {
            cy.deletePreValueSourceByGuId(preValueSource.id);
          }
        });
    });
  }
}
