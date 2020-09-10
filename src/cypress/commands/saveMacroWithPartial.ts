import CommandBase from './commandBase';
import { ResponseHelper } from '../../helpers/responseHelper';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class SaveMacroWithPartial extends CommandBase {
  commandName = 'saveMacroWithPartial';

  method(macro) {
    const cy = this.cy;

    if (macro == null) {
      return;
    }

    // First thing first save the partial view and save it to etract virtualpath later.
    let partialView;
    return cy.savePartialViewMacro(macro.partialView).then((response) => {
      partialView = response;

      // Create the macro and save the ID
      cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
        cy.request({
          method: 'POST',
          url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Macros/Create?name=' + macro.name,
          timeout: 90000,
          json: true,
          headers: {
            Accept: 'application/json',
            'X-UMB-XSRF-TOKEN': token.value,
          },
        }).then((response) => {
          // Get Macro  by ID
          const macroID = ResponseHelper.getResponseBody(response);
          cy.request({
            method: 'GET',
            url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Macros/GetById?id=' + macroID,
            timeout: 90000,
            json: true,
            headers: {
              Accept: 'application/json',
              'X-UMB-XSRF-TOKEN': token.value,
            },
          }).then((response) => {
            // Update the saved macro
            const savedMacro = JsonHelper.getBody(response);

            savedMacro.view = '~' + partialView.virtualPath;
            savedMacro.cacheByPage = macro.cacheByPage;
            savedMacro.cacheByUser = macro.cacheByUser;
            savedMacro.renderInEditor = macro.renderInEditor;
            savedMacro.useInEditor = macro.useInEditor;
            savedMacro.name = macro.name;

            // Save it again
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/Macros/Save',
              timeout: 90000,
              body: savedMacro,
              json: true,
              headers: {
                Accept: 'application/json',
                'X-UMB-XSRF-TOKEN': token.value,
              },
            }).then((response) => {
              return JsonHelper.getBody(response);
            })
          });
        });
      });
    });
  }
}
