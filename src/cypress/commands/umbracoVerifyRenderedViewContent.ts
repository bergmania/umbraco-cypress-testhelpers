import CommandBase from './commandBase';

export default class UmbracoVerifyRenderedViewContent extends CommandBase {
  _commandName = 'umbracoVerifyRenderedViewContent';

  method(endpoint, expectedContent, trim = false){
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: endpoint,
        followRedirect: true,
        headers: {
          Accept: 'text/html',
          'X-UMB-XSRF-TOKEN': token.value,
        },
        log: false,
      }).then((response) => {
        let body = response.body;
        if(trim){
          body = body.trim();
        }
        if (body === expectedContent) return true;
        return false;
      });
    });
  }
}