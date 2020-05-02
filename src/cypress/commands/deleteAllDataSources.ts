import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteAllDataSources extends CommandBase {
  commandName = 'deleteAllDataSources';

  method() {
    const cy = this.cy;
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      return cy
        .request({
          method: 'GET',
          url: `${this.relativeBackOfficePath}/backoffice/UmbracoForms/DataSourceTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=`,
          headers: {
            'X-UMB-XSRF-TOKEN': token.value,
          },
        })
        .then((response) => {
          const dataSources = JsonHelper.getBody(response);

          for (const datasource of dataSources) {
            cy.deleteDataSourceByGuId(datasource.id);
          }
        });
    });
  }
}
