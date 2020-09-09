import CommandBase from './commandBase';

export default class UmbracoVerifyStylesheetContent extends CommandBase {
  _commandName = 'umbracoVerifyStylesheetContent';

  method(fileName, expectedContent) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => { 
      cy.request({
        method: 'GET',
        url: '/css/' + fileName,
        followRedirect: true,
        headers: {
          Accept: 'text/css',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        if (response.body === expectedContent) return true;
        return false;
       });  
     });
  }
}