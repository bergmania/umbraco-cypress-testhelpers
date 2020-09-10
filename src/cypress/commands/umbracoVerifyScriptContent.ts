import CommandBase from './commandBase';

export default class UmbracoVerifyScriptContent extends CommandBase {
  _commandName = 'umbracoVerifyScriptContent';

  method(fileName, expectedContent) {
    const cy = this.cy;

    cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
      cy.request({
        method: 'GET',
        url: '/scripts/' + fileName,
        followRedirect: true,
        headers: {
          Accept: 'application/javascript',
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
