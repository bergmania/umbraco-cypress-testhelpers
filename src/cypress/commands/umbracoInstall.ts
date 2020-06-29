import CommandBase from './commandBase';
import faker from 'faker';

export default class UmbracoInstall extends CommandBase {
  _commandName = 'umbracoInstall';

  method(
    username: string = Cypress.env('username'),
    password: string = Cypress.env('password'),
    connectionString: string = Cypress.env('connectionString'),
  ): void {
    const cy = this.cy;
    return cy.visit(`/install`, { failOnStatusCode: false }).then(() => {
      cy.server();
      cy.route('GET', '/install/api/GetSetup').as('getSetup');
      cy.route('POST', '/install/api/PostValidateDatabaseConnection').as('validateDatabase');
      cy.route('GET', '/install/api/GetPackages').as('getPackages');
      cy.wait('@getSetup').then(() => {
        cy.get('input[placeholder="Full name"').type(faker.random.word());
        cy.get('input[placeholder="you@example.com"').type(username);
        cy.get('input[name="installer.current.model.password"').type(password);
        cy.get('.control-customize').click();

        cy.get('#dbType').select('Custom connection string');
        cy.get('.input-block-level').type(connectionString);
        cy.get('form').submit();
        cy.wait('@validateDatabase').then(() => {
          cy.wait('@getPackages').then(() => {
            cy.get('.btn-link-reverse').click();
            cy.waitUntil(() => cy.getCookie('UMB-XSRF-TOKEN'), { timeout: 2400000, interval: 500 }).then((p) => {
              this.cy.log('Umbraco installed');
              return;
            });
          });
        });
      });
    });
  }
}
