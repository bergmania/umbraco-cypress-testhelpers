import CommandBase from './commandBase';
export default class DeleteDataTypeById extends CommandBase {
  commandName = 'dataUmb';
  method(value: string) {
    return cy.get(`[data-umb=${value}]`);
  }
}
