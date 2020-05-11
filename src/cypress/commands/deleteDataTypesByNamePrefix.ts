import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class DeleteDataTypesByNamePrefix extends CommandBase {
  commandName = 'deleteDataTypesByNamePrefix';

  method(prefix: string) {
    const cy = this.cy;
    return cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      
      return cy
        .request({
          method: 'GET',
          url:
            this.relativeBackOfficePath +
            '/backoffice/UmbracoTrees/DataTypeTree/GetNodes?id=-1&application=settings&tree=&use=main&culture=',
          headers: {
            'X-UMB-XSRF-TOKEN': token.value,
          },
        })
        .then((response) => {

          const items = JsonHelper.getBody(response);
          
          for (const item of items) {            
            if (item.name.startsWith(prefix) ||item.name.startsWith(prefix.toLowerCase()) ) {              
              cy.deleteDataTypeById(item.id);
            }
          }
          return;
        });
    });
  }
}
