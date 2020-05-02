import CommandBase from './commandBase';
export default class DataUmb extends CommandBase {
  commandName = 'dataUmb';
  method(value: string, child?: string) {
    if (child !== undefined) return cy.get(`[data-umb=${value}] ${child}`);
    else return cy.get(`[data-umb=${value}]`);
  }
}
