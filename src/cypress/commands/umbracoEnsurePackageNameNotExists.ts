import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class UmbracoEnsurePackageNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsurePackageNameNotExists';

  method(name) {
    const cy = this.cy;
    const relativeBackOfficePath = this._relativeBackOfficePath;
    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: relativeBackOfficePath + '/backoffice/umbracoapi/package/GetCreatedPackages',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        if (searchBody.length > 0) {
          searchBody.forEach(function (value){
            if(name == value.name){
                cy.request({
                    method: 'POST',
                    url:
                    relativeBackOfficePath + '/backoffice/umbracoapi/package/DeleteCreatedPackage?packageId=' + value.id,
                    followRedirect: false,
                    headers: {
                    ContentType: 'application/json',
                    'X-UMB-XSRF-TOKEN': token.value,
                  },
              });
            }
          });
        }
      });
    });
  }
}
