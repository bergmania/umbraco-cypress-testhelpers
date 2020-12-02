import CommandBase from './commandBase';
import { ResponseHelper } from '../../helpers/responseHelper';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class UmbracoEditTemplate extends CommandBase {
  _commandName = "editTemplate";

  method(name, content) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      // Get a list of all templates
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/TemplatesTree/GetNodes?id=-1',
        followRedirect: true,
        headers: {
          Accept: 'application/json',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
        // Find template by name
      }).then((resonse) => {
        const searchBody = ResponseHelper.getResponseBody(resonse);
        if (searchBody.length > 0) {
          let templateId = null;
          for (const sb of searchBody) {
            if (sb.name === name) {
              templateId = sb.id;
            }
          }

          if(templateId !== null) {
            // Template found, find details of that template
            cy.request({
              method: 'GET',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Template/GetById?id=' + templateId,
              followRedirect: false,
              headers: {
                Accept: 'application/json',
                'X-UMB-XSRF-TOKEN': token.value,
              },
            }).then((resp) => {
              // Change the content and save that template
              const template = JsonHelper.getBody(resp);
              template.content = content;
              return cy.saveTemplate(template);
            });
          }
        }
      }); 
    });
  }
}