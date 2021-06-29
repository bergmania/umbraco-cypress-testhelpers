﻿import CommandBase from './commandBase';
import { JsonHelper } from 'src/helpers/jsonHelper';

export default class UmbracoEnsureDataTypeNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureDataTypeNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/DataType/GetByName?name=' + name,
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        const searchBody = JsonHelper.getBody(response);
        if (searchBody != null) {
          const dataTypeId = searchBody.id;

          if (dataTypeId !== null) {
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/DataType/DeleteById?id=' + dataTypeId,
              followRedirect: false,
              headers: {
                ContentType: 'application/json',
                'X-UMB-XSRF-TOKEN': token.value,
              },
            }).then((resp) => {
              return;
            });
          }
        }
      });
    });
  }
}
