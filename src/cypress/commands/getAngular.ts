import CommandBase from './commandBase';
export default class GetAngular extends CommandBase {
  commandName = 'getAngular';
  method() {
    return cy.window().its('angular');
  }
}
