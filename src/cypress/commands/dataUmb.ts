import CommandBase from './commandBase';
export default class DataUmb extends CommandBase {
  commandName = 'dataUmb';
  method(value: string) {
    return cy.get(`[data-umb=${value}]`);
  }
}
